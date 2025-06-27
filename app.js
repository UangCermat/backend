const cors = require('cors')

const express = require('express')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', require('./routers/index'))

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
