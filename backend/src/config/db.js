import sql from "mssql/msnodesqlv8.js";
import dotenv from "dotenv";
dotenv.config();

let pool;

const configTrusted = {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT) || 1433,
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true,
    trustServerCertificate: true
  }
};

const configSqlAuth = {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT) || 1433,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  options: { trustServerCertificate: true }
};

export async function getPool() {
  if (pool) return pool;
  const useTrusted = String(process.env.DB_TRUSTED || "true").toLowerCase() === "true";
  const cfg = useTrusted ? configTrusted : configSqlAuth;
  pool = await sql.connect(cfg);
  return pool;
}

export { sql };
