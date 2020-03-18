const mongoose = require('mongoose')

require('dotenv').config({ path: 'variables.env' })

mongoose.connect(process.env.DATA_BASE, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
mongoose.Promise = global.Promise
mongoose.connection.on('error', error => { console.error(`Erro no DB: ${error.messege}`) })

require('./models/Post')
const app = require('./app')

app.set('port', process.env.PORT)
const server = app.listen(app.get('port'), () => { console.log(`Conectado na porta: ${server.address().port}`) })