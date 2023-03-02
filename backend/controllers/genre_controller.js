const Genre = require('../Models/genre');


const genre_get = (req, res) => {
    Genre.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('genre', { genre: result });
        }).catch((err) => console.log(err));

}
const genre_post = (req, res) => {
    const genre = new Genre(req.body);

    if (req.body._id == null) {

        genre.save()
            .then((result) => {
                res.redirect('/Home');
            })
            .catch((err) => {
                console.log(err);
            });
    }
    else {
        Genre.findByIdAndUpdate(req.body._id, req.body)
            .then((result) => {

                res.redirect('/Home');
            })
            .catch((err) => {
                console.log(err);
            })
    }
}
const genre_edit = (req, res) => {
    const id = req.params.id


    Genre.findById(id, req.body).then((result) => {
        res.render('genreEdit', {
            genres: result
        });
    }).catch((err) => {
        console.log(err);
    })
}

module.exports = {
    genre_get,
    genre_post,
    genre_edit,
}