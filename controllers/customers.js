const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// ✅ สร้างลูกค้าใหม่
router.post('/', async (req, res) => {
    try {
        const { first_name, last_name, email, address, phone_number } = req.body;
        const customer = await prisma.customers.create({
            data: { first_name, last_name, email, address, phone_number }
        });

        res.status(201).json(customer);
    } catch (error) {
        res.status(500).json({ error: "Error creating customer", details: error.message });
    }
});

// ✅ ดึงข้อมูลลูกค้าทั้งหมด
router.get('/', async (req, res) => {
    try {
        const customers = await prisma.customers.findMany();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: "Error fetching customers", details: error.message });
    }
});

module.exports = router;
