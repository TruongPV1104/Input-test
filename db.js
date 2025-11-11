const express = require('express')
const sql = require('mssql')
require("dotenv").config();

const user = process.env.USER;
const password = process.env.PASSWORD
const server = process.env.SERVER
const database = process.env.DATABASE

const config = {
    user,
    password,
    server,
    database,
    options:{
        trustedConnection: true,
        enableArithAbort: true,
        trustServerCertificate: true
    }
}

const pool = new sql.ConnectionPool(config)
const poolConnect = pool.connect();

pool.on('error',err=>{
    console.error('SQL Poll Error',err)
})

module.exports = {
    sql,
    poolConnect,
    pool
}