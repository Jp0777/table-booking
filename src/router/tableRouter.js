const express = require('express');
const router = express.Router();
const Table = require('../models/table-model')

router.post('/add', async (req, res) => {
    try {
        const table = new Table(req.body);
        await table.save();
        res.status(201).send({ table })
    } catch (e) {
        res.send(e)
    }
})
router.get('/list', async (req, res) => {
    try {
        const tables = await Table.find({})
        res.status(200).send({ tables })
        res.send("Hello")
    } catch (e) {

    }
})

router.post('/book', async (req, res) => {
    try {
        const table = await Table.findOne({ tableNo: req.body.tableNo });
        if (!table) {
            return res.status(404).send({ "err": "Table doesnt exist.Please check table number" })
        }
        if (table.bookedBy !== 'Not booked!')
            return res.status(404).send({ "err": "Table is already booked" })

        table.isAvailable = false;
        table.bookedBy = req.body.name;
        table.bookedFor = req.body.time + " mins";
        await table.save();
        res.send({ "Your Booked table": table });
    } catch (e) {
        res.send(e)
    }
})

router.patch('/update', async (req, res) => {
    try {
        const table = await Table.findOne({ tableNo: req.body.tableNo })
        if (!table) {
            return res.status(404).send({ "err": "Table doesnt exist.Please check table number" })
        }
        const validUpdates = ["tableNo", "capacity", "isAvailable", "bookedBy", "bookedFor"];
        const updates = Object.keys(req.body)
        const isValid = updates.every((update) => {
            return validUpdates.includes(update);
        })

        if (!isValid)
            return res.status(404).send({ "err": "Some field you entered either cant exist or cant be changed.Please review!" })

        updates.forEach((update) => {
            if (update === 'bookedFor')
                table[update] = req.body[update] + " mins"
            else
                table[update] = req.body[update]
        })

        await res.status(200).send({ "Updated table": table })
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router;