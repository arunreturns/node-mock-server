module.exports = (server) => {
  server.get('/test', (req, res) => {
    res.status(200).send("Hello World");
  });
};