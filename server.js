require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const dns = require('dns');
const bodyParser = require('body-parser');
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.use(bodyParser.urlencoded({
    extended: false
}))

const links = [];
let id = 0;

app.post('/api/shorturl/new', (req, res) => {
    const { url } = req.body;
    console.log(url);
    const noHTTPSUrl = url.replace(/^https?:\/\//, '');

    // check if this url is valid
    dns.lookup(noHTTPSUrl, (err) => {
        if (err) {
            return res.json({
                error: "invalid URL"
            });
        } else {
            //increment
            id++;
            //create new entry for ou arr
            const link = {
                original_url: url,
                short_url: id
            }
            links.push(link)
                //return this new entry
            return res.json(link)
        }
    })
})

app.get('/api/shorturl/:id', (req, res) => {
    const { id } = req.query;
    const link = links.find(link => link.id === id);
    if (link) {
        return res.redirect(link.original_url);
    } else {
        return res.json({
            error: "No short url"
        })
    }
})

// Your first API endpoint
app.get('/api/hello', function(req, res) {
    res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
    console.log(`
                                    Listening on port $ { port }
                                    `);
});