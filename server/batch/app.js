const { getTrackerList, updateTracker } = require('./../model/model.js');
const async = require('async');
const AmazonTracker = require('./../util/amazonTracker.js');
const logger = require('./logger.js');
class ModelWrapper {
    async getTrackerList() {
        logger.silly("Requsting product list from DB");
        let [err, trackerList] = await getTrackerList().then(value => [null, value]).catch(err => [err, null]);
        if (err) {
            logger.error("GetTrackListErr:" + JSON.stringify(err));
            return Promise.reject(err);
        }
        logger.silly("Got respons from DB");
        if (trackerList && trackerList.length) {
            logger.debug("ResponseLength:", trackerList.length);
            return Promise.resolve(trackerList);
        }
        return Promise.resolve([]);
    }
}

let handleResponse = (trackerList) => {
    logger.silly("Started process products one by one");
    let updateTrackerModel = async (tracker, callback) => {
        logger.silly('Updating the table:');
        const queryObj = {
            id: tracker.id,
            todayPrice: tracker.details.price
        };
        const [err, resp] = await updateTracker(queryObj)
            .then(v => [null, v])
            .catch(e => [e, null]);
        if (err) {
            logger.error('Got error while updating DB:' + JSON.stringify(err));
            return callback(err);
        }

        if (resp && resp.nModified) {
            logger.info(`Latest price is updated for this prodcut.  ${queryObj.todayPrice || "Out of stock"} `);
        } else {
            logger.info("No change in the price for this product.");
        }
        return callback(null);
    }
    let iterator = (tracker, next) => {
        logger.info(`Updating ${tracker.productName} details:`);
        logger.silly("Creating Amazon instance:");
        let amazonTracker = new AmazonTracker(tracker.url);
        logger.silly("Requesting product details from Amazon:");
        amazonTracker.getProductPage()
            .then(() => {
                logger.silly("Got response from Amazon:");
                logger.silly("Processing the product details:");
                let details = amazonTracker.getProductDetails();
                logger.silly("Formatting data:");
                let formattedDetails = amazonTracker.getFormattedDetails(details);
                updateTrackerModel({ id: tracker._id, details: formattedDetails }, next);

            }).catch(e => {
                return next(e)
            });
    }, finalCB = (err) => {
        if (err) {
            logger.error("Error while processing the response:" + JSON.stringify(err));
            return process.exit(-1);
        }
        logger.info("Processed the records and updated the latest price");
        process.exit(-1);
    }
    async.eachSeries(trackerList, iterator, finalCB);
}
let modelWrapper = new ModelWrapper();
modelWrapper.getTrackerList()
    .then(handleResponse.bind(modelWrapper));
