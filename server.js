const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const port = 3001;

//config
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));

// connect to db

mongoose.connect('mongodb+srv://aldobesma:BJrSaNJoxSz7s2Tm@cluster0.yr0w9xi.mongodb.net/newItems');


// data schema
const itemSchem = {
    title: String,
    description: String
}


//data model
const Item = mongoose.model('Item', itemSchem);

//read route
app.get('/items', (req, res) => {
    Item.find()
    .then((item) => res.json(item))
    .catch((err) => res.status(404).json("error", + err))
})

//create route

app.post('/newItem', (req, res) => {
    const newItem = new Item(
        {
            title: req.body.title,
            description: req.body.description
        }
    );
    newItem.save()
    .then(item => console.log(item))
    .catch(err => res.status(400).json("Error" + err))
    
})

//delete route

//update route

app.listen(port, function(){
    console.log("Exxpress is running");
});
