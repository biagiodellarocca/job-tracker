const express = require('express')
const app = express()
const port = 2000
const users = require('./routes/users')

app.use(express.json())

app.get('/', (req, res) => {
   res.send('Welcome to the Homepage!')
})

app.use('/users', users)

app.use((err, req, res, next) => {
   const status = err.statusCode || 500
   const message = err.message || 'Internal server error'
   res.status(status).send(message)
})


app.listen(port, () => {
   console.log(`App is listening to port http://localhost:${port}`)
})
