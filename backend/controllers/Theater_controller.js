const Theater = require('../Models/Theater');
const Movie = require('../Models/Movies');
const Screen = require('../Models/screen');
const Seat = require('../Models/seat');
const Slot = require('../Models/slot');



const theater_get = (req, res) => {
    Theater.find().sort({ createdAt: -1 })
        .then((result) => {
            const theater = result;
            Movie.find().sort({ createdAt: -1 })
                .then((result) => {
                    const movie = result;
            res.render('theater', { theater: theater, movie: movie });
        }).catch((err) => console.log(err));
    }).catch((err) => console.log(err));


}

const theater_post = (req, res) => {
    const theater = new Theater(req.body);
    let text = req.body.time;
const myArray = text.split(",");
    theater.time = myArray;

    if (req.body._id == null) {

        theater.save()
            .then((result) => {
                res.redirect('/Home');
            })
            .catch((err) => {
                console.log(err);
            });
    }
    else {

 Theater.findByIdAndUpdate(req.body._id, req.body)
            .then((result) => {

                res.redirect('/Home');
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

const theater_edit = (req, res) => {
    const id = req.params.id


    Theater.findById(id).then((result) => {
        res.render('theaterEdit', {
            theater: result
        });
    }).catch((err) => {
        console.log(err);
    })
}
const theater_screen= (req, res) => {
    const id = req.params.id
    Theater.findById(id).then((result) => {
        const theater = result;
        Movie.find().sort({ createdAt: -1 })
            .then((result) => {
                const movie = result;

        res.render('screen', {
            theater: theater, movie: movie

        });
    }).catch((err) => {
        console.log(err);
    }).catch((err) => {
        console.log(err);
    } )
    })
   
}
const theater_screen_post= (req, res) => {
    const screen = new Screen(req.body);
    screen.save()
    .then((result) => {
        res.redirect('/Home');
    })
    .catch((err) => {
        console.log(err);
    });
}
const theater_screen_menu= (req, res) => {
    const id = req.params.id
    Theater.findById(id).then((result) => {
        const theater = result;
            Screen.find({theater_id:id}).then((result) => { 
        res.render('screenMenu', {
            theater: theater,
            screen: result
        });
    }).catch((err) => {
        console.log(err);
    })
    }).catch((err) => {
        console.log(err);
    }
    )
}
const theater_screen_seats= (req, res) => {
    const id = req.params.id
    Screen.findById(id).then((result) => {
        const theater = result;
        res.render('seats', {
            theater: theater,
        });
    }).catch((err) => {
        console.log(err);
    })  
  
}
const theater_screen_seats_post= (req, res) => {
    const seat = new Seat(req.body);
    
    if (req.body._id == null) {

        seat.save()
            .then((result) => {

                res.redirect('/Home');
            })
            .catch((err) => {
                console.log(err);
            });
    }
    else {
            Seat.findByIdAndUpdate(req.body._id, req.body)
            .then((result) => {
                    
                    res.redirect('/Home');
                }
            )
            .catch((err) => {
                console.log(err);
            }
            )


}
}
const theater_screen_seats_menu= (req, res) => {
    const id = req.params.id
    Screen.findById(id).then((result) => {
        const theater = result;
            Seat.find({screen_id:id}).sort({ createdAt: -1 })
                .then((result) => {
        res.render('seatsMenu', {
            theater: theater,
            seats: result
        });
    }).catch((err) => {
        console.log(err);
    })
    }).catch((err) => {
        console.log(err);
    }
    )
}
const theater_screen_seats_edit= (req, res) => {
    const id = req.params.id
            Seat.findById(id).sort({ createdAt: -1 })
                .then((result) => {
                    const seat = result;
        res.render('seatsEdit', {
            seats: seat
        });
    }).catch((err) => {
        console.log(err);
    })
    
}

const theater_screen_slots= (req, res) => {
    const id = req.params.id
    Screen.findById(id).then((result) => {
        const screen = result;
              Movie.find().sort({ createdAt: -1 })
                .then((result) => {
                    const movie = result;

        res.render('slots', {
            screen: screen,
            movie: movie
            
        });
    }).catch((err) => {
        console.log(err);
    }).catch((err) => {
        console.log(err);
    }
    )
    })
   
  
}
const theater_screen_slots_post= (req, res) => {
    const screen_id =req.body.screen_id;
    Screen.findById(screen_id).then((result) => {
        const screen = result;
        Slot.find({screen_id:screen_id}).then((result) => {
       console.log(result);
    });
}).catch((err) => {
    console.log(err);
}).catch((err) => {
    console.log(err);
})

const slot = new Slot(req.body);
    if (req.body._id == null) {
    slot.save()
    .then((result) => {
        res.redirect('/Home');
    })
    .catch((err) => {
        console.log(err);
    });
}
else {
    Slot.findByIdAndUpdate(req.body._id, req.body)
    .then((result) => {
            res.redirect('/Home');
        }
    )
    .catch((err) => {
        console.log(err);
    }
    )


}

}

const theater_screen_slots_menu= (req, res) => {
    const id = req.params.id
    Screen.findById(id).then((result) => {
        const screen = result;
        Slot.find({screen_id:id}).then((result) => {
const slot = result;
        res.render('slotMenu', {
            screen: screen,
            slot: slot
        });
    }).catch((err) => {
        console.log(err);
    }).catch((err) => {
        console.log(err);
    })
})

}
const theater_screen_slots_edit= (req, res) => {
    const id = req.params.id
            Slot.findById(id).sort({ createdAt: -1 })
                .then((result) => {
                    const slot = result;
                    Movie.find().sort({ createdAt: -1 })
                    .then((result) => {
                        const movie = result;
        res.render('slotEdit', {
            slot: slot,
            movie: movie
        });
    }).catch((err) => {
        console.log(err);
    }).catch((err) => {
        console.log(err);
    })
    })
    
}


module.exports = {
    theater_get,
    theater_post,
    theater_edit,
    theater_screen,
    theater_screen_post,
    theater_screen_menu,
    theater_screen_seats,
    theater_screen_seats_post,
    theater_screen_seats_menu,
    theater_screen_seats_edit,
    theater_screen_slots,
    theater_screen_slots_post,
    theater_screen_slots_menu,
    theater_screen_slots_edit
}