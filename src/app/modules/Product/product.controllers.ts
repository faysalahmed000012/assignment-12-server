import catchAsync from "../../utils/catchAsync";
import { ProductServices } from "./product.services";

const getProducts = catchAsync(async (req, res) => {
  const products = await ProductServices.getAllProducts();
  if (products?.length === 0) {
    res.status(400).json({
      success: false,
      message: "Products Not Found",
      error: "",
    });
  }
  res.status(200).json({
    success: true,
    message: "All Products Retrieved Successfully",
    data: products,
  });
});

// load single product

// app.get("/product/:id", verifyJWT, async (req, res) => {
//   const id = req.params.id;
//   const query = { _id: ObjectId(id) };
//   const product = await productCollection.findOne(query);
//   res.send(product);
// });

const getProductById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const product = await ProductServices.getProductById(id);
  if (!product) {
    res.status(400).json({
      success: false,
      message: "Product is Not Found",
      error: "",
    });
  }
  res.status(200).json({
    success: true,
    message: "Product Retrieved Successfully",
    data: product,
  });
});

// delete product by id
// app.delete("/product/:id", verifyJWT, verifyADMIN, async (req, res) => {
//   const id = req.params.id;
//   const query = { _id: ObjectId(id) };
//   const result = productCollection.deleteOne(query);
//   res.send(result);
// });

const deleteProduct = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await ProductServices.deleteProduct(id);
  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
    data: result,
  });
});

// update a product
// app.put("/product/:id", verifyJWT, verifyADMIN, async (req, res) => {
//   const id = req.params.id;
//   const newQuantity = req.body;
//   const filter = { _id: ObjectId(id) };
//   const options = { upsert: true };
//   const updateDoc = {
//     $set: {
//       availableQuantity: newQuantity.newQuantity,
//     },
//   };
//   const result = await productCollection.updateOne(filter, updateDoc, options);
//   res.send(result);
// });

const updateProduct = catchAsync(async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  const result = await ProductServices.updateProduct(id, payload);
  res.status(201).json({
    success: true,
    message: "Product Updated Successfully",
    data: result,
  });
});

// app.post("/products", verifyJWT, verifyADMIN, async (req, res) => {
//   const body = req.body;
//   const product = await productCollection.insertOne(body);
//   res.send(product);
// });

const addProduct = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await ProductServices.addProduct(payload);
  res.status(201).json({
    success: true,
    message: "Product Updated Successfully",
    data: result,
  });
});

export const ProductControllers = {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  addProduct,
};
