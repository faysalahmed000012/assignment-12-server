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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const product_model_1 = require("./product.model");
// get products
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_model_1.Product.find().lean();
    return products;
});
// load single product
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.findOne({ _id: id });
    return product;
});
// delete product by id
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = product_model_1.Product.deleteOne({ _id: id });
    return result;
});
// update a product
const updateProduct = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //   const id = req.params.id;
    //   const newQuantity = req.body;
    //   const filter = { _id: ObjectId(id) };
    //   const options = { upsert: true };
    //   const updateDoc = {
    //     $set: {
    //       availableQuantity: newQuantity.newQuantity,
    //     },
    //   };
    const result = yield product_model_1.Product.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const addProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.create(payload);
    return product;
});
exports.ProductServices = {
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    addProduct,
};
