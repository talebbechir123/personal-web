const express = require('express')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

// Health check for GCP Cloud Run / load balancers
app.get('/healthz', (_req, res) => res.status(200).json({ status: 'ok' }))

// Serve built React app
const PUBLIC = path.join(__dirname, 'public')
app.use(express.static(PUBLIC))

// SPA fallback — all unknown routes serve index.html
app.get('*', (_req, res) => {
  res.sendFile(path.join(PUBLIC, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
