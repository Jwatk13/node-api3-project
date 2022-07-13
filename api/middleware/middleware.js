const Users = require('../users/users-model');

function logger(req, res, next) {
  // DO YOUR MAGIC
  //still needs time stamp added to the log
  console.log(req.method, req.originalUrl);
  next();
}

 async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  let id = req.params.id;
  let user = await Users.getById(id)
  if (!user) {
    res.status(404).json({ message: "user not found" });
    return;
  }
  req.user = user
  next();
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  if (typeof req.body.name !== 'string' || req.body.name.trim() === '') {
    next({ message: 'missing required name field', status: 400 });
    return;
  }
  req.newUser = {
      name: req.body.name.trim(),
  };
  next();
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
};