const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');

//Iteration #3: Adding New Celebrities
router.get('/create', (req, res, next) => {  
    res.render('celebrities/new-celebrity.hbs')
})
router.post('/create', (req, res, next)=>{
    Celebrity.create({
        name:req.body.name,
        occupation: req.body.occupation,
        catchphrase:req.body.catchphrase
       
    })
    .then((createdCeleb)=>{
        console.log(createdCeleb)
        res.redirect("/celebrities")
    })
    .catch((err)=>{
        console.log(err)
        res.render('celebrities/new-celebrity.hbs')
    })
})

//Iteration #4: Listing Our Celebrities
router.get('/', (req, res, next) => {
    Celebrity.find()
    .then((celebsfound) =>{
        console.log('all the celebrities on this side:', celebsfound)
        res.render('celebrities/celebrities.hbs', {celebsfound})
    })
    .catch((err) =>{
        console.log(err)
    })
})
  




module.exports = router;

