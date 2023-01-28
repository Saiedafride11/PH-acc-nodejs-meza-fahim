// local module
const other = require('./other');

// core module
const http = require('http');
const PORT = 5000;

const url = require('url');
// console.log(url)

const fs = require('fs');
console.log(fs)

const server = http.createServer((req, res) => {
      if(req.url === '/'){
            //*********************************** */
                  //Async way read
            //*********************************** */

            // fs.readFile("data.txt", (err, data) => {
            //       if(err){
            //             res.write("Failed to read data!");
            //             res.end();
            //       }
            //       else{
            //             res.write(data);
            //             res.end();
            //       }
            // })


            //*********************************** */
                  //Sync way read
            //*********************************** */
            // const data = fs.readFileSync("data.txt");
            // res.write(data);
            // res.end();

            //*********************************** */
                  //write
            //*********************************** */
            fs.writeFile("newDataFile.txt", "Hello nodejs", (err) => {
                  if(err){
                        res.write("Data faild to write");
                        res.end();
                  }
                  else{
                        res.write("Data written succesfully");
                        res.end();
                  }
            })

      }
})

server.listen(PORT)
console.log(`Server is running at ${PORT}`)


//contact?name=afride&country=bangladesh
