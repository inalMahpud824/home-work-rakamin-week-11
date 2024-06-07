const express = require('express')
const app = express()
const router = require('./routes')
const port = 8000
const cors = require('cors')
app.use(express.json());
app.use(cors());
app.use(router)
app.listen(port, () => {
  console.log('server berjalan di port ' + port)
})

module.exports = {app}
