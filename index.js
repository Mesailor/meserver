const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Message = require('./models/messages');
const timeHeader = require('./middleware/time-header');

app.use(express.json());
app.use('/', timeHeader);

app.get('/', async (req, res) => {
    const messages = await Message.find();
    res.send(messages);
});

app.post('/', async (req, res) => {
    const message = new Message(req.body);
    await message.save();
    res.send(message);
});

app.listen(3000, () => {
    console.log('Listening on port 3000...');
});

const dbPath = 'mongodb://193.233.232.74:27017/mesailor';
async function connectToDb() {
    try {
        await mongoose.connect(dbPath);
        console.log(`Connected to ${dbPath}`);
    }
    catch (error) {
        console.log(error);
    }
}
connectToDb();