const fs = require('fs');
const helper = require('./helper');

let news = [
    {
        id: 1,
        text: 'День знаний',
        date: '01.09.2024'
    },
    {
        id: 2,
        text: 'Переворачиваем календарь',
        date: '03.09.2024'
    },
]

// path-> /
function hello(req, res) {
    res.end('Hello');
}

// path-> /news
function getNews(req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    news.forEach(item => res.write(`[${item.date}]: ${item.text}</br>`));
    res.end();
}

// path-> /news/create
function addNews(req, res) {
    helper.parseBody(req, (err, body) => {
        const newItem = {
            id: news.length + 1,
            text: body.text,
            date: body.date,
        };

        news.push(newItem);
        res.statusCode = 201;
        res.end("Created");
    });
}

// path-> /news/text
function getFile(req, res) {
    fs.readFile('example.txt', 'utf-8', (err, data) => {
        res.setHeader('Content-Type', 'text/plain');
        res.end(data);
    })

    fs.writeFile('example.txt', 'any text', {}, () => console.log('file written'))
}

// path-> /news/text
function updateNews(req, res, params) {
    helper.parseBody(req, (err, body) => {
        news = news.map(item => item.id != params.id ? item : {
            id: item.id,
            text: body.text || item.text,
            date: body.date || item.date,
        })

        res.end('Updated');
    });
}

module.exports = {
    hello,
    getNews,
    addNews,
    getFile,
    updateNews
}