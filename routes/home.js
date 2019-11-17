const express = require('express');
const router = express.Router();
const axios = require('axios');


//HOME ROUTE, DEF ROUTE
console.log('Home route works');

//GET THE HOMEPAGE
router.get('/', (req, res, next) => {
    console.log('Home page get works');
    res.render('homepage');
});

//GET METHOD TO GO TO VIEW GALAXIES
router.get('/galaxies', (req, res, next) => {
    console.log('view galaxies works');
    const header = {
        "Content-Type": "application/json"
    }

    axios.get('https://space-exploration-api.herokuapp.com/galaxies',{
        headers: header
    })
        .then(response => {
            console.log(response.data);
            
            res.render('galaxy', {galaxies: response.data.galaxies});
        })
        .catch(err => {
            console.log(err);
        })
});

//GET METHOD TO VIEW STARS
router.get('/stars', (req, res, next) => {
    console.log('view stars works');
    const header = {
        "Content-Type": "application/json"
    }

    axios.get('https://space-exploration-api.herokuapp.com/stars',{
        headers: header
    })
        .then(response => {
            console.log(response.data);
            
            res.render('star', {stars: response.data.stars});
        })
        .catch(err => {
            console.log(err);
        })
});


module.exports = router;