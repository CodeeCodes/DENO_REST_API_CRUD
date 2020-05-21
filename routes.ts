import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  getProducts,
  addProduct,
  updateProduct,
  getProduct,
  deleteProduct,
} from "./controllers/products.ts";
//Create new router object
const router = new Router();

//Create first route, calling api, destructed to only get response, TS so
//Indicate response will be an object
router
  .get("/api/v1/products", getProducts)
  .get("/api/v1/products/:id", getProduct)
  .post("/api/v1/products", addProduct)
  .put("/api/v1/products/:id", updateProduct)
  .delete("/api/v1/products/:id", deleteProduct);

export default router;
