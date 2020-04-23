const db = require("../../database");

let getProducts = async (req, res) => {
  await db.query(
    "SELECT * FROM product WHERE user_id = ?",
    [req.user.id],
    function(err, rows) {
      if (err) console.log("Error Selecting : %s ", err);
      res.render("product/listProduct", { products: rows });
    }
  );
};

let addProduct = async (req, res) => {
  await db.query(
    "SELECT * FROM category WHERE user_id = ?",
    [req.user.id],
    function(err, rows) {
      if (err) console.log("Error Selecting : %s ", err);
      res.render("product/formNewProduct", { listCategory: rows });
    }
  );
};

let newProduct = async (req, res) => {
  let input = JSON.parse(JSON.stringify(req.body));
  function linkImage() {
    if (input.image == "") {
      return null;
    } else {
      return input.image;
    }
  }

  let product = {
    name: input.name,
    brand: input.brand,
    description: input.description,
    image: linkImage(),
    price: input.price,
    size: input.size,
    color: input.color,
    isdeleted: false,
    user_id: req.user.id,
    category_id: input.category
  };

  await db.query("INSERT INTO product set ?", product, (err, customer) => {
    req.flash("success_msg", "Product Added SuccessFull");
    res.redirect("/products");
  });
};

let editProduct = async (req, res) => {
  let categories = await db.query("SELECT * FROM category WHERE user_id = ?", [
    req.user.id
  ]);

  let id = req.params.id;
  await db.query("SELECT * FROM product WHERE id = ?", [id], function(
    err,
    rows
  ) {
    if (err) console.log("Error Selecting : %s ", err);
    res.render("product/formEditProduct", {
      contact: rows[0],
      listCategory: categories
    });
  });
};

let updateProduct = async (req, res) => {
  let input = JSON.parse(JSON.stringify(req.body));
  let id = req.params.id;
  function linkImage() {
    if (input.image == "") {
      return null;
    } else {
      return input.image;
    }
  }
  let product = {
    name: input.name,
    brand: input.brand,
    description: input.description,
    image: linkImage(),
    price: input.price,
    size: input.size,
    color: input.color,
    isdeleted: false,
    category_id: input.category
  };

  await db.query("UPDATE product set ? WHERE id = ? ", [product, id], function(
    err,
    rows
  ) {
    if (err) console.log("Error Updating : %s ", err);
    req.flash("success_msg", "Products Update SuccessFull");
    res.redirect("/products");
  });
};

let deleteProduct = async (req, res) => {
  var id = req.params.id;
  await db.query("DELETE FROM product WHERE id = ? ", [id], function(
    err,
    rows
  ) {
    if (err) console.log("Error deleting : %s ", err);
    req.flash("success_msg", "Products Delete SuccessFull");
    res.redirect("/products");
  });
};

module.exports = {
  getProducts,
  addProduct,
  newProduct,
  editProduct,
  updateProduct,
  deleteProduct
};
