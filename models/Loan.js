const { DataTypes } = require("sequelize");
const db = require("../db");
const { convertDateYMD } = require('../utils/date');

const Loan = db.define('Loan', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: DataTypes.INTEGER,
  book_id: DataTypes.INTEGER,
  status: {
    type: DataTypes.ENUM('loaned', 'returned'),
    defaultValue: 'loaned'
  },
  due_date: DataTypes.DATE,
  loan_date: DataTypes.DATE,
  return_date: DataTypes.DATE,
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
  tableName: 'loans'
})

module.exports = {
  Loan
}