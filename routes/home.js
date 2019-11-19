const express = require('express');
const router = express.Router();
const axios = require('axios');


//HOME ROUTE, DEF ROUTE


//GET THE HOMEPAGE
router.get('/', (req, res, next) => {

    res.render('homepage');
});

//GET METHOD TO GO TO VIEW GALAXIES
router.get('/galaxies', (req, res, next) => {

    const header = {
        "Content-Type": "application/json"
    }

    axios.get('https://space-exploration-api.herokuapp.com/galaxies',{
        headers: header
    })
        .then(response => {
            
            res.render('galaxy', {galaxies: response.data.galaxies});
        })
        .catch(err => {
            res.status(404).json({
                message: "Not found"
            })
        })
});

//GET METHOD TO VIEW STARS
router.get('/stars', (req, res, next) => {
    const header = {
        "Content-Type": "application/json"
    }

    axios.get('https://space-exploration-api.herokuapp.com/stars',{
        headers: header
    })
        .then(response => {
            
            res.render('star', {stars: response.data.stars});
        })
        .catch(err => {
            res.send(404).json({
                message: "Not found"
            })
        })
});


module.exports = router;