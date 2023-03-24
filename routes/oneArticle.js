  const { Router } = require("express");
const express=require("express");
  const router=express.Router();
  
  
  ///CRUD operation on a specific document
  router.get("/", function (req, res) {
    //console.log(req.params.articleName);
    Article.findOne({ title: req.params.articleName })
      .then(function (article) {
        res.send(article);
      })
      .then(function (err) {
        res.send(err);
      });
  })

  //Updating the whole document feilds inside a model
  router.put("/",function (req, res) {
    Article.replaceOne(
      { title: req.params.articleName },
      { title: req.body.title, content: req.body.content },
      { overwrite: true }
    )
      .then(function () {
        res.send("Document successfully updated!");
      })
      .catch(function (err) {
        console.log(err);
      });
  })
  //updating a single document feild of a model

  router.patch("/",function (req, res) {
    const article = req.params.articleName;
    Article.findOneAndUpdate({ title: article }, { $set: req.body })
      .then(function () {
        res.send("Successfully updated");
      })
      .catch(function () {
        res.send(err);
      });
  })
  router.delete("/",function (req, res) {
    Article.deleteOne({ title: req.body.articleName })
      .then(function () {
        res.send("successfully document deleted");
      })
      .catch(function (err) {
        res.send(err);
      });
  });
  module.exports=router;