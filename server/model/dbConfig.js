const mongoose = require("mongoose");
//const crypto = require("crypto");
const Schema = mongoose.Schema;
const secret = "1234678";
//const dbConn = (process.argv && process.argv[2]) ? process.argv[2] : "localhost";
const dbConn = "localhost";
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${dbConn}:27017/onlineTracking`,mongoOptions);

let db = mongoose.connection;
db.on("error", () => {
    console.log("Cannot establish db connection");
});


const trackerSchema = new Schema({
    "productName":{type:String,required:true},
    "productImage":{type:String,required:true},
    "url": { type: String, required: true },
    "startPrice": { type: Number, required: true },
    "startDate": { type: Date, default: Date.now, required: true },
    "todayPrice": { type: Number },
    "priceList": [{
        date: { type: Date, default: Date.now },
        price: { type: Number, require: true }
    }]
});


const trackers = mongoose.model("trackers", trackerSchema);


module.exports = { trackers };