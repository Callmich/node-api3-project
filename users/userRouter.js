const express = require('express');

const userDb = require("./userDb.js");
const postDb = require("../posts/postDb");

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  userDb.insert(req.body)
  .then((newUser)=>{
    res.status(200).json(newUser)
  })
  .catch((error)=>{
    res.status(500).json({error: "The user could not be saved."})
  })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
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

router.get('/:id', validateUserId, (req, res) => {
  userDb.getById(req.params.id)
  .then((user)=>{
    res.status(200).json(user)
  })
  .catch((error)=>{
    res.status(500).json({error: "The user info could not be retreived"})
  })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  userDb.getUserPosts(req.params.id)
  .then((posts)=>{
    res.status(200).json(posts)
  })
  .catch((error)=>{
    res.status(500).json({error: "The user's posts could not be retrieved"})
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  userDb.remove(req.params.id)
  .then((delUser)=>{
    res.status(200).json(delUser)
  })
  .catch((error)=>{
    res.status(500).json({error: "The user could not be deleted"})
  })
});

router.put('/:id', validateUserId, (req, res) => {
  userDb.update(req.params.id, req.body)
  .then((upUser)=>{
    res.status(200).json(upUser)
  })
  .catch((error)=>{
    res.status(500).json({error: "user could not be deleted"})
  })
});

//custom middleware

// validateUserId validates the user id on every request that expects a user id parameter
// if the id parameter is valid, store that user object as req.user
// if the id parameter does not match any user id in the database, cancel the request and respond with status 400 and { message: "invalid user id" }

function validateUserId(req, res, next) {
  userDb.getById(req.params.id)
  .then((userId) => {
    // console.log("is this it?",userId)
    if(userId){
      req.user = userId;
      console.log("Req.user", req.user)
      next();
    }else{
      res.status(400).json({message: "Invalid user id"})
    }
  })
  
}

// validateUser validates the body on a request to create a new user
// if the request body is missing, cancel the request and respond with status 400 and { message: "missing user data" }
// if the request body is missing the required name field, cancel the request and respond with status 400 and { message: "missing required name field" }

function validateUser(req, res, next) {
  console.log("req.body",req.body)
  if(Object.keys(req.body).length >= 1){
    if(req.body.name){
      next()
    }else{
      res.status(400).json({message: "missing required name field"})
    }
  }else{
    res.status(400).json({message: "missing user data"})
  }
}


// validatePost validates the body on a request to create a new post
// if the request body is missing, cancel the request and respond with status 400 and { message: "missing post data" }
// if the request body is missing the required text field, cancel the request and respond with status 400 and { message: "missing required text field" }

function validatePost(req, res, next) {
  console.log("req.body",req.body)
  if(Object.keys(req.body).length >= 1){
    if(req.body.text){
      next()
    }else{
      res.status(400).json({message: "missing required text field"})
    }
  }else{
    res.status(400).json({message: "missing post data"})
  }
}

module.exports = router;
