const express = require('express')
const routerTask= new express.Router()
const Task = require('../models/task')

const auth=require('../middleware/auth.js')


////////////////////////////////////////////////////////////////////////////////////////////////////

//to add owner

routerTask.post('/tasks',auth,async (req,res)=>{
    const task = new Task({
        // spread operator -->     
        ...req.body,
        owner:req.user._id
    })
    
    try{

        await task.save()
        res.status(200).send(task)
    
    }catch(error){
        res.status(400).send(error)
    }
})

//////////////////////////////////////////////////////////////////////////////////////////////
// get by id

routerTask.get('/tasks/:id',auth,async (req,res)=>{
    const _id = req.params.id
    try{

        // const task = await Task.findById(_id)
        const task = await Task.findOne({_id,owner:req.user._id})
       
            if(!task){
                return res.status(400).send('unable to send user')
            }
            res.send(task)
    
    }catch(e){
        res.status(500).send('internal server error')
    }

})


//////////////////////////////////////////////////////////////////////////////////////////
// edit by id

routerTask.patch('/tasks/:id', auth,async(req,res)=>{
    const _id = req.params.id
    const updates = Object.keys(req.body)
    try{
        // const task = await Task.findById(req.params.id)
        const task = await Task.findOne({_id, owner:req.user._id})
        if(!task){
            return res.status(404).send()
        }
        updates.forEach((update)=>task[update]=req.body[update])
        await task.save()
        res.send(task)
    }
    catch(e){
        res.status(400).send(e)
    }
})

///////////////////////////////////////////////////////////////////////////////////
// delete 

routerTask.delete('/tasks/:id',auth,async(req,res)=>{
    const _id=req.params.id
    
    try{
        // const task = await Task.findOne({_id,owner:req.user._id})

        // const task = await Task.findOneAndDelete({...req.params.id,owner:req.user._id})
        const task = await Task.findOneAndDelete({_id,owner:req.user._id})

        if(!task){
            return res.send('no task found')
        }
      


        res.status(200).send(task)
    }
    catch(e){
        res.status(500).send(e)

    }
})
//////////////////////////////////////////////////////////////////////////////////////////////////////
// match & sort

routerTask.get('/tasks',auth,async(req,res)=>{
try{
    // match
    const match = {}
    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }
    // sort by dynamic
    const sort = {}
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] ==='desc' ? -1 : 1
    }
    await req.user.populate({
        path:'tasks',
        match,
        options:{
            limit:parseInt(req.query.limit),
            skip:parseInt(req.query.skip),
            sort:sort
        }
    })
    .execPopulate()
    res.send(req.user.tasks)
}catch(e){
    res.status(500).send(e)
}
})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = routerTask
