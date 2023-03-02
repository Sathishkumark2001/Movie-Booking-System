const { Router } = require('express');
const authController = require('../controllers/Auth_controllers');
const theaterController = require('../controllers/Theater_controller');
const movieController = require('../controllers/Movies_controller');
const genreController = require('../controllers/genre_controller');
const languageController = require('../controllers/Language_controller');
const castController = require('../controllers/cast_controller');
const crewController = require('../controllers/crew_controller');
const indexController = require('../controllers/indexcontroller');

const multer = require('multer');
const fs = require("fs");
const path = require("path");
const formidable = require('formidable');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');
const router = Router();
var controller_dir = path.resolve("./controllers");

// build your resource routing urls
// var routing = require('resource-routing');
// routing.resources(router, controller_dir, "Theater");
// routing.resources(router, controller_dir, "Movies");
// routing.resources(router, controller_dir, "genre");
// routing.resources(router, controller_dir, "Language");



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public");
    },
    filename:(req,file,cb)=>{
       
            cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
    
     
    }
  
});
const upload = multer({ storage: storage });
const multipleUpload = upload.fields([{ name: 'myImage', maxCount: 1 }, { name: 'backImage', maxCount: 1 }]);



router.get('*', checkUser)
router.get('/signup', authController.signup_get);
router.get('/Home', requireAuth, authController.home);


router.get('/theater',requireAuth,  theaterController.theater_get);
router.post('/theater', theaterController.theater_post);
router.get('/theaterEdit/:id', theaterController.theater_edit);
router.get('/theaterScreen/:id', theaterController.theater_screen);
router.post('/theaterScreen/:id', theaterController.theater_screen_post);
router.get('/theaterScreen/menu1/:id', theaterController.theater_screen_menu);
router.get('/theaterScreen/seats/:id', theaterController.theater_screen_seats);
router.post('/theaterScreen/seats/:id', theaterController.theater_screen_seats_post);
router.get('/theaterScreen/seats/menu1/:id', theaterController.theater_screen_seats_menu);
router.get('/theaterScreen/seats/edit/:id', theaterController.theater_screen_seats_edit);
router.get('/theaterScreen/slot/:id', theaterController.theater_screen_slots);
router.post('/theaterScreen/slot/:id',theaterController.theater_screen_slots_post);
router.get('/theaterScreen/slot/menu1/:id', theaterController.theater_screen_slots_menu);
router.get('/theaterScreen/slot/edit/:id', theaterController.theater_screen_slots_edit);







router.get('/Movies',requireAuth, movieController.movies_get);
router.post('/Movies',multipleUpload,movieController.movies_post);
router.get('/Movies/:id', upload.single('myImage'), movieController.movies_edit);


router.get('/genre',requireAuth, genreController.genre_get);
router.post('/genre',genreController.genre_post);
router.get('/genre/:id',genreController.genre_edit);


router.get('/Language', requireAuth, languageController.Language_get);
router.post('/Language', languageController.Language_post);
router.get('/Language/:id', languageController.Language_edit);



router.post('/signup', authController.signup_post);
router.get('/', authController.login_get);
router.post('/', authController.login_post);
router.get('/logout', authController.logout_get);

router.get('/cast',requireAuth, castController.cast_get);
router.post('/cast',upload.single('Image'), castController.cast_post);
router.get('/cast/:id', upload.single('Image'),castController.cast_edit);


router.get('/crew',requireAuth, crewController.crew_get);
router.post('/crew',upload.single('Image'), crewController.crew_post);
router.get('/crew/:id',upload.single('Image'), crewController.crew_edit);


router.get('/index1',requireAuth,indexController.index1);
router.get('/index2/:id',requireAuth,indexController.index2); 
router.get('/index2/index3/:id',requireAuth,indexController.index3);
router.get('/index2/index3/index4/:id',requireAuth,indexController.index4);
router.get('/index2/index3/seat/:id1/:id',requireAuth,indexController.index5);
router.get('/index6',requireAuth,indexController.index6);
router.get('/index7',requireAuth,indexController.index7);

module.exports = router;