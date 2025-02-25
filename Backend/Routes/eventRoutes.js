const express=require('express')

const router=express.Router()

const multer=require('multer')

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,'./uploads')
    },
    filename:function(req,file,cb){
       
        return cb(null,`${req.id}.png`)
    }
})

const upload=multer({storage:storage})

const eventController=require('../Controller/eventController')

const userController=require('../Controller/userController')

const authController=require('../Controller/authController')


//router.route('/createEvent/:id').get(eventController.getCreateEvent).post(eventController.createEvent)

router.route('/createEvent').get(eventController.getCreateEvent).post(eventController.createEvent)

router.route('/home').get(eventController.getAllEvents)

router.route('/home/:id').get(eventController.getAllEvents)

router.route('/profile').get(authController.protect,userController.getProfile)

router.route('/profileUpdate/:id').get(authController.protect,userController.getUpdateProfile).patch(userController.updateProfile).post(userController.makeChanges,upload.single("image"),userController.updateProfilePicture)

router.route('/signUp').post(authController.signUp)

router.route('/login').post(authController.login)

router.route('/logout').get(authController.logOut)

router.route('/getEventDetails').patch(eventController.eventDetails).get(eventController.getEventDetails)

router.route('/getUser').get(userController.getUserDetails)

router.route('/joinEvent').patch(eventController.join)

router.route('/alreadyExits').patch(eventController.alreadyJoined)

router.route('/myEvents').get(authController.protect,eventController.myEvents)

module.exports=router