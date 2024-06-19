if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const router = require('./routes/index')
const app = express()
const cors = require('cors')
const UserController = require('./controllers/UserController')
const errorHandler = require('./middleware/errorHandler')
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use('/login', UserController.loginUser);

app.use(router);

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});