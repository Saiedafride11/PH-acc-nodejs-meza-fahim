// ------------------------------------------------------------
// -------------------------------------------------------------
// mongodb atlas
// --------------------------------------------------------------
// https://www.mongodb.com/try/download/community
// https://www.mongodb.com/try/download/shell

// show db
// use tools

db.test.countDocuments()
db.test.createIndex({age: 1}) // j jinis diye besi besi query kori, seta mongodb k bolsi query kore daw. tahole load hobe kub taratari
db.test.getIndexes() // koita index ase dekte

db.users.insertOne({ name: "saied", age: 12})
db.users.insertMany({})
db.users.find()
db.users.find().count() // total count data
db.users.find().limit(1) // 1 ta kore page daw
db.users.find().skip(1).limit(1) // 1 page skip kore, porer 1 ta page ta daw
db.user.find().sort( { age: -1}) // chuto teke boro
db.user.find().sort( { age: 1}) // boro teke chuto
db.user.find().sort( { age: 1, name: 1}) // jodi same hoye jai age, tahole name diye sort korbe
db.users.find().projection({name: 1}) // shudu name guliy chaile
db.users.find().projection({name: 1, _id: 0}) // id bad, just name daw
db.users.find().projection({password: 0}) // password bad, baki sob kisu daw
db.users.find({_id: ObjectId("63d7579d708ddf4541847071")}) // shudu oi id ta daw
db.users.find({ skils: ["js", "c++"]}) // //array filter
db.users.find({ "address.city": "dhaka"}) // object filter // address: {city: "dhaka"}
db.users.find({ age: {$gt: 22}}) // 22 er cheye besi jader age, tader daw
db.users.find({ age: {$gte: 22}}) // 22 er cheye soman and besi jader age, tader daw
db.users.find({ age: {$lt: 22}}) // 22 er cheye kom jader age, tader daw
db.users.find({ age: {$lte: 22}}) // 22 er cheye soman and kom jader age, tader daw
db.users.find({ age: {$eq: 22}}) // 22 er cheye soman jader age, tader daw
db.users.find({ age: {$ne: 22}}) // 22 er cheye soman na jader age, tader daw
db.users.find({ name: {$in: ["kamal", "jamal"]}}) // jar name kamal or jamal ta k daw
db.users.find({ name: {$nin: ["kamal", "jamal"]}}) // jar name kamal or jamal ta k chara daw
db.users.find({ $and: [{name: "kamal"}, {age: 22}]}) // jar name and age milbe, ta k daw
db.users.find({ $or: [{name: "kamal"}, {age: 22}]}) // jar name or age milbe, ta k daw
db.users.find({ age: {$not: {$gt: 22}}}) // // age 22 er cheye besi na hole daw
db.users.find({ $and: [ {name: "kamal"}, { age: { $gte: 22, $lt: 30 }}]}) // multiple condition 
db.users.find({ age: { $exists: true}}) // jader age ase shudu ta k daw
db.users.find({ address: { $type: "object"}}) // jader type object, shudu ta k daw
db.users.find({ name: {$regex: /sa/i}}) // regex
db.users.find({ $expr: {$gt: ["$budget", "$spent"]}}) // budget teke koros besi j gulu se guli daw
// -----------------------
// -----------------------
// -----------------------
db.users.updateOne({name: "saied"}, { $set: {age: 23}}) // jar name saied, tar sate age add kore daw
db.users.updateMany({age: {$gt: 20}}, {$inc: {age: 2}}) //  jader age 20 er besi, tader sate age 2 increment kore daw
db.users.updateMany({age: {$gt: 20}}, {$inc: {age: -2}}) //  jader age 20 er besi, tader sate age 2 drecement kore daw
db.users.updateMany({age: {$gt: 20}}, {$mul: {age: 2}}) //  jader age 20 er besi, tader sate age 2 multipication kore daw (2 gun kore daw)
db.users.updateOne({name: "saied"}, {$rename: {age: "base"}}) // kunu datar keys name change korte chaille, rename use korbo
db.users.updateMany({skills: {$exists: true}}, {$set: { "skills.1": "JS"}}) // jodi skills name e kunu array ta k, tahole tar 1 number index er data k update kore daw
db.users.updateMany({skills: {$exists: true}}, {$push: { "skills": "Python"}}) // jodi skills name e kunu array ta k, tahole tar akane new data push kore daw
db.users.updateMany({skills: {$exists: true}}, {$push: { "skills": {$each: ["React", "Angular"]}}}) // jodi skills name e kunu array ta k, tahole tar akane multiple data push korte each use korbo
db.users.updateMany({skills: {$exists: true}}, {$pull: { "skills": "React"}}) // jodi skills name e kunu array ta k, tahole tar akane kunu kisu bad dite chaile, pull use korbo
db.users.updateMany({skills: {$exists: true}}, {$pullAll: { "skills": "React"}}) // jodi skills name e kunu array ta k, tahole tar akane kunu kisu Multiple jinis bad dite chaile, pullAll use korbo
db.users.updateMany({address: {$exists: true}}, {$set: { "address.city": "Khulna"}}) // kunu object k update korte chaile
db.users.updateOne({name: "Saied"}, {$unset: {age: ""}}) // kunu kisu bad dite chail unset
// ----------------------
// ----------------------
// ---------------------
db.users.deleteOne({name: "Saied"}) // delete korte chaile
db.users.deleteMany({address: {$exists: true}}) // jegulu just exist kore, segulu delete kore daw
