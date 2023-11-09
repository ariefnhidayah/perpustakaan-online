const { DataTypes } = require('sequelize')
const { convertDateYMD } = require('../utils/date')
const db = require('../db')
const { Loan } = require('./Loan')

const Book = db.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: DataTypes.STRING,
  publication_year: DataTypes.STRING,
  author: DataTypes.STRING,
  image: DataTypes.STRING,
  created_at: {
    type: DataTypes.DATE,
    get: function () {
      return convertDateYMD(this.getDataValue('created_at'))
    }
  },
  updated_at: {
    type: DataTypes.DATE,
    get: function () {
      return convertDateYMD(this.getDataValue('updated_at'))
    }
  }
}, {
  tableName: 'books'
})

Book.hasOne(Loan, { foreignKey: 'book_id', as: "book" })
Loan.belongsTo(Book, { foreignKey: 'book_id', as: 'book' })

module.exports = {
  Book
}