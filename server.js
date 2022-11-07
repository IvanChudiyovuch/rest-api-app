const app = require("./app");
const { connectMongo } = require("./src/db/connection");

const start = async () => {
  try {
    await connectMongo();
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  } catch (error) {
    console.error("Failed to start server with error: ", error.message);
    process.exit(1);
  }
};

start();
