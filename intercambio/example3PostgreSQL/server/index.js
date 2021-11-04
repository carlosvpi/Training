// https://medium.com/@aarnlpezsosa/usando-pug-js-en-express-deeb3aa26920

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// https://expressjs.com/es/guide/database-integration.html#postgres
// https://postgresapp.com/
const pgp = require("pg-promise")()
const db = pgp("postgres://carlos:@localhost/carlos")

app.use(express.static(`${__dirname}/../public`))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// app.engine('pug', require('pug').__express) // https://stackoverflow.com/questions/45342307/error-cannot-find-module-pug
// app.set('views', './views')
// app.set('view engine', 'pug')

// app.get('/pug', (req, res) => {
//   res.render(`index.pug`, { message: req.query.info || 'No info' })
// })

app.get('/user/:userId', async (req, res) => {
  try {
    const data = await db.one('SELECT * FROM users WHERE id = $1', req.params.userId)
    console.log('/user/:userId', data);
    res.send({ data: data, type: 'data' })
  } catch (e) {
    console.error('ERROR:', e);
    res.sendStatus(500)
  }
})

app.post('/login', async (req, res) => {
  try {
    const data = await db.one('SELECT * FROM users WHERE name = $1 AND encryptedzero = $2', [req.body.name, req.body.password])
    console.log('/login', data);
    res.send({ data: data, type: 'data' })
  } catch (e) {
    console.error('ERROR:', e);
    res.sendStatus(500)
  }
})

app.post('/signup', async (req, res) => {
  try {
    const data = await db.one('SELECT * FROM users WHERE name = $1', req.body.name)
    res.send({ type: 'error', error: 'A user with that name already exists' })
  } catch(e) {
    try {
      const data = await db.one('INSERT INTO users (name, encryptedzero) VALUES ($1, $2)', [req.body.name, req.body.password])
      res.send(data)
    } catch (e) {
      console.error('ERROR:', e);
      res.sendStatus(500)
    }
  }
})

app.post('/userInput', (req, res) => {
  res.send({ message: `We have taken note of your input, "${req.body.input}", thanks` })
})

const port = 3000

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
