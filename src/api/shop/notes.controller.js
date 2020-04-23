const db = require("../../database");

let getNotes = async (req, res) => {
  await db.query(
    "SELECT * FROM notes WHERE user_id = ?",
    [req.user.id],
    function(err, rows) {
      if (err) console.log("Error Selecting : %s ", err);
      res.render("notes/listNotes", { data: rows });
    }
  );
};

let addNote = (req, res) => {
  res.render("notes/formNewNotes");
};

let newNote = async (req, res) => {
  let input = JSON.parse(JSON.stringify(req.body));
  let data = {
    title: input.title,
    description: input.description,
    isdeleted: false,
    user_id: req.user.id
  };
  await db.query("INSERT INTO notes set ?", data, (err, customer) => {
    req.flash("success_msg", "Note Added SuccessFull");
    res.redirect("/notes");
  });
};

let editNote = async (req, res) => {
  let id = req.params.id;
  await db.query("SELECT * FROM notes WHERE id = ?", [id], function(err, rows) {
    if (err) console.log("Error Selecting : %s ", err);
    res.render("notes/formEditNotes", { data: rows[0] });
  });
};

let updateNote = async (req, res) => {
  let input = JSON.parse(JSON.stringify(req.body));
  let id = req.params.id;
  let data = {
    title: input.title,
    description: input.description
  };
  await db.query("UPDATE notes set ? WHERE id = ? ", [data, id], function(
    err,
    rows
  ) {
    if (err) console.log("Error Updating : %s ", err);
    req.flash("success_msg", "Note Update SuccessFull");
    res.redirect("/notes");
  });
};

let deleteNote = async (req, res) => {
  var id = req.params.id;
  await db.query("DELETE FROM notes WHERE id = ? ", [id], function(err, rows) {
    if (err) console.log("Error deleting : %s ", err);
    req.flash("success_msg", "Note Delete SuccessFull");
    res.redirect("/notes");
  });
};

module.exports = {
  getNotes,
  addNote,
  newNote,
  editNote,
  updateNote,
  deleteNote
};
