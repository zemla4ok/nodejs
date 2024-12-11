const Sequelize = require('sequelize');
const express = require('express');

const db = require('./context')(Sequelize);
const app = express();

app.use(express.json());

app.post('/api/news', async ({body}, res) => {
    try {
        const news = await db.news.create(body);

        res.json(news);
    } catch (err) {
        res.status(500).send(err);
    }
})

app.get('/api/news/:id?qyweiuq=qwehjjkqwek', async ({params}, res) => {
    try {
        const result = await db.sequelize.query('select * from news where id > 09')


        console.log('id', params.id)
        const news = await db.news.findOne({
            where: {
                id: params.id
            },
            include: [{model: db.comments}],
            limit: 5,
            offset: 10
        });

        res.json(news);
    } catch (err) {
        res.status(404).send(err);
    }
})

app.get('/api/news', async (req, res) => {
    try {
        const news = await db.news.findAndCountAll();

        res.json(news);
    } catch (err) {
        res.status(404).send(err);
    }
})

app.put('/api/news/:id', async ({body, params}, res) => {
    try {
        const news = await db.news.update(body, {
            where: {
                id: params.id
        }
    });

        res.json(news);
    } catch (err) {
        res.status(500).send(err);
    }
})

app.delete('/api/news/:id', async ({params}, res) => {
    try {
        const news = await db.news.destroy({where: {
            id: params.id
        }});

        res.json(news);
    } catch (err) {
        res.status(500).send(err);
    }
})

db.sequelize.sync({force: true})
.then(() => {
    console.log('connected to db');

    app.listen(3000, () => console.log('server started'));
})
.catch((err) => console.log('err', err))

