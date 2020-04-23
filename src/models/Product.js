let ProductModel = function() {
  this.product = {
    name: null,
    brand: null,
    description: null,
    image: null,
    price: 0,
    size: null,
    color: null,
    isdeleted: false,
    user_id: 0,
    category_id: 0
  };

  this.fill = function(info) {
    if (info) {
      for (let property in this.product) {
        this.product[property] = info[property];
      }
    }
  };

  this.setName = function(name) {
    this.product.name = name;
  };

  this.setBrand = function(brand) {
    this.product.brand = brand;
  };

  this.setDescription = function(description) {
    this.product.description = description;
  };

  this.setImage = function(image) {
    this.product.image = image;
  };

  this.setPrice = function(price) {
    this.product.price = price;
  };

  this.setSize = function(size) {
    this.product.size = size;
  };

  this.setColor = function(color) {
    this.product.color = color;
  };

  this.setIsDelete = function(isdeleted) {
    this.product.isdeleted = isdeleted;
  };

  this.setUserId = function(userId) {
    this.product.user_id = userId;
  };

  this.setCategoryId = function(categoryId) {
    this.product.category_id = categoryId;
  };

  this.getProduct = function() {
    return this.product;
  };
};

module.exports = ProductModel;
