var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var urlencodedParser = bodyParser.urlencoded({ extended: false });


//connect to the database
mongoose.connect('mongodb://test:test@ds117929.mlab.com:17929/todo-karthi')

//creating a schema - blueprint
var todoSchema = new mongoose.Schema({
  item: String
});
//creating a model/collection
var Todo = mongoose.model('Todo', todoSchema);

module.exports = function(app) {
  //routing based on service request
  app.get('/todo', function (req,res) {
    //get data from mongoDB and pass it to view
    Todo.find({}, function (err, data) {  // can pass a item from collection and a callback function
      if(err) throw err;
      res.render('todo', {todos: data});
      console.log(data);
    });
  });
  app.post('/todo', urlencodedParser, function (req,res) {
    //get data from view and add to mongoDB
    var newItem = Todo(req.body).save(function (err, data) {
      if(err) throw err;
      res.json(data);
    });
  });
  app.delete('/todo/:item', function (req,res) {
    //delete selected item from mongoDB
    console.log(req.params.item);
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function (err, data) {
      if(err) throw console.error();
      res.json(data);
    });
  });
};

/*

app.get('/', function (req,res) {
  //res.render('index');
});
app.post('/contact', urlencodedParser, function (req,res) {
  console.log(req.body);
  res.render('contact-success', {data: req.body});// using query strings
});
app.get('/profile/:name', function (req,res) {
  console.log('loading profile page');
  var data = {age:28, job:'UI Developer', hobbies:['stitching', 'knitting', 'crochets']};
  res.render('profile', {person: req.params.name, data: data});//looks in views folder by default
});
*/
