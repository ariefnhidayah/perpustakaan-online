const { Loan } = require('../models/Loan')
const { Book } = require('../models/Book')
const { User } = require('../models/User')
const { Op } = require('sequelize')
const { convertDate, getDateNow } = require('../utils/date');

class ReturnBookController {
  async index(req, res) {
    try {
      const { search } = req.query

      const alertMessage = req.flash('alertMessage')
      const alertStatus = req.flash('alertStatus')
      const alert = {
        message: alertMessage,
        status: alertStatus
      }

      let loan
      if (search) {
        loan = await Loan.findAll({
          attributes: ['id', 'status', 'due_date', 'loan_date', 'return_date'],
          where: {
            [Op.and]: [
              {
                [Op.or]: [
                  {
                    '$book.title$': {
                      [Op.like]: `%${search}%`
                    }
                  },
                  {
                    '$user.fullname$': {
                      [Op.like]: `%${search}%`
                    }
                  },
                ],
              },
              {
                status: 'loaned'
              }
            ]
          },
          include: [
            {
              model: Book,
              as: 'book',
              attributes: ['title'],
            },
            {
              model: User,
              as: 'user',
              attributes: ['fullname'],
            }
          ]
        })
      }

      const data = {
        content: 'return-book/index.ejs',
        title: `Form Pengembalian Buku - ${process.env.SITE_NAME}`,
        user: req.session.user,
        alert,
        loan,
        search,
        current_date: convertDate(getDateNow())
      }
      res.render('index', data)

    } catch (error) {
      req.flash('alertMessage', error.message)
      req.flash('alertStatus', 'danger')
      res.redirect(`/return-book`)
    }
  }

  async return_book_action(req, res) {
    try {
      const { id } = req.params

      const loan = await Loan.findByPk(id)

      if (!loan) return res.redirect('/not-found')

      await loan.update({ status: 'returned', return_date: convertDate(getDateNow()) })

      req.flash('alertMessage', "Buku berhasil dikembalikan!")
      req.flash('alertStatus', 'success')
      res.redirect(`/return-book`)

    } catch (error) {
      req.flash('alertMessage', error.message)
      req.flash('alertStatus', 'danger')
      res.redirect(`/return-book`)
    }
  }
}

module.exports = ReturnBookController