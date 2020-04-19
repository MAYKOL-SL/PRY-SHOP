function getNotes(req, res) {
  req.getConnection(function(err, connection) {
    if (err) return next(err);
    connection.query("SELECT * FROM Note", function(err, rows) {
      if (err) console.log("Error Selecting : %s ", err);
      res.render("notes/listNotes", { data: rows });
    });
  });
}

function addNote(req, res) {
  res.render("notes/formNewNotes");
}

function newNote(req, res) {
  let { title, description } = req.body;

  const errors = [];
  if (!title) {
    errors.push({ text: "Please write a Title" });
  }
  if (!description) {
    errors.push({ text: "Please write a Discription" });
  }

  if (errors.length > 0) {
    res.render("notes/formNewNotes", { errors, title, description });
  } else {
    let input = JSON.parse(JSON.stringify(req.body));
    req.getConnection((err, connection) => {
      let data = {
        title: input.title,
        description: input.description
      };
      connection.query("INSERT INTO Note set ?", data, (err, customer) => {
        req.flash("success_msg", "Note Added SuccessFull");
        res.redirect("/api/shop/notes");
      });
    });
  }
}

function editNote(req, res) {
  let id = req.params.id;
  req.getConnection(function(err, connection) {
    connection.query("SELECT * FROM Note WHERE id = ?", [id], function(
      err,
      rows
    ) {
      if (err) console.log("Error Selecting : %s ", err);
      res.render("notes/formEditNotes", { data: rows[0] });
    });
  });
}

function updateNote(req, res) {
  let input = JSON.parse(JSON.stringify(req.body));
  let id = req.params.id;
  req.getConnection(function(err, connection) {
    let data = {
      title: input.title,
      description: input.description
    };
    connection.query("UPDATE Note set ? WHERE id = ? ", [data, id], function(
      err,
      rows
    ) {
      if (err) console.log("Error Updating : %s ", err);
      req.flash("success_msg", "Note Update SuccessFull");
      res.redirect("/api/shop/notes");
    });
  });
}

function deleteNote(req, res) {
  var id = req.params.id;
  req.getConnection(function(err, connection) {
    connection.query("DELETE FROM Note WHERE id = ? ", [id], function(
      err,
      rows
    ) {
      if (err) console.log("Error deleting : %s ", err);
      req.flash("success_msg", "Note Delete SuccessFull");
      res.redirect("/api/shop/notes");
    });
  });
}

module.exports = {
  getNotes,
  addNote,
  newNote,
  editNote,
  updateNote,
  deleteNote
};
