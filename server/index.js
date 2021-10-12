const express = require('express');
const path = require('path');
const Rollbar = require('rollbar');

const rollbar = new Rollbar( {
    accessToken: '',
    captureUncaught: true,
    captureUnhandledRejections: true
});

const app = express();

app.use(express.json());
app.use(rollbar.errorHandler());


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
    rollbar.info('html file served successfully');
});

app.use('/css', express.static(path.join(__dirname, '../public/stylesheet.css')));

const port = process.env.PORT || 4404;

app.listen(port, () => { console.log(`Server is up on ${port}`)});
