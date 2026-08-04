const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  ssl: { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000
});

async function connect() {
  try {
    const client = await pool.connect();
    console.log("✅ DB CONNECTED SUCCESSFULLY");
    client.release();
  } catch (err) {
    console.error("❌ DB CONNECTION FAILED:", err);
  }
}

function convertPlaceholders(sql) {
  let i = 0;
  return sql.replace(/\?/g, () => `$${++i}`);
}

async function query(sql, params = []) {
  try {
    let pgSql = convertPlaceholders(sql);
    const trimmedUpper = pgSql.trim().toUpperCase();

    const isInsert = trimmedUpper.startsWith("INSERT");
    const isUpdateOrDelete =
      trimmedUpper.startsWith("UPDATE") || trimmedUpper.startsWith("DELETE");

    if (isInsert && !trimmedUpper.includes("RETURNING")) {
      pgSql = pgSql.trim().replace(/;\s*$/, "") + " RETURNING id";
    }

    const result = await pool.query(pgSql, params);

    if (isInsert) {
      return {
        insertId: result.rows[0] ? result.rows[0].id : null,
        affectedRows: result.rowCount,
        rows: result.rows
      };
    }

    if (isUpdateOrDelete) {
      return {
        affectedRows: result.rowCount,
        rows: result.rows
      };
    }

    return result.rows;
  } catch (err) {
    console.error("❌ DB QUERY ERROR:", err);
    throw err;
  }
}

module.exports = {
  pool,
  connect,
  query
};
