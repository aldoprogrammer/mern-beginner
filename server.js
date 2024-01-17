const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const port = 3001;

// config
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// connect to db
mongoose.connect('mongodb+srv://aldobesma:BJrSaNJoxSz7s2Tm@cluster0.yr0w9xi.mongodb.net/newItems');


// data schema
const itemSchema = {
    title: String,
    description: String,
};

// data model
const Item = mongoose.model('Item', itemSchema);

// read route
app.get('/items', (req, res) => {
    Item.find()
        .then((items) => res.json(items))
        .catch((err) => res.status(404).json("Error" + err));
});

// create route
app.post('/newItem', (req, res) => {
    const newItem = new Item({
        title: req.body.title,
        description: req.body.description,
    });
    newItem.save()
        .then(item => res.json(item))
        .catch(err => res.status(400).json("Error" + err));
});

// delete route
app.delete('/delete/:id', (req, res) => {
    Item.findByIdAndDelete(req.params.id)
        .then(item => res.json(item))
        .catch(err => res.status(400).json("Error" + err));
});

// update route
app.put('/put/:id', (req, res) => {
    Item.findByIdAndUpdate(req.body.id, req.body, { new: true })
      .then(item => res.json(item))
      .catch(err => res.status(400).json("Error" + err));
})

app.listen(port, function() {
    console.log("Express is running");
});
