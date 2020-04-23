const db = require("../../database");

let getContacts = async (req, res) => {
  await db.query(
    "SELECT * FROM contact WHERE user_id = ?",
    [req.user.id],
    function(err, rows) {
      if (err) console.log("Error Selecting : %s ", err);
      res.render("contact/listContact", { listContact: rows });
    }
  );
};

let addContact = async (req, res) => {
  let roles = await db.query("SELECT * FROM rol WHERE user_id = ?", [
    req.user.id
  ]);

  let citys = await db.query("SELECT * FROM city WHERE user_id = ?", [
    req.user.id
  ]);
  res.render("contact/formNewContact", { listRol: roles, listCity: citys });
};

let newContact = async (req, res) => {
  let input = JSON.parse(JSON.stringify(req.body));
  function linkImage() {
    if (input.image == "") {
      return null;
    } else {
      return input.image;
    }
  }
  let contact = {
    first_name: input.first_name,
    last_name: input.last_name,
    email: input.email,
    image: linkImage(),
    isdeleted: false,
    website: input.website,
    user_id: req.user.id,
    rol_id: input.rol,
    city_id: input.city
  };

  await db.query("INSERT INTO contact set ?", contact, (err, customer) => {
    req.flash("success_msg", "Contacts Added SuccessFull");
    res.redirect("/contacts");
  });
};

let editContact = async (req, res) => {
  let roles = await db.query("SELECT * FROM rol WHERE user_id = ?", [
    req.user.id
  ]);

  let citys = await db.query("SELECT * FROM city WHERE user_id = ?", [
    req.user.id
  ]);
  let id = req.params.id;
  await db.query("SELECT * FROM contact WHERE id = ?", [id], function(
    err,
    rows
  ) {
    if (err) console.log("Error Selecting : %s ", err);
    res.render("contact/formEditContact", {
      contact: rows[0],
      listRol: roles,
      listCity: citys
    });
  });
};

let updateContact = async (req, res) => {
  let input = JSON.parse(JSON.stringify(req.body));
  let id = req.params.id;
  function linkImage() {
    if (input.image == "") {
      return null;
    } else {
      return input.image;
    }
  }
  let contact = {
    first_name: input.first_name,
    last_name: input.last_name,
    email: input.email,
    image: linkImage(),
    website: input.website,
    rol_id: input.rol,
    city_id: input.city
  };
  await db.query("UPDATE contact set ? WHERE id = ? ", [contact, id], function(
    err,
    rows
  ) {
    if (err) console.log("Error Updating : %s ", err);
    req.flash("success_msg", "Contact Update SuccessFull");
    res.redirect("/contacts");
  });
};

let deleteContact = async (req, res) => {
  var id = req.params.id;
  await db.query("DELETE FROM contact WHERE id = ? ", [id], function(
    err,
    rows
  ) {
    if (err) console.log("Error deleting : %s ", err);
    req.flash("success_msg", "Contact Delete SuccessFull");
    res.redirect("/contacts");
  });
};

module.exports = {
  getContacts,
  addContact,
  newContact,
  editContact,
  updateContact,
  deleteContact
};
