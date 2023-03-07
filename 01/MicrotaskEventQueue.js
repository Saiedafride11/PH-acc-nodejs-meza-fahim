// setTimeout(() => console.log('timeout'));

// Promise.resolve()
//       .then(() => console.log("promise"))

// console.log("code")

// code > promise > timeout
// code synchronous code তাই এই পার্ট আগে আসবে, আর promise and timeout asynchronous code,
// এখানে promise আগে আসবে এর পরে timeout আসবে। কারন হলো Event Loop,
// ইভেন্ট লুপ callback queue থেকে micro task queue কে বেশি প্রোয়োরিটি দেয়।
// Web API(Browser Runtime)/C++ API(Node Runtime) asynchronous code গুলোকে প্রসেস করে ,
// যদি code টা promise না হয় তাহলে সেটা callback queue অপেক্ষা করে,
// আর যদি সেটা promise হয় তাহলে সেটা microtask queue তে অপেক্ষা করে।
//  ইভেন্ট লুপের কাজ যখন শুরু হয় তখন সে microtask queue কে বেশি প্রোয়োরিটি দেয়।
//   এজন্য execution context promise আগে যাবে। এর পরে callback queue.



// এখানে setTimeout() আর Promise() হলো Asynchronous, আর শুধু console.log("code") হলো Synchronous.
// তাই চোখ বুঝে বলা যেতে পারে আগে Synchronous কোডটা রান হবে, পরে Asynchronous রান হবে।
//  তাই প্রথমে console.log(); এক্সিকিউট হবে।
// কোন Promise যখন, resolved বা rejected হয় তখন then বা catch কলব্যাক microtask queue তে যায়,
//  অপরদিকে setTimeout() যায় event queue তে।
// microtask queue কিন্তু event queue থেকে বেশি প্রাধান্য পায়, সহজে বললে আগে
//  microtask queue এর সবকিছু এক্সিকিউট হবে এবং তারপর event queue এর কাজ শুরু হবে। 
//  সেক্ষেত্রে Promise এর then() microtask queue তে থাকায় এটার কাজ আগে শেষ হবে এবং
//   পরে event queue তে থাকা setTimeout() এর কাজ হবে।
// তাই বলা যায়,
// প্রথমঃ
// console.log("code");
// দ্বিতীয়ঃ
// Promise.resolve()
// .then(()=>console.log("promise"))
// সবার শেষেঃ
// setTimeout(()=>console.log("TimeOut"))
//----------------------------------------------

console.log(1);
setTimeout(() => console.log(2));
Promise.resolve().then(() => console.log(3));
Promise.resolve().then(() => setTimeout(() => console.log(4)))
Promise.resolve().then(() => console.log(5));
setTimeout(() => console.log(6));
console.log(7)