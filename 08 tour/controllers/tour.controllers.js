
const { getToursService, createTourServices, updateTourByIdService, deleteTourByIdService, bulkUpdateTourService, bulkDeleteTourService, getTourService, getTrendingService, getCheapestService } = require("../services/tour.services");
    
    exports.getTours = async (req, res, next) => {
        try {
            // const products = await Product
            //   .where("name").equals(/\w/)
            //   .where("quantity").gt(100).lt(600)
            //   .limit(2).sort({ qunatity: -1 })
    
            
            // const products = await getProductsService();
            // const products = await getProductsService(filters);

            const filters = {...req.query}

            const excludeFields = [ 'sort', 'page', 'limit', 'fields']
            excludeFields.forEach(field => delete filters[field]);

            // console.log("orginal object", req.query.sort);
            // console.log("query object", filters);

            const queries = {};

            if(req.query.sort){
                // http://localhost:5000/api/v1/tours?sort=price
                const sortBy = req.query.sort.split(",").join(" ");
                queries.sortBy = sortBy;
            }

            if(req.query.fields){
                // http://localhost:5000/api/v1/tours?fields=title, location
                const fields = req.query.fields.split(",").join(" ");
                queries.fields = fields
            }

            if(req.query.page){    
                //http://localhost:5000/api/v1/tours??page=1&limit=2
                const { page = 1, limit = 10} = req.query;
                const skip = ( page - 1) * parseInt(limit);
                queries.skip = skip;
                queries.limit = parseInt(limit);
            }

            // http://localhost:5000/api/v1/tours?sort=price&fields=title price, location&page=2&limit=2
            const tours = await getToursService(filters,queries);
    
            res.status(200).json({
                status: "success",
                data: tours
            });
    
        } catch (error) {
            res.status(400).json({
                status: "fail",
                message: "can't get the data",
                error: error.message,
            });
        }
    };


    exports.getTour = async(req, res, next) => {
        const { id } = req.params
        const tour = await getTourService(id)

        try{
            res.status(200).json({
                status: 'success',
                data: tour
            })

        }catch(error){
            res.status(400).json({
                status: 'fail',
                message: "can't get the data",
                error: error.message
            })
        }
    }

    exports.getTrending = async(req, res, next) => {
        // const { id } = req.params
        const tour = await getTrendingService()

        try{
            res.status(200).json({
                status: 'success',
                data: tour
            })

        }catch(error){
            res.status(400).json({
                status: 'fail',
                message: "can't get the data",
                error: error.message
            })
        }
    }

    exports.getCheapest = async(req, res, next) => {
        const cheapest = await getCheapestService();
        try{

            res.status(200).json({
                status: 'success',
                data: cheapest
            })
        } catch(error){
            res.status(400).json({
                status: 'fail',
                message: "can't get the data",
                error: error.message
            })
        }
    }


    exports.createTour = async(req, res, next) => {
        try{
            console.log(req.body);
            const result = await createTourServices(req.body);
    
            res.status(200).json({
                status: "success",
                message: "Data inserted successfully",
                data: result
            })
        } catch(error){
            res.status(400).json({
                status: "fail",
                message: "Data is not inserted",
                error: error.message
            })
        }
    }
    
    exports.updateTourById = async (req, res, next) => {
        try{

            const { id } = req.params;
            const result = await updateTourByIdService(id, req.body)

            res.status(200).json({
                status: "success",
                message: "Successfully update the data",
                data: result
            })
        } catch(error){
            res.status(400).json({
                status: "fail",
                message: "Could't update the data",
                error: error.message
            })
        }
    }

    exports.bulkUpdateTour = async (req, res, next) => {
        try{

            const result = await bulkUpdateTourService(req.body)

            res.status(200).json({
                status: "success",
                message: "Successfully update the data",
                data: result
            })
        } catch(error){
            res.status(400).json({
                status: "fail",
                message: "Could't update the data",
                error: error.message
            })
        }
    }


    exports.deleteTourById = async (req, res, next) => {
      try {
        const { id } = req.params;
    
        const result = await deleteTourByIdService(id);
    
        if (!result.deletedCount) {
          return res.status(400).json({
            status: "fail",
            error: "Couldn't delete the tour"
          })
        }
    
        res.status(200).json({
          status: "success",
          message: "Successfully deleted the tour",
        });
      } catch (error) {
        res.status(400).json({
          status: "fail",
          message: "Couldn't delete the product",
          error: error.message,
        });
      }
    };
    
    exports.bulkDeleteTour = async (req, res, next) => {
      try {
        const result = await bulkDeleteTourService(req.body.ids);
    
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
    