const express = require('express')
const sql = require('mssql')

const config = {
    user: 'user_study',
    password: 'tim@2024',
    server: 'cvn-veng',
    database: 'Study_newcomer',
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