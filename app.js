// require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const db = require('./config/keys').mongoURI;
const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static("/home/addweb/authentication/uploads")); 
app.use('/api/post', require('./routes/api/routes'));

app.use(express.static("uploads"));
app.use(bodyParser.json());

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
require('./config/passport')(passport);

mongoose.connect(db, { useNewUrlParser: true
})
.then( () => {
    console.log(`database connected successfully ${db}`)
}).catch(error => {
    console.log(`Unable to connect database ${error}`)
});

// app.get('/', (req,res) => {
//     return res.send("<h1>Hello world</h1>")
// })
const users = require("./routes/api/users");
app.use('/api/users',users);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
    if(err) return console.log(err);
    console.log(`server started on port ${PORT}`);
})