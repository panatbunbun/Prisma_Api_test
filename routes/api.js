const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// ✅ 1. สร้างลูกค้าใหม่
router.post('/', async (req, res) => {
    try {
        const { first_name, last_name, email, address, phone_number } = req.body;

        const newCustomer = await prisma.customers.create({
            data: { first_name, last_name, email, address, phone_number }
        });

        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(500).json({ error: 'Error creating customer', details: error });
    }
});

// ✅ 2. ดึงข้อมูลลูกค้าทั้งหมด
router.get('/', async (req, res) => {
    try {
        const customers = await prisma.customers.findMany();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching customers', details: error });
    }
});

// ✅ 3. ดึงข้อมูลลูกค้าตาม ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await prisma.customers.findUnique({ where: { customer_id: parseInt(id) } });

        if (!customer) return res.status(404).json({ error: 'Customer not found' });

        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching customer', details: error });
    }
});

// ✅ 4. แก้ไขข้อมูลลูกค้า
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, email, address, phone_number } = req.body;

        const updatedCustomer = await prisma.customers.update({
            where: { customer_id: parseInt(id) },
            data: { first_name, last_name, email, address, phone_number }
        });

        res.json(updatedCustomer);
    } catch (error) {
        res.status(500).json({ error: 'Error updating customer', details: error });
    }
});

// ✅ 5. ลบลูกค้า
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.customers.delete({ where: { customer_id: parseInt(id) } });

        res.json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting customer', details: error });
    }
});

module.exports = router;
