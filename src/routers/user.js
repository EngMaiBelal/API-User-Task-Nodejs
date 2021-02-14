const express = require('express')
const router= new express.Router()
const User = require('../models/user') //model
const auth = require('../middleware/auth.js')
const multer = require('multer')


// router.post('/users',(req,res)=>{
//     console.log('req.body')
//     res.send('testing')
// })
////////////////////////////////////

// post

// router.post('/users',(req,res)=>{
//     const user = new User(req.body)
//     user.save().then(()=>{
//         const token = user.generateToken()
//         // to show in post man
//         res.status(200).send({user,token})
//     }).catch((error)=>{
//         res.status(400).send(error)
//     })
// })   -------> error token empty

router.post('/users', async(req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateToken()
        res.status(200).send({user,token})
        console.log(token)
    }
    catch(e){
        res.status(400).send(e)
    }
})






///////////////////////////////

// Get

router.get('/users',(req,res)=>{
    User.find({}).then((user)=>{
        res.status(200).send(user)
    }).catch((error)=>{
        res.status(500).send("internal server error")
    })
})

////////////////////////////

//Get by id

// router.get('/users/:id',(req,res)=>{
//     // console.log(req.params)
//     // res.send('testing')
//     const _id =req.params.id
//     console.log(_id)

//     User.findById(_id).then((user)=>{
//         console.log("kkk;;;")
//        if(!user){
//            console.log("kkk")
//             return res.status(400).send('undefined id')
//        }
//        res.status(200).send(user)
//     }).catch((error)=>{
//         res.status(500).send(error)
//     })
// })

///////////////////
//get
router.get('/users/:id',auth,(req,res)=>{
    console.log(req.params)
    const _id = req.params.id
    User.findById(_id).then((user)=>{
        if(!user){
            return res.status(400).send('unable to send user')
        }
        res.status(200).send(user)
    }).catch((e)=>{
        res.status(500).send('internal server error')
    })

})

////////////

//update

// router.patch('/users/:id' ,async(req,res)=>{
//     const _id=req.params.id
//     try{

//         const user = await User.findByIdAndUpdate(_id,req.body,{
//             new:true,
//             runValidators:true
//         })
//         if(!user){
//             return res.send('no user found')
//         }
//         res.status(200).send(user)
        
//     }catch{
//         res.status(400).send('Error has occured')
//     }
// })


///////////////////////////
// update with some restrictions


// problem in hash
// router.patch('/users/:id', async(req,res)=>{
//     // access key
//     const updates = Object.keys(req.body) //['name','age','password','email']
//     console.log(updates)

//     const allawedupdates = ['name','password']

//     var isValid = updates.every((update)=> allawedupdates.includes(update))
    
//     // console.log(isValid)
//     if(!isValid){
//        return res.status(400).send('cant not update')
//     }
//     const _id=req.params.id
//     try{

//         const user = await User.findByIdAndUpdate(_id,req.body,{
//             new:true,
//             runValidators:true
//         })
//         if(!user){
//             return res.send('no user found')
//         }
//         res.status(200).send(user)
        
//     }catch{
//         res.status(400).send('Error has occured')
//     }

// })






router.patch('/users/:id', async(req,res)=>{
    // access key
    const updates = Object.keys(req.body) //['name','age','password','email']
    console.log(updates)

    const allawedupdates = ['name','password']

    var isValid = updates.every((update)=> allawedupdates.includes(update))
    
    // console.log(isValid)
    if(!isValid){
       return res.status(400).send('cant not update')
    }
    const _id=req.params.id
    try{

        const user = await User.findById(_id)
        console.log(user) //return user كله
        updates.forEach((update)=>user[update]=req.body[update])
        await user.save()


        if(!user){
            return res.send('no user found')
        }
        res.status(200).send(user)
        
    }catch(e){
        res.status(400).send('Error has occured')
    }

})


//////////////////////

//delete

router.delete('/users/:id',auth,(req,res)=>{
    console.log(req.params)
    const _id = req.params.id
    User.findByIdAndDelete(_id).then((user)=>{
        if(!user){
            return res.status(400).send('unable to send user')
        }
        res.status(200).send(user)
    }).catch((e)=>{
        res.status(500).send('internal server error')
    })

})





/////////////////////

// login

 router.post('/users/login',async (req,res)=>{
     try{
        
        const user = await User.findByCredentials(req.body.email,req.body.password)
        // res.send(user)
        
        const token = await user.generateToken() //save token
        res.send({user,token})
        
     }catch(e){
        //  res.status(400).send('Error is occured'+error)
        res.status(400).send('Unable to login')
     }
 })

///////////////////////////////////////////////////

router.get('/profile',auth,(req,res)=>{
    res.send(req.user)
})

////////////////////////////////////////

//logout

// req.user.tokens --> array

router.post('/logout',auth,async(req,res)=>{
    try{

        req.user.tokens = req.user.tokens.filter((el)=>{
            return el.token !== req.token
        })
        await req.user.save()
        res.send('logout success')
    }
    catch(e){
        res.status(500).send('please login')
    }

})
////////////////////////
//logout all

router.post('/logoutAll',auth,async(req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send('logout all success')
    }
    catch(e){
        res.status(500).send('please login')
    }

})
/////////////////////////

// delete profile
router.delete('/profile',auth,async(req,res)=>{
    try{
        await req.user.remove()
        res.send('profile was deleted')

    }catch(e){
        res.send(e)
    }

})
////////////////////

//update

router.patch('/profile', auth, async(req,res)=>{
    try{
    const updates = Object.keys(req.body) //['name','age','password','email']
    console.log(updates)

    updates.forEach((update)=>(req.user[update]=req.body[update]))
        await req.user.save()
        
        res.status(200).send(req.user)
        
    }
    catch(e){
        req.status(400).send(e,'Error has occured')
    }

})

/////////////////////////////////////

//image router
// const multer = require('multer')
///config
const uploads = multer({
    // dest:'images',  //to load in visual
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
router.post('/profile/avatar',auth,uploads.single('avatar'),async(req,res)=>{
    try{

        req.user.avatar = req.file.buffer
        //req.user return user profile
        await req.user.save()
        req.send()
    }catch(e){
        res.send(e)
    }
})










module.exports = router
