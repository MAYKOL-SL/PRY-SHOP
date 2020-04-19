//INITIALIZATION
let express = require("express");
let cors = require("cors");
let bodyParser = require("body-parser");
let path = require("path");
let exphbs = require("express-handlebars");
let methodOverride = require("method-override");
let session = require("express-session");
let mysql = require("mysql");
let connection = require("express-myconnection");
let flash = require("connect-flash");

var app = express();
var router = express.Router();
var config = require("./database");
//SETTING
app.use(cors());

app.set("port", process.env.PORT || 8080);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main", //layout comun pantilla
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"), //pequenas partes de html reutilizables
    extname: ".hbs" //etencion
  })
);
app.set("view engine", ".hbs");

//MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
app.use(methodOverride("_method")); // enviar otros tipos de metodos
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

//enviar mensajes entre multiples vistas
app.use(flash());

app.use(connection(mysql, config.dbOptions, "single"));
app.use(express.urlencoded({ extended: false }));

router.use(function(req, res, next) {
  console.log("Something is happening.(middleware)");
  next(); // make sure we go to the next routes and don't stop here
});

//GLOBAL VARIABLES
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

//ROUTES
require("./routes")(app);

//STATIC FILES
app.use(express.static(path.join(__dirname, "public")));
//SERVER LISTENNING
app.listen(app.get("port"), () => {
  console.log("Server on port :", app.get("port"));
});
