

console.log("Welcome to Acc");

// Asynchronous, after 2s loaded 
setTimeout(() => {
      console.log("I am exited to learn");
}, 2000);

//Call back hell (so coming promise)
setTimeout(() => {
      const user = { id : 1}

      setTimeout(() => {
           const products = [{}, {}, {}] 

           setTimeout(() => {
                  const price = []
           }, 1000);
      }, 1000);
}, 1000);

console.log("Hope you are exited to learn");