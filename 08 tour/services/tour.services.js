const Tour = require("../models/Tours");

exports.getToursService = async (filters,queries) => {
      // const tour = await Tour.find({});
      const tour = await Tour.find(filters)
                  .skip(queries.skip)
                  .limit(queries.limit)
                  .select(queries.fields)
                  .sort(queries.sortBy)
      return tour;
}

exports.getTourService = async (id) => {
      const tour = await Tour.find({ _id: id});
      // console.log(tour[0].view);

      const viewUpdate = await Tour.updateOne(
            { _id: id},
            // $push, $inc, $set
            // { $set: { view: tour[0].view ? tour[0].view + 1 : 1 }},
            { $inc: { view: tour.view ? tour.view + 1 : 1 }},
            { runValidators: true }
      )
      console.log(viewUpdate)
      return tour;
}

exports.getTrendingService = async () => {
      // top 3 view show on fontend **** .sort({view: -1}).limit(3) ****
      const trending = await Tour.find({}).sort({view: -1}).limit(3);
      return trending;
}

exports.getCheapestService = async () => {
      const cheapest = await Tour.find({}).sort({price: 1}).limit(3);
      return cheapest
}

exports.createTourServices = async (data) => {
      const tour = await Tour.create(data);
      return tour;
}

exports.updateTourByIdService = async (tourId, data) => {
      const result = await Tour.updateOne(
            { _id: tourId },
            // { $set: data },
            // { $inc: data }, // like price barabo/increment korbo
            { runValidators: true}
      )

      // const result = await Tour.findById(tourId);
      // const result = await Tour.set(data).save();
      return result;

}

exports.bulkUpdateTourService = async (data) => {
      // {
      //       "ids": ["640c03d44b23a8fe35e672b6", "640c03d14b23a8fe35e672b4"],
      //       "data": {"price": "$16 / Per Person"}
      //   }
        
      // const result = await Tour.updateMany({ _id: data.ids }, data.data, {
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

      const tours = []
      data.ids.forEach(tour => {
            tours.push( Tour.updateOne( { _id: tour.id }, tour.data))
      })

      const result = await Promise.all(tours)
    
      return result;

}

exports.deleteTourByIdService = async (id) => {
      const result = await Tour.deleteOne({ _id: id });
      return result;
    };
    

    exports.bulkDeleteTourService = async (ids) => {
      const result = await Tour.deleteMany({ _id: ids });
    
      return result;
    };
    
