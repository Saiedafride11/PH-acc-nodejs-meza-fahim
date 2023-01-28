const myPromise = new Promise( (fulfill, reject) => {
      setTimeout(() => {
            fulfill("Success!")
      }, 1000);
})


const getData = async () => {
      const res = await myPromise;
      console.log(res);
}
getData();


// fetch("link........")
//       .then(res => res.json())
//       .then(data => console.log(data));
//       .catch(err => console.log(err));



// async function getUser(){
//       const res = await fetch("link........");
//       const user = await res.json();

//       const res2 = await fetch(`www.example.com/${user.id}`);
//       const product = await res2.json();
//       console.log(product);
// }