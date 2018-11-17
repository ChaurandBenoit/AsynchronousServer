express = require('express')
app = express()

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Write in the url "/hello/YourName" , the app will welcome you. Little bonus if you find my name, you will have a short intro of myself');
});

app.get('/hello/:name', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    if(req.params.name === 'benoit') res.send('Hello I am Benoit, I am french and live in Paris. I am in my final year in an engineering school')
    else res.send('Hello ' + req.params.name)
});

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Error 404. Message not found.');
});


app.listen(8080)