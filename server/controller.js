const { createTracker, updateTracker, getTrackerList, getTrackerById,deleteTracker } = require('./model/model.js');
const AmazonTracker = require('./util/amazonTracker.js');


class ManageTracker {
    async addTracker(url) {
        let tracker = new AmazonTracker(url); 
        let result = await tracker.getProductPage()
            .then(() => {
                let details = tracker.getProductDetails();
                let formattedDetails = tracker.getFormattedDetails(details);
                console.log(formattedDetails);                
                let query = {
                    "productName": formattedDetails.title,
                    "productImage": formattedDetails.image,
                    "url": url,
                    "startPrice": formattedDetails.price,
                    "todayPrice": formattedDetails.price
                };
                console.log("query===",query);
                return createTracker(query);
            }).catch(e => {
                console.log("Failed:", JSON.stringify(e));
                return Promise.reject(e);
            });
            return result;
    }

    getTrackerList() {
        return getTrackerList();
    }

    getTrackerById(id) {
        return getTrackerById(id);
    }

    deleteTracker(id){
        return deleteTracker(id);
    }
}

module.exports = ManageTracker;