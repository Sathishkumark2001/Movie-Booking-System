const Movies = require('../Models/Movies');
const Language = require('../Models/Language');
const Genre = require('../Models/genre');
const Cast = require('../Models/cast');
const  Crew = require('../Models/crew');
const Theater = require('../Models/Theater');
const screen = require('../Models/screen');
const moment = require('moment');
const index1 = (req, res) => {
    Movies.find().then((result) => {
        const movies = result;
    Movies.find().sort({ createdAt: -1 }).limit(4).then((result) => {
                        res.render('index1', { Movie: result,Movie1: movies  });
           }).catch((err) => console.log(err));
}).catch((err) => console.log(err));     

 }
 const index2 = (req, res) => {
    const id = req.params.id;
    
    Movies.find().then((result) => {
        const movie = result;
        Movies.findById(id).then((result) => {
            const movie = result;
   Cast.find( {_id: { "$in" : movie.Cast } } ).then((result) => {
        const castt = result;
        Crew.find( {_id: { "$in" : movie.Crew } } ).then((result) => {
            const creww = result;
            res.render('index2', { selectedmovie:movie,cast:castt,crew:creww});    
        }).catch((err) => console.log(err));
        }).catch((err) => console.log(err));
    }).catch((err) => console.log(err));

    }).catch((err) => console.log(err));
    }


 
 const index3 = (req, res) => {
    const id = req.params.id;
     Movies.findById(id).then((result) => {
       const moviee = result;
       var Start_date=  moviee.From;
var End_date=  moviee.To;
var start=moment(Start_date, "ddd Do MMMM")
var end = moment(End_date, "ddd Do MMMM")
const date = new Date();
const days = new Array();
var today = moment(date,"ddd Do MMMM");
while (today <= end){
   var  todaysday = today.format("ddd Do MMMM" )
     today = today.add(1, "days");
    days.push(todaysday)
}
    Theater.find( {Movie: { "$in" : id } } ).then( (result) => {

        const theater = result;
        var screentime=new Array();
        console.log(theater)
        for (let i = 0; i < theater.length; i++) {
            var id = theater[i]._id;
            console.log(id)
            screen.find({theater_id:id}).then((result) => {
                const screens = result;
                screens.forEach((element,index) => {
                 screentime[index]= moment(element.Time_slot1).format("h:m A")

                });

            res.render('index3', {Movie: moviee,Theater: theater,Today:days,Screen:screens,Time:screentime});

                  }).catch((err) => console.log(err));
                }
        // screen.find({theater_id:id}).then((result) => {
        //     const screens = result;
        //     console.log(screens)
        // res.render('index3', {Movie: moviee,Theater: theater,Today:days,Screen:screens});
        //       }).catch((err) => console.log(err));
            }).catch((err) => console.log(err));
        }).catch((err) => console.log(err));
        

}

 const index4 =  (req, res) => {
    const id = req.params.id;
    Theater.findById(id).then((result) => {
        const movies = result;
Movies.find( {_id: { "$in" : movies.Movie } } ).then( (result) => {
    const moviee =  result ;
    console.log(moviee)
    var Start_date=  moviee[0].From;
var End_date=  moviee[0].To;
var start=moment(Start_date, "ddd Do MMMM")
var end = moment(End_date, "ddd Do MMMM")
const date = new Date();
const days = new Array();
var today = moment(date,"ddd Do MMMM");
while (today <= end){
   var  todaysday = today.format("ddd Do MMMM" )
     today = today.add(1, "days");
     days.push(todaysday)
}
var screentime=new Array();
screen.find({theater_id:id}).then((result) => {
    const screens = result;
    screens.forEach((element,index) => {
        screentime[index]= moment(element.Time_slot1).format("h:m A")

       });

res.render('index4', { Movie: moviee,Today:days,Theater:movies,Screen:screens,Time:screentime});    
}).catch((err) => console.log(err));

}).catch((err) => console.log(err));
}).catch((err) => console.log(err));

}

 const index5 = (req, res) => {
    const id = req.params.id;
    const id1 = req.params.id1;

    Theater.findById(id).then((result) => {
        const moviee = result;
Movies.findById(id1).then((result) => {
        const movies = result;
        screen.findById(id).then((result) => {
            const screen = result;
        res.render('index5', { Movie: movies,Theater: moviee });

}).catch((err) => console.log(err));
}).catch((err) => console.log(err));
}).catch((err) => console.log(err));



}

 const index6 = (req, res) => {
    res.render('index6', { title: 'Express' });
}

 const index7 = (req, res) => {
    res.render('index7', { title: 'Express' });
}


module.exports = {
    index1,
    index2,
    index3,
    index4, 
    index5, 
    index6,
    index7
}
