const http = require("http")
const chalk = require("chalk")
const app = require("./app")

const PORT =  8000
const server = http.createServer(app)

fetch('https://acl-groceries.onrender.com/api/users/me', { mode: 'cors' })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

server.listen(PORT, () => {
  console.log(
    chalk.blueBright("Server is listening on PORT:"),
    chalk.yellow(PORT),
    chalk.blueBright("Get your shopping on!")
  )
})
