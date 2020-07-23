//Setup Project
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const app = express();
const shortUrl = require('./models/shortUrl');
//Setup DB
mongoose.connect(process.env.DATABASE_URL,{ 
    useNewUrlParser: true , 
    useUnifiedTopology:true
})
const db = mongoose.connection;
db.on('error', (error) => (console.log(error)));
db.on('open', () => console.log("Connecting to Database ..."));

//Project
app.set('view engine','ejs');

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));

app.get('/', async (req, res) => {
    const shortUrls = await shortUrl.find();
    res.render('index',{
        shortUrls: shortUrls
    });
})

app.post('/shortUrls', checkExisted, async (req, res) => {
    await shortUrl.create({
        fullUrl:req.body.fullUrl,
        shortUrl:req.body.shortUrl
    })
    res.redirect('/');
})

app.get('/:shortUrl', async (req, res) =>{
    const url = await shortUrl.findOne({
        shortUrl:req.params.shortUrl
    });

    if(url == null) {
        return res.sendStatus(404);
    }
    res.redirect(url.fullUrl);
    
})
app.post('/delete', async (req, res) =>{
    let shortUrlFromClient = req.body.url;
    let url = await shortUrl.findOne({
        shortUrl:shortUrlFromClient
    });
    try {      
        await url.remove();
        let allUrls = await shortUrl.find();
        res.json({allUrlsLeft: allUrls})
    } catch (err) {
        res.status(404).json({message:err.message});
    }
})
async function checkExisted(req, res, next){
    try {
        let shortUrlFromClient = req.body.url;
        let url = await shortUrl.findOne({
            shortUrl:shortUrlFromClient
        });
        if(url){
            return res.status(404).json({error:"showAlert"})
        }
    } catch (err) {
        return res.status(500).json({message:err.message});
    }
    next();
}
app.listen(port, () =>{
    console.log(`Server listening on https://localhost:${port}`);    
});
