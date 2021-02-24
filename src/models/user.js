const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

// with schema
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    age:{
       
        type:Number,
        default:20,
        validate(value){
            if(value<0){
                // must not same (required in age ----> error automatic)
                throw new Error ('Age must be positive number')
            }
            
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is required')
            }
        }
    },
    password:{
        type:String,
        required:true,
        // lowercase:true,
        minlength: 6,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Email is required')
                
            }
        }
    },
    tokens:[{
        token:{

            type: String,
            required: true
        }

    }],
    avatar:{
        type:Buffer
    }
})
///////////////////////////////////////////////////////////////////////////////////////////

// Relation (tasks not save in database)

userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
  
  })
//   userSchema.virtual('courses',{
    //   ref:'Course',
    //   localField:'_id',
    //   foreignField:'ownerofcourse --> Exist in courses model'
    
    // })
    



////////////////////////////////////////////////////////////////////////////////////////////

// Doing pre  or  post
// modelWare

userSchema.pre('save',async function(next){
    const user = this //return object
    console.log(user)
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    //spefcingy that we have finished
    next()

})
/////////////////////////////////////////////////////////////////////////////////

//find by credintalis -->

userSchema.statics.findByCredentials = async(email,password)=>{
    // const user = await User.findOne({email:email})
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Email is incorrect')
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('password is incorrect')

    }
    return user
}
/////////////////////////////////////////////////////////////////////////////////////////////////////
// Authorization --> sign up
// Authentication --> login (Check user is authorized)

// Generate Token ---> jsonwebtoken

const jwt = require('jsonwebtoken')

userSchema.methods.generateToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},'node course' ,{expiresIn:'6 days'})
    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

////////////////////////////////////////////////////////////////////////////////////////////
//Hide private Delete

userSchema.methods.toJSON =function(){
    // Document
    const user =this
    // object
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens

    return userObject


}

////////////////////////////////////////////////////////////////////////////////////////////
//must defination in last

const User = mongoose.model('User',userSchema); 

module.exports = User
