const mysql = require("mysql2/promise");

async function test() {
  try {
    const db = await mysql.createConnection({
      host: "127.0.0.1",
      port: 3304,
      user: "root",
      password: "",
      database: "blocktrack",
    });

    console.log("✅ Connected");

    const [rows] = await db.query("SELECT NOW()");

    console.log(rows);

    await db.end();
  } catch (err) {
    console.error(err);
  }
}

test();
