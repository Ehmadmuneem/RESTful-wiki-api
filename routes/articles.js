const express=require("express");
const router=express.Router();
///CRUD operations to a whole model/collection
router.get("/",function (req, res) {
    Article.find({})

      .then(function (found) {
        res.send(found);
      })
      .catch((err) => {
        console.log(err);
      });
  })
  router.post("/",function (req, res) {
    const newTitle = req.body.title;
    const newContent = req.body.content;
    console.log(req.body.title)

    const newArticle = new Article({
      title: newTitle,
      content: newContent,
    });
    newArticle.save().then(function (output) {
      res.send("Document successfully saved in Article collection" + output);
    });
  })
  router.delete("/",function (req, res) {
    Article.deleteMany({}).then(function () {
      res.send(
        " Successfully Deleted all the  inside Article collection"
      );
    });
  });
module.exports=router;