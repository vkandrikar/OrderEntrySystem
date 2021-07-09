require('custom-env').env(true)

const app = require('./server');
const db = require("./database/index");

const serverPort = process.env.SERVER_PORT || 8900;

const init = async () => {
  const dbConn = await db.fnConnect();

  if (dbConn === "connected") {
    app.listen(serverPort, () => {
      console.log(`App started on port ${serverPort}`);
    })
  } else {
    throw new Error(`Issue while connecting database: ${dbConn}`);
  }
}

try {
  init();
} catch (err) {
  console.log(err);
}
