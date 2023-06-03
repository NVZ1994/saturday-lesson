const mongoConnect = require("./db/connection");
const app = require("./app");

const { PORT } = process.env;

async function startServer() {
  try {
    await mongoConnect();
    app.listen(PORT, (error) => {
      if (error) {
        console.log("Server connection error");
      }

      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();
