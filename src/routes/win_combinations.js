import { Router } from "express";
import { v4 as uuidv4 } from 'uuid';

const router = Router()

router.post("/" , async(req,res) => {

    const win = await req.context.models.WinCombinations.create({
        id: uuidv4(),
        description: req.body.description,
        line_type: req.body.line_type,
        squares_positions: req.body.squares_positions
    })
    res.status(201).json(win)
})


router.get("/:id" , async(req,res) => {

    const win = await req.context.models.WinCombinations.findByPk(req.params.id)
     
    if(win){
        res.send(win)
        console.log(win)
    } 
     else{
        res.send({error: 'Não encontrada!'})
     }


})

router.get("/" , async(req,res) =>{
    const win = await req.context.models.WinCombinations.findAll()
    console.log(win)
    res.send(win)
})

router.delete("/:id" , async(req,res) => {
    const win = await req.context.models.WinCombinations.findByPk(req.params.id)

    await win.destroy()
    res.status(204).json()
})
router.put("/:id" , async(req,res) => {

    const win = await req.context.models.WinCombinations.findByPk(req.params.id)
    await win.update(req.body)
    await win.save()


    res.json(win)
    
    
})
export default router
