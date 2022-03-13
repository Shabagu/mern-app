const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

app.use('/api/test/', require('./routes/test.routes'))

const PORT = config.get('port') || 5000


async function start() {
  try {
    mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    app.listen(PORT, () => console.log(`*** APP STARTED ON PORT ${PORT} ***`))
  } catch (e) {
    console.log('server error!', e.message)
    process.exit(1)
  }
}

start()
