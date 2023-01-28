// Call back hell code er readability nosto kore dei.
// call back hell ignore korte amra promise use korbo
// promise holo amn akta jinis, ami tuma k future e amn akta data ane dibo, sei data se antew pare, abr reject ow hote pare
// promise er 3 ta state. fulfil, rejected, pending
// multiple asnyc kaj korte Promise.all method use korbo amra


const myPromise = new Promise( (fulfill, reject) => {
      const user = null;
      if (!user) {
            reject("Something went wrong!")
      }
      else{
            setTimeout(() => {
                 fulfill("Successfully got the data!") 
            }, 1000);
      }
})

myPromise
      .then(res => console.log("Found in then", res))
      .catch(err => console.log("Found in catch", err))

// ---------------------------------------
// ---------------------------------------

const myPromise2 = new Promise( (fulfill, reject) => {
      const user = {id: 1};
      if (!user) {
            reject("Something went wrong!")
      }
      else{
            setTimeout(() => {
                 fulfill({name: "Saied Afride"}) 
            }, 1000);
      }
})

const userIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
let userData = [];

for(let i = 0; i < userIds.length; i++){
      const userId = userIds[i];
      // my promise k consume kortesi
      myPromise2.then( user => {
            userData.push(user)
      })
      
}

// console.log("userData", userData)

myPromise2
      .then(res => console.log("Found in then", res))
      .catch(err => console.log("Found in catch", err))
// ---------------------------------------
// ---------------------------------------

const myPromise3 = new Promise( (fulfill, reject) => {
      const user = {id: 1};
      if (!user) {
            reject("Something went wrong!")
      }
      else{
            setTimeout(() => {
                 fulfill({name: "Saied Afride"}) 
            }, 1000);
      }
})

const userIds3 = [1, 2, 3, 4]
let userData3 = [];

for(let i = 0; i < userIds3.length; i++){
      const userId = userIds3[i];
    
      // my promise k consume na kore
      userData3.push(myPromise3)
}

// console.log("userData3", userData3)
Promise.all(userData3).then(res => {
      console.log("Promise.all--", res)
})

myPromise3
      .then(res => console.log("Found in then 2", res))
      .catch(err => console.log("Found in catch 2", err))