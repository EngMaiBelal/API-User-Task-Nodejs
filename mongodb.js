//(npm i mongodb)
const mongodb = require("mongodb");

// Inalize Connection

const MongoClient = mongodb.MongoClient;

const connectionUrl = "mongodb://127.0.0.1:27017";

const dbName = "task-manager";

MongoClient.connect(
  connectionUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      return console.log("Error has occurred");
    }
    console.log("Success");

    // Get refrence to our database
    const db = client.db(dbName);
    //to show in robo-3
    // Add documents
    // Insert One document 
    // db.collection('users').insertOne({
    //     name:'Ahmed',
    //     age:27
    // })

    // Insert multiple documents

    // db.collection('users').insertMany([
    //     {name:'Ali',age:27},
    //     {name:'Moahmed',age:27},
    //     {name:'Malek',age:27},
    //     {name:'Salma',age:27},
    //     {name:'Amgd',age:27},
    //     {name:'Mai',age:27},
    //     {name:'Mona',age:27}
    // ])

    //////////////////////////////////////////////////////////////////////////////

    // Insert our own generated id
    const ObjectID = mongodb.ObjectID

    // const _id = new ObjectID()
    // console.log(_id)
    // db.collection('users').insertOne({
    //     _id:_id,
    //     name:'Osama',
    //     age:28
    // })
////////////////////////////////////////////////////////////////////////////
//   db.collection('users').findOne({age:27},(error,users)=>{
//     if(error){
//       return console.log('error occurred')
//     }
//     console.log(users)
//   })
//   db.collection('users').findOne({_id: new ObjectID('5ffd5716a0431b29245958a3')},(error,users)=>{
//     if(error){
//       return console.log('error occurred')
//     }
//     console.log(users)
//   })
//   db.collection('users').find({age:27}).toArray((error,users)=>{
//     if(error){
//       return console.log('error occurred')
//     }
//     console.log(users)
//   })
//   db.collection('users').find({age:27}).count((error,users)=>{
//     if(error){
//       return console.log('error occurred')
//     }
//     console.log(users)
//   })
//   db.collection('users').find({age:27}).limit(2).toArray((error,users)=>{
//     if(error){
//       return console.log('error occurred')
//     }
//     console.log(users)
//   })
// ///////////////////
// // Update
//   db.collection('users').updateOne({_id: new ObjectID('5ffd5716a0431b29245958a3')},
//   {
//       $set : {name:'Amr'},
//     $inc : {age: 5},
//   })
  
//   .then((result)=>{
//     console.log(result.modifiedCount);
//   }).catch((error) => {
//     console.log(error);
//   });



  ////////////
  // db.collection('users').updateOne({_id: new ObjectID('5ffcdaf84d6aa93464b57fd9')},
  // {
  //     $set : {name:'Amr'},
  //   $inc : {age: 5},
  // })
  
  // .then((result)=>{
  //   console.log(result.modifiedCount);
  // }).catch((error) => {
  //   console.log(error);
  // });


  // db.collection('users').updateMany({},
  // {
  //     $set : {name:'mmm'},
  // })
  
  // .then((result)=>{
  //   console.log(result.modifiedCount);
  // }).catch((error) => {
  //   console.log(error);
  // });



  ///////////////


  // db.collection('users').delete({age:32})
  // .then((result)=>{
  //   console.log(result.deletedCount);
  // }).catch((error) => {
  //   console.log(error);
  // });

  db.collection('users').deleteMany({})
  .then((result)=>{
    console.log(result.deletedCount);
  }).catch((error) => {
    console.log(error);
  });



})
