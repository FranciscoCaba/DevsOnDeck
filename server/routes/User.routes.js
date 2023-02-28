const UserController = require('../controllers/User.controller')

module.exports = app => {
    app.post('/api/register', UserController.userRegister)
    app.post('/api/login', UserController.userLogin)
    app.post('/api/logout', UserController.logOutUser)
    app.get('/api/issignedin', UserController.isSignedIn)
}