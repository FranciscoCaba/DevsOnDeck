const UserController = require('../controllers/User.controller')

module.exports = app => {
    app.post('/api/register', UserController.userRegister)
    app.post('/api/login', UserController.userLogin)
    app.post('/api/logout', UserController.logOutUser)
    app.get('/api/issignedin', UserController.isSignedIn)
    app.get('/api/user', UserController.getUsers)
    app.get('/api/user/:id', UserController.getOneUser)
    app.put('/api/skills/:id', UserController.updateSkills)
}