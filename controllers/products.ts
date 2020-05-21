import { Product } from "../types.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

let products = ([] = [
  {
    id: "1",
    name: "Product 1",
    description: "This is product 1",
    price: 10,
  },
  {
    id: "2",
    name: "Product 2",
    description: "This is product 2",
    price: 20,
  },
  {
    id: "3",
    name: "Product 3",
    description: "This is product 3",
    price: 30,
  },
]);

//@desc    Get all products
//@route   Get /api/v1/products

const getProducts = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: products,
  };
};

//@desc    Get single product
//@route   Get /api/v1/products/:id
//"params" to grab id

const getProduct = ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  const product: Product | undefined = products.find((p) => p.id === params.id);

  if (product) {
    response.status = 200;
    response.body = {
      success: true,
      data: product,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No product found",
    };
  }
};

//@desc    add product
//@route   Post /api/v1/products
//201 data created

const addProduct = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  const body = await request.body();

  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      msg: "No data",
    };
  } else {
    const product: Product = body.value;
    product.id = v4.generate();
    products.push(product);
    response.status = 201;
    response.body = {
      success: true,
      data: product,
    };
  }
};

//@desc    update product
//@route   Put /api/v1/products

const updateProduct = async ({
  params,
  request,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  const product: Product | undefined = products.find((p) => p.id === params.id);

  if (product) {
    const body = await request.body();
    const updateData: { name?: string; description?: string; price?: number } =
      body.value;
    products = products.map((p) =>
      p.id === params.id ? { ...p, ...updateData } : p
    );
    response.status = 200;
    response.body = {
      success: true,
      data: products,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No product found",
    };
  }
};

//@desc    delete product
//@route   Delete /api/v1/product/:id

const deleteProduct = async ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  products = products.filter((p) => p.id !== params.id);
  response.status = 200;
  response.body = {
    success: true,
    msg: "Product removed",
    data: products,
  };
};

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct };
