const say = require('say');
const express = require('express');
const socket = require("socket.io");
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: true, limit: '50mb' }));
app.use(express.static('public'))

function pythonloadfacerec() {
    console.log("sdfjhgs")
    let { PythonShell } = require('python-shell')
    let pyshell = new PythonShell(path.join(__dirname, "face_rec/") + 'script.py');


    pyshell.on('message', function (message) {
        say.speak(message);
    });
    pyshell.end(function (err, code, signal) {
        if (err) throw err;
        console.log('finished');
    });
}

app.post('/sendimg', (req, res) => {
    // console.log(req.body)
    data = req.body.data.rawdata.replace(/^data:image\/png;base64,/, "");
    type = req.body.data.type;
    if (type == 'ocr') {
        fs.writeFile(path.join(__dirname, "face_rec/") + "/images/out.png", data, 'base64', function (err) {
            if (!err) {
                var ocrdata = "";
                const Tesseract = require('tesseract.js');
                Tesseract.create({ langpath: "eng.traineddata" }).recognize("D:/Disk storage 2/Aadish jain/web designing/text-to-speech/face_rec/Images/out.png", 'eng')
                    .then(function (result) {
                        dt = result.text;
                        ocrdata = dt;
                        console.log("@#@#@#@#", ocrdata)
                        say.speak(ocrdata)
                    })
            }
        });
    }
    else if (type == 'fr') {
        fs.writeFile(path.join(__dirname, "face_rec/") + "/images/out.png", data, 'base64', function (err) {
            if (!err) {
                pythonloadfacerec();
            }
        });
    }
})
// say.export("sfsadf", 'Cellos', 0.75, 'public/new_file.wav', (err) => {
//     if (!err) {
//         console.log("file saved");
//     }
// });
const server = app.listen(1234, (err) => {
    if (!err) {
        console.log("server");
    }
})
var io = socket(server);
io.sockets.on('connection', function (socket) {
    fs.watchFile(fullPath, () => {
        var content = fs.readFileSync(fullPath);
        console.log('File Content is ' + content);
        socket.emit('new_audio', { data: content });
    });
});