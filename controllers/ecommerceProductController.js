import EcommerceProductModel from "../models/ecommerceProduct.js";

export const addProduct = async (req, res) => {
  try {
    const addingProduct = await EcommerceProductModel.create(req.body);
    res.status(200).send(addingProduct);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

export const getProduct = async (req, res) => {
  try {
    const gettingProduct = await EcommerceProductModel.find();
    res.status(200).send(gettingProduct);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

export const getProductbyId = async (req, res) => {
  const { pids } = req.body;
  // console.log(pids)
  try {
    const gettingProduct = await EcommerceProductModel.find({
      _id: { $in: pids },
    });
    res.status(200).send(gettingProduct);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
