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
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(results, null, '\t'));
  });
});
 
//show single product
app.get('/api/menulang/:id',(req, res) => {
  let sql = "call mainmind.GetMenulang("+req.params.id+");";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(results[0], null, '\t'));
  });
});

app.get('/api/topiclang/:id',(req, res) => {
  let sql = "call mainmind.GetTopickLang("+req.params.id+");";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(results[0], null, '\t'));
  });
});

app.get('/api/education/:id',(req, res) => {
  let sql = "call mainmind.GetEducation("+req.params.id+");";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(results[0], null, '\t'));
  });
});

app.post('/api/education/add',(req, res) => {
  let data = {idTopicLang: req.body.idTopicLang, educationTextField: req.body.educationTextField};
  let sql = "INSERT INTO `mainmind`.`education` SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});