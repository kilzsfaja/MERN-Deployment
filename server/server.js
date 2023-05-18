const express = require('express');
const cors = require('cors');
const app = express();

// ---- middleware ----
app.use(cors())
app.use(express.json(), express.urlencoded({ extended: true }));


require('dotenv').config()
const port = process.env.PORT

require("./config/mongoose.config")

require("./routes/pirates.routes")(app)


app.listen(port, () => console.log(`Listening on port ${port} for REQuests to RESpond to.`));
