import { Router } from "express";
import { v4 as uuidv4 } from 'uuid';
const router = Router();

router.get("/", async (req, res) => {
    try {
        const table = await req.context.models.Table.findAll();
        console.log(table);
        res.send(table);
    } catch (error) {
        console.error("Erro ao retornar tabelas:", error);
        res.status(500).send({ error: "Erro ao retornar tabelas." });
    }
});

router.get("/:tableId", async (req, res) => {
    try {
        const table = await req.context.models.Table.findByPk(req.params.tableId);
        if (table) {
            res.send(table);
        } else {
            res.status(404).send({ error: "Tabela não encontrada." });
        }
    } catch (error) {
        console.error("Erro ao retornar tabela:", error);
        res.status(500).send({ error: "Erro ao retornar tabela." });
    }
});

router.post("/", async (req, res) => {
    try {
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
    } catch (error) {
        console.error("Erro ao criar tabela:", error);
        res.status(500).send({ error: "Erro ao criar tabela." });
    }
});

router.put("/:tableId", async (req, res) => {
    try {
        const table = await req.context.models.Table.findByPk(req.params.tableId);
        if (table) {
            await table.update({
                match_id: req.body.match_id !== undefined ? req.body.match_id : table.match_id,
                square_position: req.body.square_position !== undefined ? req.body.square_position : table.square_position,
                square_value: req.body.square_value !== undefined ? req.body.square_value : table.square_value
            });
            await table.save();
            res.send(table);
        } else {
            res.status(404).send({ error: "Tabela não encontrada." });
        }
    } catch (error) {
        console.error("Erro ao atualizar tabela:", error);
        res.status(500).send({ error: "Erro ao atualizar tabela." });
    }
});

router.delete("/:tableId", async (req, res) => {
    try {
        const result = await req.context.models.Table.destroy({
            where: { id: req.params.tableId },
        });
        return res.send(result !== 0);
    } catch (error) {
        console.error("Erro ao deletar tabela:", error);
        res.status(500).send({ error: "Erro ao deletar tabela." });
    }
});

export default router;