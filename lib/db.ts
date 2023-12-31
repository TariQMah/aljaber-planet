const sql = require('mssql')


const sqlConfig = {
  user: process.env.DB_USER ?? "",
  password: process.env.DB_PWD ?? "",
  database: process.env.DB_NAME ?? "",
  server: process.env.SQL_IP ?? "",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

const sqlConfigForInsert = {
  user: process.env.DB_USER ?? "",
  password: process.env.DB_PWD ?? "",
  database: process.env.DB_NAME_REFUNDTAX ?? "",
  server: process.env.SQL_IP ?? "",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

let connection: any;
let connectToInsert: any;
export async function connectToDatabase() {
  try {
    connection = await sql.connect(sqlConfig ?? "");
    console.log("Connected to the database", process.env.DB_USER ?? "");
    return connection;
  } catch (err) {
    console.error("Error connecting to the database:", err);
    throw err; // Propagate the error if connection fails
  }
}

export async function connectionClose() {
  try {
    if (connection) {
      await connection.close();
      console.log("Connection closed");
    } else {
      console.warn("Connection not established.");
    }
  } catch (err) {
    console.error("Error closing the connection:", err);
  }
}

export async function connectToInsertDatabase() {
  try {
    connectToInsert = await sql.connect(sqlConfigForInsert ?? "");
    console.log("Connected to the refund tags database");
    return connectToInsert;
  } catch (err) {
    console.error("Error connecting  refund tags to the database:", err);
    throw err; // Propagate the error if connection fails
  }
}

export async function closeConnectionToInsertDatabase() {
  try {
    if (connectToInsert) {
      await connectToInsert.close();
      console.log("Connection closed");
    } else {
      console.warn("Connection not established.");
    }
  } catch (err) {
    console.error("Error closing the connection:", err);
  }
}


