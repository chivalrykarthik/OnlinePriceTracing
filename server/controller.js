const { createTracker, updateTracker, getTrackerList, getTrackerById } = require('./model/model.js');



class ManageTracker {
    addTracker(url) {
        let startPrice = 1000;
        let query = {
            "url": url,
            "startPrice": startPrice,            
            "todayPrice": startPrice
        };
        return createTracker(query);
    }

    getTrackerList(){
        return getTrackerList();
    }

    getTrackerById(id){
        return getTrackerById(id);
    }
}

module.exports = ManageTracker;