let express = require("express");
let usersController = require("./users.controller");
let notesController = require("./notes.controller");

let router = express.Router();

router.get("/users/signin", usersController.getUsersSignin);
router.get("/users/signup", usersController.getUserSignup);

router.get("/notes", notesController.getNotes);
router.get("/notes/add", notesController.addNote);
router.post("/notes/new-note", notesController.newNote);
router.get("/notes/edit/:id", notesController.editNote);
router.put("/notes/update/:id", notesController.updateNote);
router.get("/notes/delete/:id", notesController.deleteNote);

module.exports = router;
