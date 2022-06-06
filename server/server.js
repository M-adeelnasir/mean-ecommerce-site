const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config({ path: "./config/config.env" })
const connectDB = require('./config/db')




const app = express();

app.use(express.json());
app.use(cors())
if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'))
}

connectDB()



const PORT = process.env.PORT || 5000

const server = app.listen(PORT, console.log(`Backend is listing in ${process.env.NODE_ENV} at port ${PORT}`))
process.on('unhandledRejection', (err, promises) => {
    console.log("ERROR ===>", err.message);
    server.close(() => process.exit(1))
})