const Position = require('../models/Position.model')

module.exports = {
    addPosition: async (req,res) => {
        try{
            const newPosition = await Position.create( req.body )
            res.status(201).json({successMessage: "Position added successfully", position: newPosition})
        }catch(error){
            res.status(400).json(error)
        }
    },
    getPositions: async (req,res) => {
        try{
            const positions = await Position.find( { userId: req.params.id } )
            res.status(201).json({ positions })
        }catch(error){
            res.status(400).json(error)
        }
    },
    getAllPositions: async (req,res) => {
        try{
            const positions = await Position.find( { } )
            res.status(201).json({ positions })
        }catch(error){
            res.status(400).json(error)
        }
    },
    deletePosition: (req,res) => {
        Position.findOneAndRemove({ _id: req.params.id })
            .then( position => res.json(position) )
            .catch( err => res.status(400).json(err) )
    }
}