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

app.post('/api/shorturl/new', (req, res) => {
    const { url } = req.body;

    // check if this url is valid
    dns.lookup(url, (err, address, family) => {

        console.log('err', err);
        console.log('address', address);
        console.log('family', family);

        if (err) {
            return res.json({
                error: "invalid URL"
            });
        }
    })

    //dns.lookup(host, cb)
})

// Your first API endpoint
app.get('/api/hello', function(req, res) {
    res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
    console.log(`Listening on port ${port}`);
});