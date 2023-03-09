const {
  getProductsService,
  createProductService,
  updateProductByIdService,
  bulkUpdateProductService,
  deleteProductByIdService,
  bulkDeleteProductService,
} = require("../services/product.services");

exports.getProducts = async (req, res, next) => {
  try {
      // const products = await Product
      //   .where("name").equals(/\w/)
      //   .where("quantity").gt(100).lt(600)
      //   .limit(2).sort({ qunatity: -1 })

      // console.log(req.query);

      let filters = {...req.query}; // copy kore nibo, jeno orginal query delete na hoi, just line 17 te delete hoi

      // sort > page > limit > exclude
      const excludeFields = ['sort', 'page', 'limit'];
      excludeFields.forEach(field => delete filters[field]);

      // http://localhost:5000/api/v1/product?status=in-stock&page=3&limit=3&sort=1
      // console.log("orginal object", req.query);
      // console.log("query object", filters);


      // gt, lt, gte, lte
      //http://localhost:5000/api/v1/product?price[gt]=12
      let filtersString = JSON.stringify(filters)
      filtersString= filtersString.replace(/\b(gt|gte|lt|lte)\b/g , match=> `$${match}`)
      filters = JSON.parse(filtersString)


      const queries = {};

      if(req.query.sort) {
          // http://localhost:5000/api/v1/product?sort=price,quantity
          //price, quantity > 'price quantity'
          const sortBy = req.query.sort.split(",").join(" ");
          queries.sortBy = sortBy
      }

      if(req.query.fields) {
          // http://localhost:5000/api/v1/product?sort=price,quantity&fields=name,description
          const fields = req.query.fields.split(",").join(" ");
          queries.fields = fields
      }

      if(req.query.page){

          // 50 products, each per page show 10 products
          // page - 1 > 1 - 10
          // page - 2 > 11 - 20
          // page - 3 > 21 - 30 ----- skip 1 - 20 > 3 - 1

          //http://localhost:5000/api/v1/product?page=1&limit=2
          const { page = 1, limit = 10} = req.query;
          const skip = ( page - 1) * parseInt(limit);
          queries.skip = skip;
          queries.limit = parseInt(limit);
      }

      // const products = await getProductsService();
      // const products = await getProductsService(filters);
      const products = await getProductsService(filters,queries);

      res.status(200).json({
          status: "success",
          data: products
      });

  } catch (error) {
      res.status(400).json({
          status: "fail",
          message: "can't get the data",
          error: error.message,
      });
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    // save or create

    const result = await createProductService(req.body);

    result.logger();

    res.status(200).json({
      status: "success",
      messgae: "Data inserted successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: " Data is not inserted ",
      error: error.message,
    });
  }
};

exports.updateProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateProductByIdService(id, req.body);

    res.status(200).json({
        stauts: "success",
        message: "Successfully updated the product"
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't update the product",
      error: error.message,
    });
  }
};


exports.bulkUpdateProduct = async (req, res, next) => {
  try {
    console.log(req.body)
    const result = await bulkUpdateProductService(req.body);

    res.status(200).json({
      stauts: "success",
      message: "Successfully updated the product",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't update the product",
      error: error.message,
    });
  }
};


exports.deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await deleteProductByIdService(id);
    
    if(!result.deletedCount){
        return res.status(400).json({
            status: "fail",
            error: "Couldn't delete the product"
        })
    }

    res.status(200).json({
      status: "success",
      message: "Successfully deleted the product",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't delete the product",
      error: error.message,
    });
  }
};

exports.bulkDeleteProduct = async (req, res, next) => {
  try {
    console.log(req.body)
    const result = await bulkDeleteProductService(req.body.ids);

    res.status(200).json({
      stauts: "success",
      message: "Successfully deleted the given products",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't delete the given products",
      error: error.message,
    });
  }
};