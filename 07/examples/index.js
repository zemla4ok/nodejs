const express = require('express');
const app = express();

const newsRouter = require('./routes/news');
const greetingsRouter = require('./routes/greetings');

app.use(express.json());
app.use('/static', express.static(__dirname + '/public'));

app.use((req, res, next) => {
    console.log(req.url);
    next();
})


app.use('/', greetingsRouter);
app.use('/news', newsRouter);

app.use((err, req, res) => {
    console.log(err);
});

app.listen(3000, function () {
    console.log('Running');
});