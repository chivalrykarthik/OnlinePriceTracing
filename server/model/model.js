const { trackers } = require("./dbConfig.js");
let model = {};

model.createTracker = function (req) {
    let curDate = new Date();
    let query = {
        "productName": req.productName,
        "productImage": req.productImage,
        "url": req.url,
        "startPrice": req.startPrice,
        "startDate": curDate,
        "todayPrice": req.todayPrice,
        "priceList": [{
            date: curDate,
            price: req.todayPrice
        }]
    };
    let trackerObj = new trackers(query);
    return trackerObj.save();
};
model.getTrackerList = function getDashboard() {
    return trackers.find({});
};

model.getTrackerById = function getDashboard(id) {
    return trackers.find({ _id: id });
};



model.updateTracker = function (queryObj) {
    const curDate = new Date();
    return trackers.update({ "_id": queryObj.id }, {
        $push: {
            "priceList": [{
                date: curDate,
                price: queryObj.todayPrice
            }]
        },
        $set: {
            "todayPrice": queryObj.todayPrice
        }
    });

};
model.deleteTracker = function(id){
    return trackers.deleteOne({_id:id});
}
/*
model.deleteQuestions = function (queryDto, cb) {
    questions.deleteOne({ "questionID": parseInt(queryDto.questionID) }, cb);
};*/

module.exports = model;