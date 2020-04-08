const express = require('express');

const userDb = require("./userDb.js");

const router = express.Router();

router.post('/', (req, res) => {
  userDb.insert(req.body)
  .then((newUser)=>{
    res.status(200).json(newUser)
  })
  .catch((error)=>{
    res.status(500).json({error: "The user could not be saved."})
  })
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  userDb.get()
  .then((users) => {
    res.status(200).json(users)
  })
  .catch((error)=>{
    res.status(500).json({error: "The user info could not be retrieved"})
  })
});

router.get('/:id', (req, res) => {
  userDb.getById(req.params.id)
  .then((user)=>{
    res.status(200).json(user)
  })
  .catch((error)=>{
    res.status(500).json({error: "The user info could not be retreived"})
  })
});

router.get('/:id/posts', (req, res) => {
  userDb.getUserPosts(req.params.id)
  .then((posts)=>{
    res.status(200).json(posts)
  })
  .catch((error)=>{
    res.status(500).json({error: "The user's posts could not be retrieved"})
  })
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
