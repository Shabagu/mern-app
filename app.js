const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({ extended: true }))

app.use('/api/test', require('./routes/_test.routes'))
app.use('/api/link', require('./routes/_link.routes'))
app.use('/t', require('./routes/_redirect.routes'))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/profile', require('./routes/profile.routes'))
app.use('/api/research', require('./routes/research.routes'))
app.use('/api/admin', require('./routes/admin.routes'))


const PORT = config.get('port') || 5000


async function start() {
  try {
    mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    app.listen(PORT, () => console.log(`*** SERVER APP IS NOW WORKING ON PORT ${PORT} ***`))
  } catch (e) {
    console.log('*** SERVER ERROR! ***', e.message)
    process.exit(1)
  }
}

start()
