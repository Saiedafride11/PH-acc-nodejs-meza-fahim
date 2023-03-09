const Brand = require("../models/Brand");

exports.createBrandService = async (data) => {
  const result = await Brand.create(data);
  return result;
}


exports.getBrandsService = async () => {
  // http://localhost:5000/api/v1/brand
  // const brands = await Brand.find({}).select("-products -suppliers")
  const brands = await Brand.find({}).populate('products') //populate kore product teke, product guli niye asbo.. product.services.js e amra product er sate, brand update kore disi
  return brands;
}


exports.getBrandByIdService = async (id) => {
  const brand = await Brand.findOne({ _id: id })

  
  return brand;
}


exports.updateBrandService = async (id, data) => {
  const result = await Brand.updateOne({ _id: id }, data, {
    runValidators: true
  });
  return result;
}





//store
//category