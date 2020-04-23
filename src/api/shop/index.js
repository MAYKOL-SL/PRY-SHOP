let express = require("express");
let usersController = require("./users.controller");
let notesController = require("./notes.controller");
let homeController = require("./home.controller");
let productController = require("./product.controller");
let contactController = require("./contact.controller");
let { isLoggedIn, isNotLoggedIn } = require("../../lib/auth");
let {
  userValidation,
  validate,
  loginUserValidation,
  loginValidate,
  noteValidation,
  noteValidate,
  productValidation,
  productValidate,
  contactValidation,
  contactValidate
} = require("../../lib/validation");

let router = express.Router();

router.get("/", homeController.renderIndex);

router.get("/user/profile", isLoggedIn, usersController.getProfile);
router.get("/users/signin", isNotLoggedIn, usersController.getUsersSignin);
router.post(
  "/users/signin",
  loginUserValidation(),
  loginValidate,
  isNotLoggedIn,
  usersController.login
);

router.get("/users/signup", isNotLoggedIn, usersController.getUserSignup);
router.post(
  "/users/signup",
  userValidation(),
  validate,
  isNotLoggedIn,
  usersController.addUser
);
router.get("/users/logout", isLoggedIn, usersController.logout);

router.get("/notes", isLoggedIn, notesController.getNotes);
router.get("/notes/add", isLoggedIn, notesController.addNote);
router.post(
  "/notes/new-note",
  noteValidation(),
  noteValidate,
  isLoggedIn,
  notesController.newNote
);
router.get("/notes/edit/:id", isLoggedIn, notesController.editNote);
router.put(
  "/notes/update/:id",
  noteValidation(),
  noteValidate,
  isLoggedIn,
  notesController.updateNote
);
router.get("/notes/delete/:id", isLoggedIn, notesController.deleteNote);

router.get("/contacts", isLoggedIn, contactController.getContacts);
router.get("/contact/add", isLoggedIn, contactController.addContact);
router.post(
  "/contact/new-contact",
  contactValidation(),
  contactValidate,
  isLoggedIn,
  contactController.newContact
);
router.get("/contact/edit/:id", isLoggedIn, contactController.editContact);
router.put(
  "/contact/update/:id",
  contactValidation(),
  contactValidate,
  isLoggedIn,
  contactController.updateContact
);
router.get("/contact/delete/:id", isLoggedIn, contactController.deleteContact);

router.get("/products", isLoggedIn, productController.getProducts);
router.get("/product/add", isLoggedIn, productController.addProduct);
router.post(
  "/product/new-product",
  productValidation(),
  productValidate,
  isLoggedIn,
  productController.newProduct
);
router.get("/product/edit/:id", isLoggedIn, productController.editProduct);
router.put(
  "/product/update/:id",
  productValidation(),
  productValidate,
  isLoggedIn,
  productController.updateProduct
);
router.get("/product/delete/:id", isLoggedIn, productController.deleteProduct);

module.exports = router;
