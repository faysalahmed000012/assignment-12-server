import IProduct from "./product.interface";
import { Product } from "./product.model";

// get products
const getAllProducts = async () => {
  const products = await Product.find().lean();
  return products;
};

// load single product

const getProductById = async (id: string) => {
  const product = await Product.findOne({ _id: id });
  return product;
};
// delete product by id
const deleteProduct = async (id: string) => {
  const result = Product.deleteOne({ _id: id });
  return result;
};

// update a product
const updateProduct = async (id: string, payload: Partial<IProduct>) => {
  //   const id = req.params.id;
  //   const newQuantity = req.body;
  //   const filter = { _id: ObjectId(id) };
  //   const options = { upsert: true };
  //   const updateDoc = {
  //     $set: {
  //       availableQuantity: newQuantity.newQuantity,
  //     },
  //   };
  const result = await Product.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const ProductServices = {
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
