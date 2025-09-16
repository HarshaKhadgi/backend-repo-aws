import RegisterUserModel from "../models/resgisterUser.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const addUser = async (req, res) => {
  const { email } = req.body;
  try {
    const findingUser = await RegisterUserModel.findOne({ email: email });
    if (findingUser) {
      res.status(409).send("User Already existed");
    } else {
      const addingUser = await RegisterUserModel.create(req.body);
      res.status(200).send(addingUser);
    }
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

export const getUser = async (req, res) => {
  const { userId } = req.decodedData;
  try {
    const gettingUser = await RegisterUserModel.findOne({ _id: userId });
    gettingUser.password = null;
    // console.log(gettingUser);
    res.status(200).send(gettingUser);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const loggingUser = await RegisterUserModel.findOne({ email });
    if (loggingUser) {
      if (loggingUser.password === password) {
        const payload = {
          userId: loggingUser._id,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
          expiresIn: "1h",
        });
        res.status(200).send(token);
      } else {
        res.status(404).send("Invalid Credentials");
      }
    } else {
      res.status(404).send("User does not exist");
    }
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
// export const updateUser = async (req, res) => {
//   try {
//     const updatingUser = await RegisterUserModel.updateOne({});
//     res.status(200).send(gettingUser);
//   } catch (e) {
//     console.log(e);
//     res.status(400).send(e);
//   }
// };

export const addProductInCart = async (req, res) => {
  const { userId } = req.decodedData;
  const product = req.body;
  try {
    const findProduct = await RegisterUserModel.findOne({
      _id: userId,
      "cart.pid": product.pid,
    });

    if (findProduct) {
      const updateQty = await RegisterUserModel.updateOne(
        { _id: userId, "cart.pid": product.pid },
        {
          $inc: { "cart.$.qty": 1 },
        }
      );
      res.status(200).send(updateQty);
      // res.status(200).send("Product Already exists in cart");
    } else {
      const addProductInCart = await RegisterUserModel.updateOne(
        { _id: userId },
        {
          $push: { cart: product },
        }
      );
      res.status(200).send(addProductInCart);
    }
  } catch (e) {
    res.status(400).send(e);
  }
};

export const deleteProductFromCart = async (req, res) => {
  const { userId } = req.decodedData;
  const product = req.body;
  try {
    const findProduct = await RegisterUserModel.findOne({
      _id: userId,
      "cart.pid": product.pid,
    });
    // console.log(findProduct);
    if (findProduct) {
      const userCart = findProduct.cart;
      const findProductInCart = userCart.find((p) => p.pid === product.pid);
      if (findProductInCart.qty > 1) {
        const updateQty = await RegisterUserModel.updateOne(
          { _id: userId, "cart.pid": product.pid },
          {
            $inc: { "cart.$.qty": -1 },
          }
        );
        res.status(200).send(updateQty);
      } else {
        const deleteProductInCart = await RegisterUserModel.updateOne(
          { _id: userId },
          {
            $pull: { cart: { pid: product.pid } },
          }
        );
        res.status(200).send(deleteProductInCart);
      }
      // res.status(200).send("Product Already exists in cart");
    } else {
      res.status(200).send("not exists in cart");
    }
  } catch (e) {
    res.status(400).send(e);
  }
};

export const addProductInWishlist = async (req, res) => {
  try {
    const { userId } = req.decodedData;
    const product = req.body;
    const findProduct = await RegisterUserModel.findOne({
      _id: userId,
      "wishlist.pid": product.pid,
    });
    if (!findProduct) {
      const updateWishlist = await RegisterUserModel.updateOne(
        {
          _id: userId,
        },
        {
          $push: { wishlist: product },
        }
      );
      res.status(200).send(updateWishlist);
    } else {
      const removeIdfromWishlist = await RegisterUserModel.updateOne(
        {
          _id: userId,
        },
        {
          $pull: { wishlist: product },
        }
      );
      res.status(200).send(removeIdfromWishlist);
    }
  } catch (e) {
    res.status(400).send(e);
  }
};

export const addUserAddress = async (req, res) => {
  const { userId } = req.decodedData;
  const addressdata = req.body;
  const aid =
    "AD" +
    (Math.floor(Math.random() * 1000000) + 100000) +
    "" +
    (Math.floor(Math.random() * 1000000) + 100000);
  addressdata.aid = aid;
  try {
    const addingAddress = await RegisterUserModel.updateOne(
      { _id: userId },
      { $push: { address: addressdata } }
    );

    // console.log(address.length);
    res.status(200).send(addingAddress);
  } catch (e) {
    res.status(400).send();
  }
};

export const deleteUserAddress = async (req, res) => {
  const { userId } = req.decodedData;
  const { aid } = req.body;
  // const aid =
  //   "AD" +
  //   (Math.floor(Math.random() * 1000000) + 100000) +
  //   "" +
  //   (Math.floor(Math.random() * 1000000) + 100000);
  // addressdata.aid = aid;
  try {
    // const findAddress = await RegisterUserModel.findOne()

    const deletingAddress = await RegisterUserModel.updateOne(
      { _id: userId },
      { $pull: { address: { aid } } }
    );
    res.status(200).send(deletingAddress);
  } catch (e) {
    res.status(400).send();
  }
};

export const updateUserAddress = async (req, res) => {
  const { aid } = req.body;
  const { userId } = req.decodedData;
  const upcomingAddress = req.body;
  try {
    const updatingAddress = await RegisterUserModel.updateOne(
      { _id: userId, "address.aid": aid },
      { $set: { "address.$": upcomingAddress } }
    );
    res.status(200).send(updatingAddress);
  } catch (e) {
    res.status(400).send(e);
  }
};
