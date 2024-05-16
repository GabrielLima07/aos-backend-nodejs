import { Router } from "express";
import { v4 as uuidv4 } from 'uuid';
const router = Router();

router.get("/",async (req,res)=>{
    const table = await req.context.models.table.findAll();
    console.log(table)
    res.send(table);
});

router.get("/:tableId", async(req,res)=>{
    const table = await req.context.models.Table.findByPk(req.params.tableId);
    res.send(table);
});

router.post("/",async(req,res)=>{
    if (!req.body.match_id || !req.body.square_position || !req.body.square_value) {
        return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
      }
      const table = await req.context.models.Table.create({
        id: uuidv4(),
        match_id: req.body.match_id,
        square_position: req.body.square_position,
        square_value: req.body.square_value
      });
      res.send(table);
})
router.put("/:tableId", async(req,res)=>{
    const user = await req.context.models.Table.findByPk(req.params.tableId);

    await table.update({
        match_id: req.body.match_id !== undefined ? req.body.match_id : table.match_id,
        square_position: req.body.square_position !== undefined ? req.body.square_position : table.square_position,
        square_value: req.body.square_value !== undefined ? req.body.square_value : table.square_value
    });
    await table.save();
    res.send(table);
});

router.delete("/:tableId", async(req,res)=>{
    const result = await req.context.models.Table.destroy({
        where:{id: req.params.tableId},
    });
    return res.send(result!==0);
})

export default router;