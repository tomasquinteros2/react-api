const { default: mongoose } = require('mongoose')
const Game = require('../models/game')

module.exports = {
    index: async (req,res,next)=>{
        try{
            const games = await Game.find({})
            res.status(200).json(games)
        }
        catch(e){
            console.log(e)
        }
        
    },
    newGame: async (req,res,next)=>{
        try{
            const newGame = new Game(req.body)
            const game = await newGame.save()
            res.status(200).json(game)
        }
        catch(e){
            console.log("no se pudo crear")
        }
        
    },
    getGame: async(req,res,next)=>{
        try{
            const {gameId} = req.params
            const game = await Game.findById(gameId)
            res.status(200).json(game)
        }
        catch(e){
            console.log(e)
        }
    },
    updateGame: async(req,res,next)=>{
        const { id: gameId}   = req.params;
        const update = req.body;
        const oldGame = await Game.findByIdAndUpdate(gameId,update);
        res.status(200).json("EXITO"+gameId);
    },
    deleteGame: async(req,res,next)=>{
        const { id: gameId}   = req.params;
        const oldGame = await Game.findByIdAndDelete(gameId);
        res.status(200).json("EXITO" + gameId);
    }
}