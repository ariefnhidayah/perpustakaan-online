const { Book } = require('../models/Book')
const fs = require('fs-extra') //untuk mengelola file / folder
const path = require('path')

class BookController {
  async index(req, res) {
    const alertMessage = req.flash('alertMessage')
    const alertStatus = req.flash('alertStatus')
    const alert = {
      message: alertMessage,
      status: alertStatus
    }

    const books = await Book.findAll()

    const data = {
      content: 'book/index.ejs',
      title: `Buku - ${process.env.SITE_NAME}`,
      user: req.session.user,
      alert,
      books,
    }
    res.render('index', data)
  }

  add(req, res) {
    const alertMessage = req.flash('alertMessage')
    const alertStatus = req.flash('alertStatus')
    const alert = {
      message: alertMessage,
      status: alertStatus
    }

    const data = {
      content: 'book/add.ejs',
      title: `Tambah Buku - ${process.env.SITE_NAME}`,
      user: req.session.user,
      alert
    }
    res.render('index', data)
  }

  async edit(req, res) {
    const { id } = req.params

    const book = await Book.findOne({ where: { id } })
    if (!book) {
      return res.redirect('/not-found')
    }

    const alertMessage = req.flash('alertMessage')
    const alertStatus = req.flash('alertStatus')
    const alert = {
      message: alertMessage,
      status: alertStatus
    }

    const data = {
      content: 'book/edit.ejs',
      title: `Ubah Buku - ${process.env.SITE_NAME}`,
      user: req.session.user,
      alert,
      book,
    }
    res.render('index', data)
  }

  async add_action(req, res) {
    try {
      const { title, publication_year, author } = req.body

      const book = await Book.create({
        title,
        publication_year,
        author,
        image: `assets/images/books/${req.file.filename}`
      })

      if (book) {
        req.flash('alertMessage', 'Buku berhasil ditambah!')
        req.flash('alertStatus', 'success')
        res.redirect('/book')
      } else {
        req.flash('alertMessage', 'Buku gagal ditambah!')
        req.flash('alertStatus', 'danger')
        res.redirect('/book/add')
      }

    } catch (error) {
      req.flash('alertMessage', error.message)
      req.flash('alertStatus', 'danger')
      res.redirect('/book/add')
    }
  }

  async edit_action(req, res) {
    const { id } = req.params
    try {
      const { title, publication_year, author } = req.body

      const book = await Book.findOne({ where: { id } })
      if (!book) return res.redirect('/not-found')

      if (req.file == undefined) {
        await Book.update({ title, publication_year, author }, { where: { id } })
      } else {
        await fs.unlink(path.join(`public/${book.image}`))
        await Book.update({ title, publication_year, author, image: `assets/images/books/${req.file.filename}` }, { where: { id } })
      }

      req.flash('alertMessage', 'Buku berhasil diubah!')
      req.flash('alertStatus', 'success')
      res.redirect('/book')

    } catch (error) {
      req.flash('alertMessage', error.message)
      req.flash('alertStatus', 'danger')
      res.redirect(`/book/${id}/edit`)
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params

      const book = await Book.findOne({ where: { id } })
      if (!book) {
        req.flash('alertMessage', 'Gagal hapus buku!')
        req.flash('alertStatus', 'danger')
        res.redirect('/book')
      }

      await fs.unlink(path.join(`public/${book.image}`))
      await book.destroy()

      req.flash('alertMessage', 'Buku berhasil dihapus!')
      req.flash('alertStatus', 'success')
      res.redirect('/book')

    } catch (error) {
      req.flash('alertMessage', error.message)
      req.flash('alertStatus', 'danger')
      res.redirect(`/book`)
    }
  }
}

module.exports = BookController