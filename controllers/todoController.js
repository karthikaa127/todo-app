var bodyParser = require('body-parser');
var fs = require('fs');
var data = require("../todo-list.json");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {

  console.log(data.items.length);
  //routing
  app.get('/todo', function (req,res) {
    res.render('todo', {todos: data});
  });
  app.post('/todo', urlencodedParser, function (req,res) {
    data.items.push(req.body);
    fs.writeFile('./todo-list.json', JSON.stringify(data));
    res.json(data);
  });
  app.delete('/todo/:item', function (req,res) {
    data.items = data.items.filter(function (todo) {
      return todo.item.replace(/ /g, '-') !== req.params.item;
    })
    fs.writeFile('./todo-list.json', JSON.stringify(data));
    res.json(data);
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
