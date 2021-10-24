// https://medium.com/@aarnlpezsosa/usando-pug-js-en-express-deeb3aa26920

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(express.static(`${__dirname}/../public`))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.engine('pug', require('pug').__express) // https://stackoverflow.com/questions/45342307/error-cannot-find-module-pug
app.set('views', './views')
app.set('view engine', 'pug')

app.get('/pug', (req, res) => {
	res.render(`index.pug`, { message: req.query.info || 'No info' })
})

app.get('/path/to/:item', (req, res) => {
  res.send(`You requested "${req.params.item}" to server with query = ${JSON.stringify(req.query)}`)
})

app.post('/userInput', (req, res) => {
  res.send({ message: `We have taken note of your input, "${req.body.input}", thanks` })
})

const port = 3000

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
