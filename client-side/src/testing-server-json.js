const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');

// Add custom routes before JSON Server router only to output query parameters - testing
server.get('/questions', (req, res) => {
  console.log(req.query);
  console.log("REQUEST: ", req);
  res.jsonp(req.query)
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next();
});

// Use default router
server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running')
});
