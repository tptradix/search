import express from 'express';
import { leak } from './leaks.js';

const app = express();
const PORT = 4880;

app.get('/api', async (req, res) => {
    const phone = req.query.p;
    res.send(await leak(phone))
})

app.listen(PORT, (err) =>  {
    if (err) {
        console.log(err);
    }
    else {
        console.log(PORT);
    }
});
