const Item = require('../models/Item');

module.exports = async (req, res, next) => {
  try {
    const item = await Item.getById(req.params.id);
    if (!req.user || req.user.id !== item.user_id) throw new Error('You are not authorized');
    next();
  } catch (err) {
    err.status = 403;
    next(err);
  }
};
  
