const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password', // Reemplaza con tu contraseña
    database: 'Score'
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

app.post('/addscore', (req, res) => {
    let score = req.body;
    let sql = 'INSERT INTO score (tiempo, puntos, nombre) VALUES (?, ?, ?)';
    let values = [score.tiempo, score.puntos, score.nombre];
    db.query(sql, values, (err, result) => {
        if (err) throw err;
        res.send('Score added...');
    });
});

app.get('/getscores', (req, res) => {
    let sql = 'SELECT * FROM score ORDER BY puntos DESC, tiempo ASC LIMIT 10';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
