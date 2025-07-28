const http = require("http");

const server = http.createServer((req, res) => {
  if(req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>hello world bangladesh <a href='/about'>about</a></h1>");
    res.end();
  }else if(req.url === "/about") {
    res.write("<h1>about page <a href='/'>home</a></h1>");
    res.end();
  }else {
    res.write("404 not found");
    res.end();
  }
});
server.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(5000, () => {
  console.log("http://localhost:5000");
});