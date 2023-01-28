// const importExportData = require('./ImportExport.js');
const { importExportData, two } = require('./ImportExport.js');

console.log("importExportData", importExportData, two)

async function getData(){
      try{
            undefined.find();
      }catch (error){
           errorHandler(error);
      }
}

getData();

function errorHandler(error){
      const {name, message, stack} = error;
      // console.log(name);
      // console.log(message);
      // console.log(stack);

      // logger.error({
      //       name,
      //       message,
      //       stack,
      //       // route: req.route,
      // })
      console.log("Internal Server error")
}

//---------------------------------------------------------------------------
//---------------------------------------------------------------------------

async function getData2(){
      try{
            // undefined.find();

            const emailError = new Error("Email already exist!");
            throw emailError;
      }catch (error){
           errorHandler2(error);
      }
}

getData2();

function errorHandler2(error){
      const {name, message, stack} = error;
      console.log(name);
      console.log(message);
      console.log(stack);

      // logger.error({
      //       name,
      //       message,
      //       stack,
      //       // route: req.route,
      // })
      // console.log("Internal Server error")
}

// console.log("Done!")