const { checkEmail, User } = require('../models/User')
const { checkEmailHasValid } = require('../utils/emailChecker')
const bcrypt = require('bcrypt')

class AuthenticationController {
	index(req, res) {
		res.redirect('/auth/login')
	}

	logout(req, res) {
		req.session.destroy()
		return res.redirect('/auth/login')
	}

	login(req, res) {
		if (req.session.user) {
			return res.redirect('/')
		}
		const alertMessage = req.flash('alertMessage')
		const alertStatus = req.flash('alertStatus')
		const alert = {
			message: alertMessage,
			status: alertStatus
		}
		const data = {
			content: 'login.ejs',
			title: `Sign In - ${process.env.SITE_NAME}`,
			alert
		}
		res.render('auth/index', data)
	}

	register(req, res) {
		if (req.session.user) {
			return res.redirect('/')
		}

		const alertMessage = req.flash('alertMessage')
		const alertStatus = req.flash('alertStatus')
		const alert = {
			message: alertMessage,
			status: alertStatus
		}

		const fullname = req.flash('fullname')
		const email = req.flash('email')

		const data = {
			content: 'register.ejs',
			title: `Register - ${process.env.SITE_NAME}`,
			alert,
			form: {
				fullname,
				email
			}
		}
		res.render('auth/index', data)
	}

	async login_action(req, res) {
		try {
			if (req.session.user) {
				return res.redirect('/')
			}

			const { email, password } = req.body

			if (!checkEmailHasValid(email)) {
				req.flash('alertMessage', "Email tidak valid!")
				req.flash('alertStatus', 'danger')
				return res.redirect('/auth/login')	
			}

			const user = await User.findOne({
				where: { email }
			})

			if (!user) {
				req.flash('alertMessage', "Akun belum terdaftar!")
				req.flash('alertStatus', 'danger')
				return res.redirect('/auth/login')	
			}
			
			const isPasswordMatch = await bcrypt.compare(password, user.password)
			if (!isPasswordMatch) {
				req.flash('alertMessage', "Email atau password salah!")
				req.flash('alertStatus', 'danger')
				return res.redirect('/auth/login')	
			}

			req.session.user = user

			return res.redirect('/')

		} catch (error) {
			req.flash('alertMessage', error.message)
			req.flash('alertStatus', 'danger')
			res.redirect('/auth/login')
		}
	}

	async register_action(req, res) {
		try {
			if (req.session.user) {
				return res.redirect('/')
			}

			const { email, fullname, password, confirm_password } = req.body

			const error = []

			if (!checkEmailHasValid(email)) {
				error.push('- Email tidak valid!')
			}

			if (await checkEmail(email)) {
				error.push('- Email telah terdaftar!')
			}

			if (password.length < 8) {
				error.push('- Password minimal 8 huruf!')
			}

			if (password != confirm_password) {
				error.push("- Konfirm password tidak sama!")
			} else {
				if (/[A-Z]/.test(password) === false) {
					error.push("- Password harus memiliki minimal 1 huruf kapital!")
				}
				if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
					error.push("- Password tidak boleh ada karakter spesial!")
				}
			}

			if (error.length > 0) {
				req.flash('fullname', fullname)
				req.flash('email', email)
				req.flash('alertMessage', error.join('<br/>'))
				req.flash('alertStatus', 'danger')
				return res.redirect('/auth/register')
			} else {

				await User.create({
					fullname,
					email,
					password: await bcrypt.hash(password, 10)
				})

				req.flash('alertMessage', "Akun berhasil dibuat!")
				req.flash('alertStatus', 'success')
				return res.redirect('/auth/login')
			}

		} catch (error) {
			req.flash('alertMessage', error.message)
			req.flash('alertStatus', 'danger')
			res.redirect('/auth/register')
		}
	}
}

module.exports = AuthenticationController