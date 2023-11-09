const { Book } = require('../models/Book')
const { Loan } = require('../models/Loan')
const { getDateNow, convertDate } = require('../utils/date')

class SearchBookController {
	async index(req, res) {
		const alertMessage = req.flash('alertMessage')
		const alertStatus = req.flash('alertStatus')
		const alert = {
			message: alertMessage,
			status: alertStatus
		}

		const books = await Book.findAll()

		const data = {
			content: 'search-book/index.ejs',
			title: `Cari Buku - ${process.env.SITE_NAME}`,
			user: req.session.user,
			alert,
			books,
		}
		res.render('index', data)
	}

	async loan(req, res) {
		const user = req.session.user
		const alertMessage = req.flash('alertMessage')
		const alertStatus = req.flash('alertStatus')
		const alert = {
			message: alertMessage,
			status: alertStatus
		}

		const due_date = req.flash('due_date')

		const { id } = req.params
		const checkLoaned = await Loan.findOne({ where: { user_id: user.id, status: "loaned" } })
		if (checkLoaned) {
			alert.message = "Maaf anda masih memiliki buku yang sedang dipinjam"
			alert.status = "danger"
		}

		const book = await Book.findByPk(id)
		if (!book) return res.redirect('/not-found')

		const data = {
			content: 'search-book/loan.ejs',
			title: `Pinjam Buku - ${process.env.SITE_NAME}`,
			user: req.session.user,
			alert,
			book,
			form: { due_date },
			has_loaned: checkLoaned ? true : false,
		}
		res.render('index', data)
	}

	async loan_action(req, res) {
		try {
			const user = req.session.user
			const { id } = req.params
			const { due_date } = req.body
			const book = await Book.findOne({ where: { id } })
			if (!book) {
				return res.redirect('/not-found')
			}

			// check user has loaned or not
			const checkLoaned = await Loan.findOne({ where: { user_id: user.id, status: "loaned" } })
			if (checkLoaned) {
				req.flash('alertMessage', "Maaf anda masih memiliki buku yang sedang dipinjam")
				req.flash('alertStatus', 'danger')
				return res.redirect(`/search-book`)
			}

			await Loan.create({
				user_id: user.id,
				book_id: id,
				status: 'loaned',
				due_date: convertDate(due_date),
				loan_date: getDateNow(),
			})

			req.flash('alertMessage', "Buku berhasil disimpan!")
			req.flash('alertStatus', 'success')
			res.redirect(`/search-book`)

		} catch (error) {
			req.flash('alertMessage', error.message)
			req.flash('alertStatus', 'danger')
			res.redirect(`/search-book`)
		}
	}
}

module.exports = SearchBookController