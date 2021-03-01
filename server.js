require('dotenv').config({ path: './config/config.env'})
const express = require('express')
const connectDB = require('./config/db')
const errorHandler = require('./middlewares/error')
const cors = require('cors')

// Connect DB
connectDB()

const app = express()

app.use(express.json())

app.use(cors())

app.use('/api', require('./routes/auth.route'))
app.use('/api', require('./routes/private'))

app.use((req, res) => {
  res.status(404).json({
      success: false,
      msg: "Page not founded"
  })
})


// Error Handler (Should be last piece of middleware)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

process.on('unhandledRejection', (err, Promise) => {
  console.log(`Logged Error: ${err}`)
  server.close(() => process.exit(1))
})