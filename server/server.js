const express = require('express');

var app = express();
const publicPath = process.env.PWD + '/public';
app.use(express.static(publicPath))

const port = process.env.PORT || 3000;
app.listen(port,()=> console.log(`Ready`))
