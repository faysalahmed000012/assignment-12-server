module.exports.getAllProducts = (req, res, next) => {
  res.send("Products found");
};

module.exports.saveAProduct = (req, res) => {
  res.send("the product has been saved");
};

module.exports.getProductById = (req, res) => {
  res.send("get product by id");
};
module.exports.deleteProduct = (req, res) => {
  res.send("the product has been deleted");
};
module.exports.updateProduct = (req, res) => {
  res.send("the product has been updated");
};
module.exports.postOrder = (req, res) => {
  res.send("the order has been posted");
};

// html sender

module.exports.showHtml = (req, res) => {
  res.sendfile(__dirname + "/public/text.html");
};
