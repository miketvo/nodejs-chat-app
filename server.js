const app = require("express")();



const server = app.listen(8080, "localhost", () => {
  console.log("Server is running on: ", server.address());
});
