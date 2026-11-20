const express = require('express')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())


app.get('/healthz', (_req, res) => res.status(200).json({ status: 'ok' }))


const PUBLIC = path.join(__dirname, 'public')
app.use(express.static(PUBLIC))


app.get('*', (_req, res) => {
  res.sendFile(path.join(PUBLIC, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
