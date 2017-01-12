var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

//set up template engine
app.set('view engine', 'ejs');

//static files - middleware
app.use('/assets', express.static('common'));


//fire Controllers
todoController(app);

//listen to port
app.listen(3000);
console.log('listening to port 3000');


/* more
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json(); // create application/json parser
var urlencodedParser = bodyParser.urlencoded({ extended: false }) // create application/x-www-form-urlencoded parser
*/
