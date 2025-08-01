// const fs = require('fs');
// const ourReadStrem = fs.createReadStream('./text.txt','utf8');

// ourReadStrem.on('data', (chunk) => {
//   console.log(chunk);
// });
// console.log("=========================================");



// const http = require("http");

// const server = http.createServer((req, res) => {
//   if(req.url === "/") {
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.write("<h1><form method='post' action='/process'><input type='text' name='message'><button type='submit'>Send</button></form> <a href='/process'>process</a></h1>");
//     res.end();
//   }else if(req.url === "/process") {
//     const body = [];
//     req.on("data", (chunk) => {
//       console.log(chunk.toString());
//     });
//     req.on("end", () => {
//       console.log('stream finished');
//       const parsedBody = Buffer.concat(body).toString();
//       console.log(parsedBody);
//     })
//     res.write("<h1>process page <a href='/'>home</a></h1>");
//     res.end();
//   }else {
//     res.write("404 not found");
//     res.end();
//   }
// });
// server.on("connection", (socket) => {
//   console.log("a user connected");
// });

// server.listen(5000, () => {
//   console.log("http://localhost:5000");
// });

console.log("=========================================");