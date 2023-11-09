const listValidEmail = require('./listValidEmail')
module.exports = {
  checkEmailHasValid(email) {
    const regex = /^[a-zA-Z0-9._+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$/
    const match = regex.exec(email)
    if (match == null) {
      return false
    }
    const domain = match[1]
    return listValidEmail.includes(domain)
  }
}