const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({extended: true}))

//middlewares
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/users.routes'));

const PORT = config.get('port') || 4228;

//create db, init models. After start method will come main loop (networking + client handling).
async function start(){
    try{
        await mongoose.connect(config.get('dbUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(4228, () => console.log(`App execution started on port ${PORT}...`));

    } catch (e) {
        await mongoose.disconnect();
        console.log('Server Error', e.message);
        process.exit(1);
    }
}

start();

