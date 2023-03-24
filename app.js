const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const articles=require("./routes/articles");
const oneArticle=require("./routes/oneArticle");


const app=express();
const port = 3000;


app.set("view-engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
//.use( articles);
//.use( oneArticle);


const mongoDB = "mongodb://0.0.0.0:27017/wikiDB";
//.then((res)=> {console.log(res)}).catch((err)=>{console.log(err)});
mongoose.connect(mongoDB, { useNewUrlParser: true }).then(function () {
  console.log("dbserver running on port 27017");
});
//console.log("conn ready:  " + mongoose.connection.readyState);

//schema
const wikiSchema = new mongoose.Schema({
  title: String,
  content: String,
});

//model
let Article = mongoose.model("article", wikiSchema);
const article= new Article({
  title: "MongoDB",
  content: "Mongodb has finally stop working with callback functions!",
});
// article4.save().then(function (res) {
//   console.log("successfully saved");
// });
///CRUD operations to a whole model/collection
app.route("/articles")
.get(function (req, res) {
  Article.find({})

    .then(function (found) {
      res.send(found);
    })
    .catch((err) => {
      console.log(err);
    });
})
.post(function (req, res) {
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
.delete(function (req, res) {
  Article.deleteMany({}).then(function () {
    res.send(
      " Successfully Deleted all the  inside Article collection"
    );
  });
});

 ///CRUD operation on a specific document
 app.route("/articles/:articleName")
 .get( function (req, res) {
 
  Article.findOne({ title: req.params.articleName })
    .then(function (article) {
      res.send(article);
    })
    .catch(function (err) {
      res.send(err);
    });
})

//Updating the whole document feilds inside a document
.put(function (req, res) {
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
//updating a single document feild of a document

.patch(function (req, res) {
  const article = req.params.articleName;
  Article.findOneAndUpdate({ title: article }, { $set: req.body })
    .then(function () {
      res.send("Successfully updated");
    })
    .catch(function () {
      res.send(err);
    });
})
//deleting a specific document inside a collection
.delete(function (req, res) {
  Article.deleteOne({ title: req.params.articleName })
    .then(function () {
      res.send("successfully document deleted");
    })
    .catch(function (err) {
      res.send(err);
    });
});


 



app.listen(port, function (req, res) {

  console.log(`Server is running on port ${port}`);
});
