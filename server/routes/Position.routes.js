const PositionController = require('../controllers/Position.controllers')

module.exports = app => {
    app.post('/api/position',PositionController.addPosition)
    app.get('/api/position/:id',PositionController.getPositions)
    app.get('/api/position',PositionController.getAllPositions)
    app.delete('/api/position/:id',PositionController.deletePosition)
}