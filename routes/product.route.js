const express = require("express");
const toolsControler = require("../controler/tools.controler");
const router = express.Router();

// router.get("/:id", (req, res) => {
//   console.log("here are some products");
// });

// router.post("/product", (req, res) => {
//   res.send("the product has been posted");
// });

router
  .route("/")
  /**
   * @api {get} /tools All tools
   * @apiDescription Get all the tools
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} all the tools.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(toolsControler.getAllProducts)
  /**
   * @api {get} /tools All tools
   * @apiDescription Get all the tools
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} all the tools.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .post(toolsControler.saveAProduct);

router
  .route("/:id")
  .get(toolsControler.getProductById)
  .delete(toolsControler.deleteProduct)
  .put(toolsControler.updateProduct);

router.route("/order").post(toolsControler.postOrder);

router.route("/pain").get(toolsControler.showHtml);
module.exports = router;
