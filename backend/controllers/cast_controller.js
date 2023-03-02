const fs = require("fs");
const Cast = require('../Models/cast');

const cast_get = (req, res) => {
    Cast.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('cast', { cast: result });
        }).catch((err) => console.log(err));

}




const cast_post = (req, res) => {
    if (req.body._id == null) {
        const cast = new Cast();
        cast.name = req.body.name;
        cast.Image = req.file.filename;
        cast.active = req.body.active;
        cast.save()
            .then((result) => {
                res.redirect('/cast');
            })
            .catch((err) => {
                console.log(err);
            });
    }
    else {
        const cast = {};
        if(req.file.filename != null){
            fs.unlinkSync("public/" + req.body.oldImage);
            cast.Image = req.file.filename;
        }else{
            cast.Image = req.body.oldImage;
        }
        cast.name = req.body.name;
        cast.active = req.body.active;

        Cast.findByIdAndUpdate(req.body._id, cast)
            .then((result) => {
                    res.redirect('/cast');
            })
            .catch((err) => {
                console.log(err);
            })
    }

};
const cast_edit = (req, res) => {
    const id = req.params.id


    Cast.findById(id).then((result) => {
        res.render('castEdit', {
            cast: result
        });
    }).catch((err) => {
        console.log(err);
    });
}

module.exports = {
    cast_get,
    cast_post,
    cast_edit,
  
}