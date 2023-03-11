const Product = require("../models/Product");
const Brand = require("../models/Brand");

exports.getProductsService = async (filters, queries) => {
    // const products = await Product.find({})

    //http://localhost:5000/api/v1/product     **************************************************
    // const products = await Product.find({}).sort({price: 1})
    // const products = await Product.find({}).sort('quantity price')
    // const products = await Product.find(query)
    // const products = await Product.find({}).sort(queries.sortBy)
    // const products = await Product.find({}).sort(queries.sortBy).select('name description')
    // const products = await Product.find({}).sort(queries.sortBy).select(queries.fields)

    //http://localhost:5000/api/v1/product?price=12
    //http://localhost:5000/api/v1/product?price[gt]=12
    // http://localhost:5000/api/v1/product?sort=price,quantity&fields=name,description      **************************************************
    // const products = await Product.find(filters)
                        // .select(queries.fields)
                        // .sort(queries.sortBy)
    // return products 

    const products = await Product.find(filters)
                    .skip(queries.skip)
                    .limit(queries.limit)
                    .select(queries.fields)
                    .sort(queries.sortBy)
    const totalProducts = await Product.countDocuments(filters);
    const pageCount = Math.ceil( totalProducts / queries.limit );
    return { totalProducts, pageCount, products }
}


exports.createProductService = async (data) => {
  const product = await Product.create(data);
  const { _id:productId, brand } = product;

  //update Brand
  const res = await Brand.updateOne(
    { _id:brand.id }, //ai id ta nisi, kun brand seta search korte, pore niser line e push kore update kore dilam
    { $push : { products: productId }}
    )
  console.log(res);
  return product;
};

exports.updateProductByIdService = async (productId, data) => {
  const result = await Tour.updateOne(
            { _id: tourId },
            { $set: data },
            // { $inc: data }, // like price barabo/increment korbo
            { runValidators: true}
      )

  // const product = await Product.findById(productId);
  // const result = await product.set(data).save();
  return result;
};

exports.bulkUpdateProductService = async (data) => {
  // {
    //       "ids": ["640c03d44b23a8fe35e672b6", "640c03d14b23a8fe35e672b4"],
    //       "data": {"price": "$16 / Per Person"}
    //   }

  // console.log(data.ids,data.data)
  // const result = await Product.updateMany({ _id: data.ids }, data.data, {
  //     runValidators: true
  // });


    //   {
    //       "ids": [
    //           {
    //               "id": "640c03d44b23a8fe35e672b6",
    //               "data": {"price": "$996 / Per Person"}
    //           },
    //           {
    //               "id": "640c03d14b23a8fe35e672b4",
    //               "data": {"price": "$896 / Per Person"}
    //           }
    //       ]
    //   }

  const products = [];

  data.ids.forEach((product) => {
    products.push(Product.updateOne({ _id: product.id }, product.data));
  });

  const result = await Promise.all(products);
  console.log(result);

  return result;
};

exports.deleteProductByIdService = async (id) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

exports.bulkDeleteProductService = async (ids) => {
  const result = await Product.deleteMany({ _id: ids });

  return result;
};
