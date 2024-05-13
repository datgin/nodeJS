import Product from "../models/products.js";

export const ProductController = {
  getProducts: async (req, res) => {
    try {
      const products = await Product.find();
      if (products.length == 0) {
        return res.status(404).json({
          status: 404,
          message: "Products not found",
        });
      }
      return res.status(200).json({
        status: 200,
        data: products,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getProductByID: async (req, res) => {
    try {
      const products = await Product.findById(req.params.id);
      if (!products) {
        return res.status(404).json({
          status: 404,
          message: "Products not found",
        });
      }
      return res.status(200).json({
        status: 200,
        data: products,
      });
    } catch (error) {
      console.log(error);
    }
  },
  create: async (req, res) => {
    try {
      const products = await Product.create(req.body);
      if (!products) {
        return res.status(404).json({
          status: 404,
          message: "Products not found",
        });
      }
      return res.status(200).json({
        status: 200,
        data: products,
      });
    } catch (error) {
      console.log(error);
    }
  },
  update: async (req, res) => {
    try {
      const products = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!products) {
        return res.status(404).json({
          status: 404,
          message: "Products not found",
        });
      }
      return res.status(200).json({
        status: 200,
        data: products,
      });
    } catch (error) {
      console.log(error);
    }
  },
  remove: async (req, res) => {
    try {
      const products = await Product.findOneAndDelete(
        req.params.id
      );
      if (!products) {
        return res.status(404).json({
          status: 404,
          message: "Products not found",
        });
      }
      return res.status(200).json({
        status: 200,
        data: products,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
