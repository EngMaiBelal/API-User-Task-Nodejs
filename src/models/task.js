const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    description:{
        type:String,
        required:true,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    owner:{
        // id for user
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'//to show all data for user by owner(relation)
    }
},{
    timestamps:true
})

const Task =mongoose.model('Task',taskSchema)

module.exports = Task