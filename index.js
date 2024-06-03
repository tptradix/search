import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import leak from './leaks.js';
import { getComment } from './comments.js';
import { createDiffieHellmanGroup } from 'crypto';

const app = express();
const PORT = 4880;

app.set('view engine', 'ejs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.set('views', path.join(__dirname, 'template'));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(express.static('template'));


app.get('/api', async (req, res) => {
    const phone = req.query.p;
    res.send(await leak(phone))
})

app.route('/')
    .get(async (req, res) => {
        res.render('index')
    })

app.route('/rew')
    .get(async (req, res) => {
        const q = req.query.p
        const phone = {phone: q}
        const data = await getComment(q)
        const commentsObject = data.reduce((obj, item, index) => {
            obj[index] = item;
            return obj;
        }, {});
        console.log(commentsObject)
        res.render('index', { phone : phone, data : commentsObject })
    })

app.listen(PORT, (err) =>  {
    if (err) {
        console.log(err);
    }
    else {
        console.log(PORT);
    }
});
