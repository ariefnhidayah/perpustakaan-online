const { Loan } = require('../models/Loan')
const { Book } = require('../models/Book');
const { convertDate, getDateNow } = require('../utils/date');
const { User } = require('../models/User');
class DashboardController {
  index = async (req, res) => {
    const user = req.session.user

    let reports;
    if (user.role == 'admin') {
      reports = await Loan.findAll({ 
        order: [['loan_date', 'desc']],
        attributes: ['status', 'due_date', 'loan_date'],
        include: [
          {
            model: Book,
            as: 'book',
            attributes: ['title', 'image', 'author']
          },
          {
            model: User,
            as: 'user',
            attributes: ['fullname']
          }
        ]
       })
    } else {
      reports = await Loan.findAll({ 
        where: { user_id: user.id }, 
        order: [['loan_date', 'desc']],
        attributes: ['status', 'due_date', 'loan_date'],
        include: [
          {
            model: Book,
            as: 'book',
            attributes: ['title', 'image', 'author']
          }
        ]
       })
    }

    const data = {
      content: 'dashboard/index.ejs',
      title: `Dashboard - ${process.env.SITE_NAME}`,
      user: req.session.user,
      reports,
      current_date: convertDate(getDateNow())
    }
    res.render('index', data)
  }
}

module.exports = DashboardController