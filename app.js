if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const cors = require('cors')

const express = require('express')
const errorHandler = require('./middleware/errorHndler')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', require('./routers/index'))

app.use(errorHandler)

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
