const express = require('express');

const userDb = require("./userDb.js");
const postDb = require("../posts/postDb");

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
  //const id = req.params.id
  postDb.insert(req.body)
  .then((newPost)=>{
    res.status(200).json(newPost)
  })
  .catch((error)=>{
    console.log("postpost error",error)
    res.status(500).json({error: "The Post could not be saved"})
  })
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
  userDb.remove(req.params.id)
  .then((delUser)=>{
    res.status(200).json(delUser)
  })
  .catch((error)=>{
    res.status(500).json({error: "The user could not be deleted"})
  })
});

router.put('/:id', (req, res) => {
  userDb.update(req.params.id, req.body)
  .then((upUser)=>{
    res.status(200).json(upUser)
  })
  .catch((error)=>{
    res.status(500).json({error: "user could not be deleted"})
  })
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
