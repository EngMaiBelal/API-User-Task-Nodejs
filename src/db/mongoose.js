const mongoose= require('mongoose')

// creat connection

mongoose.connect('mongodb://127.0.0.1:27017/test',{
     useNewUrlParser: true, 
     useUnifiedTopology: true,
     useCreateIndex: true,
     useFindAndModify:false,
    });
// const User = mongoose.model('User',{
//     name:{
//         type:String,
//     },
//     age:{
//         type:Number
//     }
// })
// const Task = mongoose.model('Task',{
//     description:{
//         type:String,
//     },
//     completed:{
//         type:Boolean
//     }
// })

//instance
// const user = new User({
//     name:'mohamed',
//     age: 23,
// });
// const task = new Task({
//     description:'task for mohamed',
//     completed: true,
// });
// user.save().then(()=>{
//     console.log(user);
// }).catch((error) => console.log('error'));

// task.save().then(()=>{
//     console.log(task);
// }).catch((error) => console.log('error'));

