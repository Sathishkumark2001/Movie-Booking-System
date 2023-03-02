const Language = require('../Models/Language');


const Language_get = (req, res) => {
    const language = new Language(req.body);
    Language.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('Language', { language: result });
        }).catch((err) => console.log(err));
}
   
const Language_post = (req, res) => {
    const language = new Language(req.body);

    if (req.body._id == null) {

        language.save()
            .then((result) => {
                res.redirect('/Home');
            })
            .catch((err) => {
                console.log(err);
            });
    }
    else {
        Language.findByIdAndUpdate(req.body._id, req.body)
            .then((result) => {

                res.redirect('/Home');
            })
            .catch((err) => {
                console.log(err);
            })
    }
}
const Language_edit = (req, res) => {
    const id = req.params.id


    Language.findById(id, req.body).then((result) => {
        res.render('LanguageEdit', {
            languages: result
        });
    }).catch((err) => {
        console.log(err);
    })


}


module.exports = {
    Language_get,
    Language_post,
    Language_edit,
   
}