const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Item = require('../models/Item');

module.exports = Router()
.post('/', authenticate, async (req, res, next) => {
    try {
        const { description, qty } = req.body;
        const { id } = req.user;
        const data = await Item.insert({ description, qty, user_id: id });
    
        res.json(data);
    } catch (e) {
        next (e);
    }
});

// TO DO - implement items CRUD
