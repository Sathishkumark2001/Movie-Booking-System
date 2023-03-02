const Movies = require('../Models/Movies');
const Language = require('../Models/Language');
const Genre = require('../Models/genre');
const Cast = require('../Models/cast');
const  Crew = require('../Models/crew');
const fs = require("fs");
const path = require("path");


const movies_get = (req, res) => {
    Movies.find().sort({ createdAt: -1 }).then((result) => {
        const movie = result;
        Cast.find().sort({ createdAt: -1 }).then((result) => {
            const cast = result;
Crew.find().sort({ createdAt: -1 }).then((result) => {
                const crew = result;
        Language.find().sort({ createdAt: -1 }).then((result) => {
            const lang = result
            Genre.find().sort({ createdAt: -1 }).then((result) => {
                    res.render('Movies', { Movie: movie, language: lang, genre: result, Cast: cast, Crew: crew });
                }).catch((err) => console.log(err));

        }).catch((err) => console.log(err));

    }).catch((err) => console.log(err));
}).catch((err) => console.log(err));

}).catch((err) => console.log(err));
}
const movies_post = (req, res) => {
    
    if (req.body._id == null) {
        const movies = new Movies();
        movies.Movie_name = req.body.Movie_name;
        movies.genre = req.body.genre;
        movies.Language = req.body.Language;
        movies.active = req.body.active;
        movies.release_date = req.body.release_date;
        movies.duration = req.body.duration;
        movies.description = req.body.description;
        movies.certification = req.body.certification;
        movies.Cast = req.body.Cast;
        movies.Crew = req.body.Crew;
        movies.From = req.body.From;
        movies.To = req.body.To;
        movies.myImage =req.files.myImage[0].filename;
        movies.backImage = req.files.backImage[0].filename;
   
        movies.save()
            .then((result) => {
                res.redirect('/Movies');
            })
            .catch((err) => {
                console.log(err);
            });
    }
    else {
        const movies = {};
        if(req.file.filename != null){
            fs.unlinkSync("public/" + req.body.oldImage);
            movies.myImage = req.file.filename;
        }else{
            movies.myImage = req.body.oldImage;
        }
        movies.Movie_name = req.body.Movie_name;
        movies.genre = req.body.genre;
        movies.Language = req.body.Language;
        movies.active = req.body.active;

        Movies.findByIdAndUpdate(req.body._id, movies)
            .then((result) => {
                    res.redirect('/Movies');
            })
            .catch((err) => {
                console.log(err);
            })
    }

};
const movies_edit = (req, res) => {
    const id = req.params.id

    Language.find().sort({ createdAt: -1 })
        .then((result) => {
            const language = result
            Genre.find().sort({ createdAt: -1 })
                .then((result) => {
                    const genre = result
                    Movies.findById(id, req.body,req.file).then((result) => {
                        res.render('MovieEdit', {
                            Movies: result, Genre: genre, Language: language
                        });
                    }).catch((err) => {
                        console.log(err);
                    })
                }).catch((err) => console.log(err));
        }).catch((err) => console.log(err));
}


module.exports = {
    movies_get,
    movies_post,
    movies_edit,
  
}