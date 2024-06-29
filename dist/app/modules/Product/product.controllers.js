"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const product_services_1 = require("./product.services");
const getProducts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_services_1.ProductServices.getAllProducts();
    if (!products) {
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
}));
// load single product
// app.get("/product/:id", verifyJWT, async (req, res) => {
//   const id = req.params.id;
//   const query = { _id: ObjectId(id) };
//   const product = await productCollection.findOne(query);
//   res.send(product);
// });
const getProductById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const product = yield product_services_1.ProductServices.getProductById(id);
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
}));
// delete product by id
// app.delete("/product/:id", verifyJWT, verifyADMIN, async (req, res) => {
//   const id = req.params.id;
//   const query = { _id: ObjectId(id) };
//   const result = productCollection.deleteOne(query);
//   res.send(result);
// });
const deleteProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield product_services_1.ProductServices.deleteProduct(id);
    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully",
        data: result,
    });
}));
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
const updateProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const payload = req.body;
    const result = yield product_services_1.ProductServices.updateProduct(id, payload);
    res.status(201).json({
        success: true,
        message: "Product Updated Successfully",
        data: result,
    });
}));
// app.post("/products", verifyJWT, verifyADMIN, async (req, res) => {
//   const body = req.body;
//   const product = await productCollection.insertOne(body);
//   res.send(product);
// });
const addProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield product_services_1.ProductServices.addProduct(payload);
    res.status(201).json({
        success: true,
        message: "Product Updated Successfully",
        data: result,
    });
}));
exports.ProductControllers = {
    getProducts,
    getProductById,
    deleteProduct,
    updateProduct,
    addProduct,
};
