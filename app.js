const express = require('express')
const mongoose = require('mongoose');
const user = require('./user');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs')
const app = express()
const index = fs.readFileSync('index.html', 'utf-8')
const sub = fs.readFileSync('Ariselu.html', 'utf-8')
const form = JSON.parse(fs.readFileSync('form.json', 'utf-8'))
const data = JSON.parse(fs.readFileSync('data1.json', 'utf-8'))
app.use(express.static(__dirname));
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
function abc(id) {
    let out = sub.replace('{{%image%}}', data[id].image)
    out = out.replace('{{%name%}}', data[id].name)
    out = out.replace('{{%description%}}', data[id].description)
    out = out.replace('{{%aa%}}', data[id].aa)
    out = out.replace('{{%bb%}}', data[id].bb)
    out = out.replace('{{%cc%}}', data[id].cc)
    out = out.replace('{{%ii%}}', data[id].ii)
    out = out.replace('{{%total%}}', data[id].total)
    out = out.replace('{{%name1%}}', data[id].name)
    out = out.replace('{{%image1%}}', data[id].image)
    return out
}
app.get('/', (req, res) => {
    res.status(200).send(index)
})
app.get('/:name', (req, res) => {
    let p = req.params.name
    console.log(p)
    let f = data.find((el) => {
        return el.name == p
    })
    if (!f) {
        return res.status(404).send("page is not found")
    }
    let index = data.indexOf(f)
    res.status(200).send(abc(index))
})
app.post('/signup', async (req, res) => {
    try {
      await user.create(req.body);
      res.redirect('/login.html');
    } catch (err) { 
      console.error('Signup error:', err);
      res.status(400).send('already exist name or mobile number or password');
    }
  });
  app.post('/login', async (req, res) => {
    const { name, password } = req.body;
  
    try {
      const e = await user.findOne({ name, password });
  
      if (!e) {
        return res.status(401).send('Invalid name or password.');
      }
  
      res.redirect('/index.html');
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).send('Internal server error.');
    }
  });
app.listen(4000, () => {
    console.log("server started")
})