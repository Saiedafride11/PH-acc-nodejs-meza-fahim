const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const valid = require("validator");

// schema design
const tourSchema = mongoose.Schema({
  title: {
      type: String,
      required: [true, "Please provide a name for this product."],
      trim: true,
      unique: [true, "Name must be unique"],
      lowercase: true,
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [100, "Name is too large"],
    },
    price: {
      type: Number,
      required: [true, "Please provide a price this tour."],
    },
    ratting: {
      type: String,
      required: [true, "Please provide a rating this tour."],
    },
    day: {
      type: String,
      required: [true, "Please provide a day this tour."],
    },
    view: {
      type: Number
    },
    person: {
      type: String,
      required: [true, "Please provide a person this tour."],
    },
    location: {
      type: String,
      required: [true, "Please provide a location this tour."],
    },
    img: {
      type: String,
      required: [true, "Please provide a day this tour."],
    }
    
  }, {
    timestamps: true,
  })
  

  //  productSchema.pre('save',function(next){
  
  //   //this -> 
  //    console.log(' Before saving data');
  //      if (this.quantity == 0) {
  //       this.status = 'out-of-stock'
  //     }
  
  //    next()
  //  })
  
  
  const Tour = mongoose.model('Tours', tourSchema)

  module.exports = Tour;