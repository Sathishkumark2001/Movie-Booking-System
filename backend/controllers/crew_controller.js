const fs = require("fs");
const Crew = require('../Models/crew');

const crew_get = (req, res) => {
    Crew.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('crew', { crew: result });
        }).catch((err) => console.log(err));

}




const crew_post = (req, res) => {
    
    if (req.body._id == null) {
        const crew = new Crew();
        crew.name = req.body.name;
        crew.Image = req.file.filename;
        crew.active = req.body.active;
        crew.save()
            .then((result) => {
                res.redirect('/crew');
            })
            .catch((err) => {
                console.log(err);
            });
    }
    else {
        const crew = {};
        if(req.file.filename != null){
            fs.unlinkSync("public/" + req.body.oldImage);
            crew.Image = req.file.filename;
        }else{
            crew.Image = req.body.oldImage;
        }
        crew.name = req.body.name;
        crew.active = req.body.active;

        Crew.findByIdAndUpdate(req.body._id, crew)
            .then((result) => {
                    res.redirect('/crew');
            })
            .catch((err) => {
                console.log(err);
            })
    }

};
const crew_edit = (req, res) => {
    const id = req.params.id


    Crew.findById(id).then((result) => {
        res.render('crewEdit', {
            crew: result
        });
    }).catch((err) => {
        console.log(err);
    });
}

module.exports = {
    crew_get,
    crew_post,
    crew_edit,
  
}