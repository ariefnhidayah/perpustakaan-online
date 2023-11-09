const { DataTypes } = require('sequelize')
const { convertDateYMD } = require('../utils/date')
const db = require('../db')
const { Loan } = require('./Loan')

const User = db.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fullname: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user'
  },
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
  tableName: 'users'
})

const checkEmail = async (email) => await User.findOne({
  where: {
    email
  }
})

User.hasOne(Loan, { foreignKey: 'user_id', as: 'user' })
Loan.belongsTo(User, { foreignKey: 'user_id', as: 'user' })

module.exports = {
  User,
  checkEmail
}