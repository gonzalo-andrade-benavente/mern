require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');


const app = express();
const client = new MongoClient(process.env.DB_URL);
const database = process.env.DB_NAME || 'test';

app.use( express.json() );
app.use( express.urlencoded() );


app.get('/', (req, res) => {

    res.json({
        msg: '/'
    });
});

app.get('/api/department', async (req, res) => {
    
    try {
        //await client.connect();
        await client.connect();
        const db = client.db(database);
        const collection = db.collection('Department').find({}).toArray( (err, result) => {
            if (err) {
                console.log(err);
            }

            res.json({
                collection: result
            });

        });
        
    } catch (err) {
        console.log(err);
    }

});


const connectDB = async () => {
    await client.connect();
    db = client.db('test');
}


app.listen(8081, () => {
    console.log(`Server listening in port 8081`);
});



