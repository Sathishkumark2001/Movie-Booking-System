const express = require('express');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const { requireAuth } = require('./middleware/authMiddleware');
const dbURI = require('./database/database');
const authRoutes = require('./routes/authRoutes');
const app = express();


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(authRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


