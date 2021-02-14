const express = require('express')
const User= require('./models/user.js')
const Task=require('./models/task.js')

const userRouter=require('./routers/user.js')
const taskRouter=require('./routers/task.js')


//to connect db ---> must after app
require('./db/mongoose')

// configure to cors (npm i cors)---->connect (api with angular)
// const cors = require('cors')
// app.use(cors())


const cors = require('cors')
//intialize variable store to our express app
const app = express()

app.use(express.json())
app.use(cors())

app.use((req,res,next)=>{
    console.log("Hello form middleware")
    next()
})
// Register to routers
app.use(userRouter)
app.use(taskRouter)

//declare to port
const port = 3000

//create to instance
// const user = new User({
//     name:'       mo   hamed',
//     // name:'mohamed',
//     age: 2,
//     // email:"FHFHGHGDGGHH.COM"
//     email:"FHFHGHGDGGHH@gmail.COM",
//     password:"2266666"

// });
// const task = new Task({
//     description:'task for mohamed',
//     completed: true,
// });
// user.save().then(()=>{
//     console.log(user);
// }).catch((error) => console.log("Error xxxxx",error));

// task.save().then(()=>{
//     console.log(task);
// }).catch((error) => console.log("Error xxxxx",error));

// app.post('/users',(req,res)=>{
//     res.send("testing")
// })



///////////////
const bcrypt = require('bcryptjs')
const passWordFunction = async()=>{
    const password ='R123456'
    console.log(password)
    const hashedPassword = await bcrypt.hash(password,8)
    console.log(hashedPassword)


    // to compare
    // const compare = await bcrypt.compare("2222222",hashedPassword) // return false
    const compare = await bcrypt.compare(password,hashedPassword)

    console.log(compare)
}
passWordFunction()





/////////////////////////////////////////
// Autharization --> sign up
// Authentication --> login(check user is authorization)
// (token --> automatic create in browser when sign in, sign out
// jsonwebtoken --->(unique body ---> id, "any word")

// const jwt = require('jsonwebtoken')
// const myToken = async()=>{
//     // const token = jwt.sign({_id:'123'},'node-course',{expiresIn:'0 sec'})   --->error

//     const token = jwt.sign({_id:'123'},'node-course',{expiresIn:'7 days'})
//     console.log(token)
    
//     const tokenVerify = jwt.verify(token,'node-course')
//     // const tokenVerify = jwt.verify(token,'node-cour')----->error
//     console.log(tokenVerify)
// }
// myToken()

// // الصلاحيات انا اللي بحددها زي صلاحيات الadmin

//////////////////////////

//Get Whole Profile

const main = async()=>{

    // const task = await Task.findById('60060bb6f9a1f90c70762612')//id task
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)


    // const user = await User.findById('60060810a41e010c9cf0c697')//id user
    // await user.populate('tasks').execPopulate()
    // console.log(user.tasks)
    


}
main()


////////////////////////

// file upload
const multer = require('multer')

const uploads = multer({
    dest:'images',
    limits:{
        fileSize:1000000 //byte
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png|jfif)$/)){
            return cb(new Error('please enter image'))
        }
        cb(undefined,true)
    }
})
app.post('/uploads',uploads.single('uploads'),(req,res)=>{
    try{

        res.send()
    }catch(e){
        res.send(e)
    }
})
app.listen(port,()=> console.log('server is running'))

