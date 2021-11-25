const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
 
app.use(bodyParser.json());
 
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '259142',
  database: 'mainmind',
  port:3306,
  insecureAuth : true
});
 
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});
 
app.get('/api/lang',(req, res) => {
  let sql = "SELECT * FROM lang";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "lang": results}));
  });
});
 
//show single product
app.get('/api/menulang/:id',(req, res) => {
  let sql = "SELECT * FROM menulang where idLang ="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "menulang": results}));
  });
});

app.get('/api/topiclang/:id',(req, res) => {
  let sql = "SELECT id,topicLangField FROM topiclang where idMenuLang ="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "topiclang": results}));
  });
});

app.get('/api/education/:id',(req, res) => {
  let sql = "SELECT * FROM education where idTopicLang ="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "education": results}));
  });
});

app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});