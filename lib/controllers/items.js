const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const Item = require('../models/Item');

module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    try {
      const { description, qty } = req.body;
      const { id } = req.user;
      const data = await Item.insert({ description, qty, user_id: id });

      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .get('/', authenticate, async (req, res, next) => {
    try {
      const { id } = req.user;
      const data = await Item.getAll(id);

      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .put('/:id', authenticate, authorize, async (req, res, next) => {
    try {
      const { id } = req.params;
      const { bought } = req.body;
      const data = await Item.updateById(id, { bought });

      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', authenticate, authorize, async (req, res, next) => {
    try {
        const resp = await Item.delete(req.params.id);
        res.json(resp);
    } catch(e) {
        next(e);
    }
  });