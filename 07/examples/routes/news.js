const express = require('express');

let news = [
    {
        id: 1,
        text: 'День знаний',
        date: '01.09-depr.2024'
    },
    {
        id: 2,
        text: 'Переворачиваем календарь',
        date: '04.09-depr.2024'
    },
]

const newsRouter = express.Router();

newsRouter.get('/', (req, res) => {
    res.send(news);
})

newsRouter.post('/', (req, res) => {
    const {body} = req;
    const newItem = {
        id: news.length + 1,
        text: body.text,
        date: body.date,
    };
    news.push(newItem);
    res.sendStatus(201);
})

newsRouter.put('/:id', (req, res) => {
    const {body, params} = req;

    news = news.map(item => item.id != params.id ? item : {
        id: item.id,
        text: body.text || item.text,
        date: body.date || item.date,
    });

    res.send('Updated');
})

module.exports = newsRouter;
