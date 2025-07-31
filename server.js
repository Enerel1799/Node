const { log } = require("console");
const fs = require("fs");
const txt = fs.readFileSync("data.json", "utf8");
const http = require("http");
const { userInfo } = require("os");

const server = http.createServer((req, res) => {
  const method = req.method;
  if (method === "GET") {
    console.log("GET methodiin code ajillaj bn");
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(txt);
  } else if (method === "POST") {
    console.log("POST methodiin code ajillaj bn");
    let body = "";
    req.on("data", (chunk) => {
      body = body + chunk;
    });
    req.on("end", () => {
      const newUser = JSON.parse(body);
      console.log("requestiin body-iin user=>", newUser);
      const jsonUser = fs.readFileSync("data.json", "utf8");
      const users = JSON.parse(jsonUser);
      console.log("JSON file dotor bga user=>", users);
      users.push(newUser);
      res.end("Amjilttai shine user nemegdlee");
    });
  } else if (method === "PUT") {
    const url = req.url;
    const a = url.split("=");
    const name = a[1];
    const usersjson = fs.readFileSync("data.json", "utf8");
    const users = JSON.parse(usersjson);

    let body = "";
    req.on("data", (chunk) => {
      body = body + chunk;
    });

    req.on("end", () => {
      const change = JSON.parse(body);
      for (let i = 0; i < users.length; i++) {
        if (users[i].name === name) {
          users[i]= {
            name: name,
            age: change.age,
            gender: change.gender
          }
        }
      }
      fs.writeFileSync('./data.json', JSON.stringify(users), 'utf8')
      res.end("Bayrlalaa");
    });
  }else if(method === "DELETE"){
    const url = req.url;
    const a = url.split("=");
    const name = a[1];
    const usersjson = fs.readFileSync("data.json", "utf8");
    const users = JSON.parse(usersjson);

    let body = "";
    req.on("data", (chunk) => {
      body = body + chunk;
    });

    req.on("end", () => {
      for (let i = 0; i < users.length; i++) {
        if (users[i].name === name) {
          users.splice(i,1)
        }
      }
      fs.writeFileSync('./data.json', JSON.stringify(users), 'utf8')
      res.end("Bayrlalaa");
    });
  }
});
server.listen(3000, () => {
  console.log("Nais");
});
