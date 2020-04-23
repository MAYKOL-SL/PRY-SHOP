const { check, validationResult } = require("express-validator");
let userValidation = () => {
  return [
    check("username")
      .not()
      .isEmpty()
      .withMessage("Name must have more than 5 characters"),
    check("email")
      .not()
      .isEmpty()
      .isEmail()
      .withMessage("Your email is not valid"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must have more than 6 characters"),
    check("password_confirm", "Passwords do not match").custom(
      (value, { req }) => value === req.body.password
    )
  ];
};

let validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ text: err.msg }));

  req.flash("error_msg", extractedErrors);
  return res.redirect("/users/signup");
};

let loginUserValidation = () => {
  return [
    check("username")
      .not()
      .isEmpty()
      .withMessage("Username is Required"),
    check("password")
      .not()
      .isEmpty()
      .withMessage("Password is Required")
  ];
};

let loginValidate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ text: err.msg }));

  req.flash("error_msg", extractedErrors);
  return res.redirect("/users/signin");
};

let noteValidation = () => {
  return [
    check("title")
      .not()
      .isEmpty()
      .withMessage("Please write a Title")
  ];
};

let noteValidate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ text: err.msg }));

  req.flash("error_msg", extractedErrors);
  return res.redirect("/notes/add");
};

let productValidation = () => {
  return [
    check("name")
      .not()
      .isEmpty()
      .withMessage("Please write a Name"),
    check("brand")
      .not()
      .isEmpty()
      .withMessage("Please write a Brand"),
    check("description")
      .not()
      .isEmpty()
      .withMessage("Please write a Description"),
    check("price")
      .not()
      .isEmpty()
      .withMessage("Please write a Price"),
    check("category")
      .not()
      .isEmpty()
      .withMessage("Please write a Category")
  ];
};

let productValidate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ text: err.msg }));

  req.flash("error_msg", extractedErrors);
  return res.redirect("/product/add");
};

let contactValidation = () => {
  return [
    check("first_name")
      .not()
      .isEmpty()
      .withMessage("Please write a First Name"),
    check("last_name")
      .not()
      .isEmpty()
      .withMessage("Please write a Last Name"),
    check("email")
      .not()
      .isEmpty()
      .withMessage("Please write a Email")
  ];
};

let contactValidate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ text: err.msg }));

  req.flash("error_msg", extractedErrors);
  return res.redirect("/contact/add");
};

module.exports = {
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
};
