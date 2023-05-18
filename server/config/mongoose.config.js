const mongoose = require('mongoose');

const dbName = process.env.DB;
const username = process.env.ATLAS_USERNAME;
const pw = process.env.ATLAS_PASSWORD;

const uri = `mongodb+srv://${username}:${pw}@kluster.0wcravq.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(uri)
    .then(() => console.log(`✅ Established a connection to the ${dbName} database ✅`))
    .catch(err => console.log("🛑 Something went wrong when connecting to the database 🛑", err));