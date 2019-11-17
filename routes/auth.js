const express = require('express');
const router = express.Router();
const axios = require('axios');


//Admin login
console.log('Auth Route works');

//GET THE LOGIN PAGE
router.get('/login', (req, res, next) => {
    console.log('Login page get works');
    if (req.cookies.token) {
        res.render('adminOps')
    } else {
        res.render('login')
    }
});

//LOGIN FUNCTIONALITY, CALLS LOGIN API
router.post('/login', (req, res, next) => {
    axios.post('https://space-exploration-api.herokuapp.com/user/login', {
        username: req.body.username,
        password: req.body.password,
    }
    ).then(response => {
        console.log(req.body.username);
        console.log(req.body.password);    
        console.log(response.data.token);
        res.cookie('token', response.data.token);
        res.redirect('/admin/adminOps');
        // res.render('galaxies');
    }).catch(err => {
        console.log(err);
    })
});

//GET ADMINOPS PAGE
router.get('/adminOps', (req, res, next) => {
    // res.send('Login called to admin');
    console.log('adminOps get works');
        res.render('adminOps');
});

//CALLS THE CREATE GALAXY API
router.post('/adminOpsCreateGalaxy', (req, res, next) => {
    console.log('In create galaxies');
    console.log(req.cookies.token);
    
    axios.post('https://space-exploration-api.herokuapp.com/galaxies/create',{
        galaxyName: req.body.galaxyName,
        galaxyDistance: req.body.galaxyDistance,
        galaxyDescription: req.body.galaxyDescription
    },
    {headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + req.cookies.token
    }})
    .then(response => {
        // console.log(response);
        console.log(response.data.token);
        
        // res.cookie('token', response.data.token);
        res.redirect('/admin/adminOps');
    }).catch(err => {
        console.log(err);
    })
});

//CALLS THE DELETE GALAXY API
router.post('/adminOpsDeleteGalaxy', (req, res, next) => {
    console.log('In delete galaxies');
    console.log(req.cookies.token);
    
    axios.delete(
        'https://space-exploration-api.herokuapp.com/galaxies/delete',
        {headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + req.cookies.token
        },
        data: {
            galaxyName: req.body.galaxyName
        }}
    )   
    .then(response => {
        console.log(req.cookies.token);
        
        // res.cookie('token', response.data.token);
        console.log('DEMO LOG');
        
        res.redirect('/admin/adminOps');
    }).catch(err => {
        console.log('Error');
    })
});

//CALLS THE CREATE STARS API
router.post('/adminOpsCreateStar', (req, res, next) => {
    console.log('In create stars');
    console.log(req.cookies.token);
    
    axios.post('https://space-exploration-api.herokuapp.com/stars/create',{
        starName: req.body.starName,
        starDistance: req.body.starDistance,
        starDescription: req.body.starDescription
    },
    {headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + req.cookies.token
    }})
    .then(response => {
        console.log(response.data.token);
        
        // res.cookie('token', response.data.token);
        res.redirect('/admin/adminOps');
    }).catch(err => {
        console.log(err);
    })
});

//CALLS THE DELETE STARS API
router.post('/adminOpsDeleteStar', (req, res, next) => {
    console.log('In delete stars');
    console.log(req.cookies.token);
    
    axios.delete(
        'https://space-exploration-api.herokuapp.com/stars/delete',
        {headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + req.cookies.token
        },
        data: {
            starName: req.body.starName
        }}
    )   
    .then(response => {
        
        // res.cookie('token', response.data.token);
        res.redirect('/admin/adminOps');
    }).catch(err => {
        console.log(err);
    })
});

router.post('/logout', (req, res, next) => {
    console.log('Clearing cookies');
    
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = router;