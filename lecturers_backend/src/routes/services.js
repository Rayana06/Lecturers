const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/services.json');

router.get('/', (req, res) => {
    try {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        const services = JSON.parse(raw);
        res.json(services);
    } catch (e) {
        res.status(500).json({ error: 'Не удалось загрузить услуги' });
    }
});

module.exports = router;