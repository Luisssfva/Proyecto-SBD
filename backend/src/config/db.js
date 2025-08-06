const sql = require('mssql/msnodesqlv8');

const config = {
    server: 'DESKTOP-UGTJ58R',  
    driver: 'msnodesqlv8',       
    options: {
        trustedConnection: true, 
        trustServerCertificate: true
    }
};

async function createDatabase() {
    try {
        const pool = await sql.connect(config);
        console.log('Conexión exitosa a SQL Server');

        const result = await pool.request().query(`
            IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'CineDB')
            BEGIN
                CREATE DATABASE CineDB;
                PRINT 'Base de datos CineDB creada.';
            END
            ELSE
                PRINT 'La base de datos CineDB ya existe.';
        `);

        console.log('Script ejecutado correctamente');
        await pool.close();
    } catch (err) {
        console.error('Error:', err.message);
    }
}

createDatabase();
