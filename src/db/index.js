module.exports = {
  ...require('./users'), // adds key/values from users.js
  ...require('./categories'),
  ...require('./products'),

}