const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");

//middlewares
app.use(express.json());
app.use(cors());

// server
const port = process.env.PORT || 5000;


// database connection
mongoose.connect(process.env.DATABASE_LOCAL).then(()=>{
  console.log(`Database connection is successful 🛢` .red.bold);
})


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

  


// mongoose middleware for saving data: pre / post
productSchema.pre("save", function(next){
  // console.log("Before saving data");

  // this
  if(this.quantity == 0){
    this.status = "out-of-stock"
  }

  next();
})

productSchema.post("save", function(doc, next){
  // console.log("After saving data");

  next();
})

productSchema.methods.logger = function(){
  console.log(`Data saved for ${this.name}`)
}

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

      result.logger();

    
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

app.get('/api/v1/product', async (req, res, next) => {
  try {
      // const product = await Product.find({});
      // const products = await Product.find({ _id: "63dccbb6ff7f1140ac6d879e", name: "Chal"}); //mongoose e ObjectId like dite hoi na
      // const products = await Product.find({ $or: [{ _id: "63dccbb6ff7f1140ac6d879e"}, { name: "erwerwerewrwe"}]}); //mongoose e ObjectId like dite hoi na
      // const products = await Product.find({ status: { $ne : "out-of-stock"}}); // ne = not equal
      // const products = await Product.find({ quantity: { $gt : 100}}); // gt = getter then, gte = getter than or equal
      // const products = await Product.find({ name: { $in : ["Chal", "Dhal"]}}); // shudu jar name chal and  jar name dhal, tak shudu daw
      // const products = await Product.find({}, "name quantity"); // sob gulu data teke shudu name r quantity daw
      // const products = await Product.find({}, "-name -quantity"); // sob gulu data teke shudu name r quantity diye, baki sob guli data daw
      // const products = await Product.find({}).limit(1); // sob gulu data teke just 1 ta data daw ama k
      // const products = await Product.find({}).sort({quantity: -1}); // desnding vabe quantityr data guli daw
      // const products = await Product.find({}).select({ name: 1}); // shudu name chaile amra

      // const products = await Product.where("name").equals("Chal").where("quantity").gt(100) // where k mongoose er chain bole.. name and quantity 100 besi
      // const products = await Product.where("name").equals(/\w/).where("quantity").gt(100).limit(2) 
      
      // const products = await Product
      //   .where("name").equals(/\w/)
      //   .where("quantity").gt(100).lt(600)
      //   .limit(2).sort({ quantity: -1})

      const products = await Product.findById("63dccbb6ff7f1140ac6d879e")
 
      res.status(200).json({
        status: "success",
        message: "Data loaded successfully",
        data: products
      })
  }catch(error) {
    res.status(400).json({
      status: "fail",
      message: "Can't get the data",
      error: error.message
    })
  }
})

app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});





