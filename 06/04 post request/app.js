const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//middlewares
app.use(express.json());
app.use(cors());

// schema design
const productSchema = mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please provide a name for this product."],
      trim: true,
      unique: [true, "Name must be unique"], // value + error message
      minLength: [3, "Name must be at least 3 characters."], // value + error message
      maxLength: [100, "Name is too large"], // value + error message
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price can't be negative"], // value + error message
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs"], 
        message: "unit value can't be {VALUE}, must be kg/litre/pcs"
      }
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "quantity cant be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        }
      },
      message: "Quantity must be an integer"
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "status can't be {VALUE}"
      }
    },
    // ------------------------------------------------------------
    // ------------------------------------------------------------
      // nise timestamps: true kora hoise, jar fole createdAt automatic mongoose diye dibe
    // ------------------------------------------------------------
    // ------------------------------------------------------------
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // updatedAt: {
    //   type: Date,
    //   default: Date.now
    // },
    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId, //ObjectId kutai teke asbe
    //   ref: "Supplier" // kutai teke asbe
    // },
    // categories: [{
    //   name: {
    //     type: String,
    //     required: true
    //   },
    //   _id: mongoose.Schema.Types.ObjectId
    // }]
  }, {
    timestamps: true, 
  });
  
  

// Schema > model > query
const Product = mongoose.model('Product', productSchema)


app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

// posting to database

app.post('/api/v1/product', async(req, res, next) => {
  // console.log("post-req--------", req.body);
  // res.send("it working")


  try{
      //create
      // const result = await Product.create(req.body);

      // save
      const product = new Product(req.body);
      if(product.quantity == 0){
        product.status = "out-of-stock"
      }
      const result = await product.save();

    
      res.status(200).json({
        status: "success",
        message: "Data inserted successfully",
        data: result
      })
  }catch(error){
      res.status(400).json({
        status: "fail",
        message: "Data is not inserted",
        error: error.message
      })
  }
})

module.exports = app;




