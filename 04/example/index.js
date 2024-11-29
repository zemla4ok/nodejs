const http = require('http');
const helper = require('./helper');
const constrollers = require('./controllers');


const server = http.createServer(handler);

server.listen(3000, '127.0.0.1', () => {
    console.log('Running');
});

const endpointMapper = {
    '/': constrollers.hello,
    '/news': constrollers.getNews,
    '/news/create': constrollers.addNews,
    '/news/update': constrollers.updateNews,
    '/news/text': constrollers.getFile
}

function handler(req, res) {
    const { url, params } = helper.parseUrl(req.url);
    const handler = endpointMapper[url];

    if (handler) {
        handler(req, res, params);
    } else {
        send404(req, res);
    }
}

function send404(req, res) {
    res.statusCode = 404;
    res.end('404 Page Not Found');
}
