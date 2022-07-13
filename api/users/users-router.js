const express = require('express');

const Users = require('./users-model');
const Posts = require('../posts/posts-model');
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware');

const router = express.Router();

//GETS ALL USERS
router.get('/', (req, res, next) => {
  Users.get(req.query)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(next)
});

//GETTING USER BY ID
router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user)
});

//ADDING A NEW USER
router.post('/', validateUser, (req, res, next) => {
  Users.insert(req.name)
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(next)
});

//UPDATING THE USER
router.put('/:id', validateUserId, validateUser, (req, res, next) => {
Users.update(req.params.id, req.name)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(next)
});

//DELETING A USER
router.delete('/:id', validateUserId, (req, res, next) => {
  Users.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json(req.user)
      }
    })
    .catch(next)
});

//GETTING USER POSTS BY ID
router.get('/:id/posts', validateUserId, (req, res, next) => {
  Users.getUserPosts(req.params.id)
    .then(messages => {
      res.status(200).json(messages)
    })
    .catch(next)
});

//ADDING A POST
router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  const postInfo = { ...req.text, user_id: req.params.id }
  Posts.insert(postInfo)
    .then(newPost => {
      res.status(201).json(newPost)
    })
    .catch(next)
});

module.exports = router;
