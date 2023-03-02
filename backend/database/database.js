const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://netninja1:test1234@nodetuts.75rvgti.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log('connected to DB')).catch((err) => console.log(err))