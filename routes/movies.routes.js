const router = require("express").Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');


router.get('/create', (req, res, next) => {  
    Celebrity.find()
    .then((celebsfound) => {
        console.log('here are the celebs I found:', celebsfound)
        res.render('movies/new-movie.hbs', celebsfound)
    })
    .catch((err) => {
        console.log('Error creating a movie:', err)
    })


})

router.post('/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    Movie.create({ title, genre, plot, cast})
    .then((newMovie) => {
        console.log('this is the new movie', newMovie)
        res.redirect('movies')
    })
    .catch((err) => {
        res.render('movies/new-movie.hbs')
        console.log('Error posting a new movie:', err)
    })
   

})


router.get('/', (req, res, next) => {
    Movie.find()
    .then((moviesfound) =>{
        console.log('all the movies on this side:', moviesfound)
        res.render('movies/movies.hbs', {moviesfound})
    })
    .catch((err) =>{
        console.log(err)
    })
})

router.get('/:id', (req, res, next) => {
    //What parameter do I need to pass on the populate() method
    Movie.findById(req.params.id).populate("cast")
    .then((moviesfound) => {
        console.log('Found this movie', moviesfound)
        res.render('movies/movie-details.hbs', moviesfound)
    })
    .catch((err) => {
        console.log(err)
    })
    
})



router.post('/:id/delete', (req, res, next) => {
    Movie.findByIdAndRemove(req.params.id)
    .then((deletedMovie) => {
         console.log(deletedMovie)
        res.redirect('/movies')
    })
    .catch((err) => {
        console.log(err)
    })
})

router.get('/:id/edit', (req, res, next) => {
    Movie.findByIdAndUpdate(req.params.id)
    Celebrity.find()
    .then((updatedMovie) => {

    })
})



module.exports = router;
