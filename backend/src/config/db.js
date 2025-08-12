import sql from "mssql/msnodesqlv8.js";
import dotenv from "dotenv";

dotenv.config();

let pool;

export const initConnection = async () => {
    if (pool) return pool;
    try {
        pool = await sql.connect({
            server: process.env.DB_SERVER,
            database: process.env.DB_DATABASE,
            port: Number(process.env.DB_PORT) || 1433,
            driver: "msnodesqlv8",
            options: {
                trustedConnection: true,
                trustServerCertificate: true
            }
        });
        console.log("Conexión a la base de datos exitosa");
        return pool;
    } catch (err) {
        console.error("Error de conexión:", err);
        throw err;
    }
};

export const getConnection = () => {
    if (!pool) throw new Error("No hay conexión inicializada");
    return pool;
};
