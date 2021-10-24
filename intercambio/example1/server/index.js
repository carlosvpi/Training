// https://medium.com/@aarnlpezsosa/usando-pug-js-en-express-deeb3aa26920

const express = require('express')
const app = express()

app.use('/', express.static(`${__dirname}/../public`))
app.engine('pug', require('pug').__express) // https://stackoverflow.com/questions/45342307/error-cannot-find-module-pug
app.set('views', './views')
app.set('view engine', 'pug')

app.get('/pug', (req, res) => {
	res.render(`index.pug`, { message: req.query.info || 'No info' })
})

const port = 3000

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
