import { error } from "console";
import { Router } from "express";
const WinCombination = require("../models/win_combinations")

const router = Router()

router.post("/win" , async(req,res) => {

    const win = await WinCombination.create(req.body)
    res.status(201).json(win)
})


router.get("/win/:id" , async(req,res) => {

    const win = await WinCombination.findByPk(req.params.id)
     
    if(win){
        res.send(win)
        console.log(win)
    } 
     else{
        res.send({error: 'Não encontrada!'})
     }


})
router.get("win_combinations" , async(req,res) =>{
    const win = await WinCombination.findAll()
    console.log(win)
    res.send(win)
})
router.delete("/deleteWin/:id" , async(req,res) => {
    const win = await WinCombination.findByPk(req.params.id)

    await win.destroy()
    res.status(204).json()
})
router.put("/win/:id" , async(req,res) => {
    const win = await WinCombination.findByPk(req.params.id)
    await win.update(req.body)
    await win.save()
    res.json(win)
    
    
})