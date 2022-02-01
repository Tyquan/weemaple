require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Api Imports
const Gig = require('./server/Controllers/Gig/Gig');
const Article = require('./server/Controllers/Article/Article');
const Employee = require('./server/Controllers/Employee/Employee');
const User = require('./server/Controllers/User/User');
const Video = require('./server/Controllers/Video/Video');
const Escrap = require('./server/Controllers/Escrap/Escrap');

// mongoose connection
async function connectToDatabase () {
    await mongoose.connect(process.env.PROD_DATABASE);
}

connectToDatabase();

const app = express();
app.use(cors({
    origin: '*'
}));

app.use('/weemaple', (req, res, next)=> {
    res.json({
        message: "Weemaple API V1"
    });
});

app.use('/api/V1/gigs', Gig);
app.use('/api/V1/articles', Article);
app.use('/api/V1/employees', Employee);
app.use("/api/V1/users", User);
app.use('/api/V1/videos', Video);
app.use('/api/V1/escraps', Escrap);

app.listen('8080', () => {
    console.log("PORT runnig on 8080");
});

module.exports = app;