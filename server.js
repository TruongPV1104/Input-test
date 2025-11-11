const express = require('express')
const db = require('./db')
require("dotenv").config();
const bodyParser = require('body-parser');

const app = express()
const port = 3000
app.use(express.json());


app.post('/api/userauthentication', async (req, res) => {
    try {
        await db.poolConnect; // Wait pool

        const { Username, PasswordHash, Email, RegistrationDate, IsActive } = req.body; 

        // Tao request moi
        const request = db.pool.request();
        
        
        request.input('UserName', db.sql.NVarChar, Username);
        request.input('PasswordHash', db.sql.NVarChar, PasswordHash);
        request.input('Email', db.sql.NVarChar, Email);
        request.input('RegistrationDate', db.sql.DateTime, new Date(RegistrationDate));
        request.input('IsActive',db.sql.Bit, IsActive)
        // request.input('')

        // Inset to
        const query = `
            INSERT INTO dbo.UserAuthentication (UserName, PasswordHash, Email, RegistrationDate, IsActive)
            VALUES (@Username, @PasswordHash, @Email, @RegistrationDate, @IsActive)
        `;

        const result = await request.query(query);

        res.status(201).json({ 
            message: 'Dữ liệu đã được thêm thành công', 
            rowsAffected: result.rowsAffected 
        });

    } catch (err) {
        console.error('Lỗi khi thêm dữ liệu vào SQL Server:', err);
        res.status(500).send('Lỗi máy chủ nội bộ.');
    }
});

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`)
})
