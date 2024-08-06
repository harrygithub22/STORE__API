import { Product } from "../models/productModel.js";

export const getAllProduct = async (req, res) => {
  console.log(req.query);
  const { featured, rating, company, name, sort, fields, numericFilters } =
    req.query;
  const myQuery = {};
  if (featured) {
    myQuery.featured = featured === "true";
  }
  if (company) {
    myQuery.company = { $regex: company, $options: "i" };
  }
  // if (rating) {
  //   myQuery.rating = Number(rating);
  // }
  if (name) {
    myQuery.name = { $regex: name, $options: "i" };
  }

  //numeric filters
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      "<": "$lt",
      ">=": "$gte",
      "<=": "$lte",
      "=": "$eq",
      "!=": "$ne",
      "<>": "$ne",
    };
    const regEx = /\b(<|<=|>|>=|=|!=|<>)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    console.log(filters);
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        myQuery[field.trim()] = { ...myQuery[field], [operator]: Number(value) };
      }
    });
  }
  console.log(myQuery);

  let result = Product.find(myQuery);

  if (sort) {
    let sortByfields = sort.split(",");
    sortByfields = sortByfields.map((field) => {
      return field.trim(); //remove blank spaces
    });
    sortByfields = sortByfields.join(" "); //converted into string seperated by space
    result = result.sort(sortByfields);
  } else {
    result = result.sort("createdAt");
  }
  //select fields
  if (fields) {
    let selectedFields = fields.split(",");
    selectedFields = selectedFields.map((field) => field.trim());
    selectedFields = selectedFields.join(" ");
    result = result.select(selectedFields);
  }
  //pagination
  const pageNo = Number(req.query.page) ||1;
  const limitValue = Number(req.query.limit)||  10;

  if (result.length > limitValue) {
    const skipValue = (pageNo - 1) * limitValue;
    result = result.skip(skipValue).limit(limitValue);
  }

  const products = await result;
  res.status(200).json({ nbHits: products.length, products });
};

export const getAllProductTest = async (req, res) => {
  //select * from products
  //   const products = await Product.find();
  // const products = await Product.find({ featured: true });
  // const products = await Product.find({ featured: true });
  // const products = await Product.find({ name: "vase table" });

  // const products = await Product.find({
  //   name: { $regex: "Ab", $options: "i" },
  // });
  // const products = await Product.find().sort("price");
  // const products = await Product.find().sort("-price");
  // const products = await Product.find().sort("name -price");
  // const products = await Product.find().select("name price rating");
  // const products = await Product.find().select("name price");
  // const products = await Product.find().select("name price").limit(10).skip(20);
  const products = await Product.find({ price: { $gt: 30 } })
    .select("name price")
    .limit(10)
    .skip(20);

  res.status(200).json({ nbHits: products.length, products });
};