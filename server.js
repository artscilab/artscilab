const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const PORT = process.env.PORT || 3000;

app.prepare()
  .then(() => {
    const server = express()

    server.get('/people/:slug', (req, res) => {
      const personPage = '/person'
      const queryParams = { slug: req.params.slug }
      app.render(req, res, personPage, queryParams)
    })

    server.get('/blog/:id', (req, res) => {
      const postPage = '/post'
      const queryParams = { id: req.params.id }
      app.render(req, res, postPage, queryParams)
    })

    server.get('/projects/:slug', (req, res) => {
      const actualPage = '/project'
      const queryParams = { slug: req.params.slug }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(PORT, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
