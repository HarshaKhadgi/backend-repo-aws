// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import "./db/mongoConnection.js";
// import registerUserRoute from "./routes/registerUserRoute.js";
// import ecommerceProductRoute from "./routes/ecommerceProductRoute.js";
// dotenv.config();

// const port = process.env.PORT;
// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/registerUser", registerUserRoute);
// app.use("/ecommerceProduct", ecommerceProductRoute);

// app.listen(port, () => {
//   console.log(`Listning on port ${port}`);
// });

// ------------------------------

import express from "express";
import cluster from "cluster";
import os from "os";
import cors from "cors";
import dotenv from "dotenv";
import "./db/mongoConnection.js";
import registerUserRoute from "./routes/registerUserRoute.js";
import ecommerceProductRoute from "./routes/ecommerceProductRoute.js";
import orderRoute from "./routes/orderRoute.js";
dotenv.config();

const CPU = os.cpus().length;

// console.log(CPU);
// if (cluster.isPrimary) {
//   for (let i = 0; i < CPU; i++) {
//     cluster.fork();
//   }
// } else {
const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/registerUser", registerUserRoute);
app.use("/ecommerceProduct", ecommerceProductRoute);
app.use("/order", orderRoute);

app.listen(port, () => {
  console.log(`Listning on port ${port}`);
});
// }
