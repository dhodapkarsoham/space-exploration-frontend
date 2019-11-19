const express = require('express');
const router = express.Router();
const axios = require('axios');


//Admin login

//GET THE LOGIN PAGE
router.get('/login', (req, res, next) => {
    if (req.cookies.token) {
        res.render('adminOps', {message: null})
    } else {
        res.render('login', {message: null})
    }
});

//LOGIN FUNCTIONALITY, CALLS LOGIN API
router.post('/login', (req, res, next) => {
    axios.post('https://space-exploration-api.herokuapp.com/user/login', {
        username: req.body.username,
        password: req.body.password,
    }
    ).then(response => {
        res.cookie('token', response.data.token);
        res.redirect('/admin/adminOps');
    }).catch(err => {
        res.render('login', {message: "Access denied! Wrong username/password"})
    })
});

//GET ADMINOPS PAGE
router.get('/adminOps', (req, res, next) => {
    res.render('adminOps', {message: null});
});

//CALLS THE CREATE GALAXY API
router.post('/adminOpsCreateGalaxy', (req, res, next) => {
    
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
        res.redirect('/admin/adminOps');
    }).catch(err => {
        res.render('adminOps', {message: 'Operation unsuccessful!'});
    })
});

//CALLS THE DELETE GALAXY API
router.post('/adminOpsDeleteGalaxy', (req, res, next) => {
    
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
        res.redirect('/admin/adminOps');
    }).catch(err => {
        res.render('adminOps', {message: "Operation unsuccessful!"});
    })
});

//CALLS THE CREATE STARS API
router.post('/adminOpsCreateStar', (req, res, next) => {

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
        res.redirect('/admin/adminOps');
    }).catch(err => {
        res.render('adminOps', {message: "Operation unsuccessful!"});
    })
});

//CALLS THE DELETE STARS API
router.post('/adminOpsDeleteStar', (req, res, next) => {
    
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
        res.redirect('/admin/adminOps');
    }).catch(err => {
        res.render('adminOps', {message: "Operation unsuccessful!"});
    })
});

router.post('/logout', (req, res, next) => {

    res.clearCookie('token');
    res.redirect('/');
});

module.exports = router;