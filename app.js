const { exec } = require('child_process');
var yourscript = exec('/bin/sh ./checking_if_variables_are_set.sh',
        (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log(`HTTP_PORT not found. Set the env variable to proceed`);
                console.log();
		process.exit(9);
            }
        });

const express = require('express');
const bodyParser = require('body-parser');
var QRCode = require('qrcode');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {    
    res.render('index',{src:''})
})

app.post('/', (req, res) => {
    let data = req.body.data;
    QRCode.toDataURL(data, function (err, url){
        res.render('index',{src: url});
    })
})

app.listen (process.env.PORT || 8080, function () {
    console.log('listening on', process.env.PORT || 8080);
})
