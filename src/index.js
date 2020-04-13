//INITIALIZATION
var express        = require('express');        
var cors           = require('cors');                 
//var bodyParser     = require('body-parser');
var path           = require('path'); 
var exphbs         = require('express-handlebars');
var methodOverride = require('method-override');
var session        = require('express-session');
const mysql        = require("mysql");
const myConnection = require("express-myconnection");

var app            = express();
var router         = express.Router();  
var config         = require('./database');
//SETTING
app.use(cors());

app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));  
app.engine('.hbs', exphbs({
    defaultLayout: 'main',                                //layout comun pantilla
    layoutsDir: path.join(app.get('views'), 'layouts'),       
    partialsDir: path.join(app.get('views'), 'partials'), //pequenas partes de html reutilizables
    extname: '.hbs' //etencion     
}));
app.set('view engine', '.hbs');

//MIDDLEWARE
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method')); // enviar otros tipos de metodos
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(myConnection(mysql,config.dbOptions,"single"));

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.(middleware)');
    next(); // make sure we go to the next routes and don't stop here
});

//GLOBAL VARIABLES

//ROUTES
require('./routes')(app);
//app.use('/api', router);

//STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));
//SERVER LISTENNING
app.listen(app.get('port'), () => {
console.log('Server on port :', app.get('port'));
});

