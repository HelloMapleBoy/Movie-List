// app.js
// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require handlebars in the project
const exphbs = require('express-handlebars')

//requrire moviesjson
const movieList = require('./movies.json')

//setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', { movies: movieList.results })
})

app.get('/movies/:movie_id', (req, res) => {
  const movie = movieList.results.filter(movie => movie.id == req.params.movie_id)
  res.render('show', { movie: movie[0] })
})

app.get('/search', (req, res) => {
  console.log('req', req)
  const movies = movieList.results.filter(movie => {
    return movie.title.toLowerCase().includes(req.query.keyword.toLowerCase())
  })
  res.render('index', { movies: movies, keyword: req.query.keyword })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})