const axios = require('axios');
const cheerio = require('cheerio');


class AmazonTracker {
    constructor(url) {
        this.url = url;
        this.document;

    }
    async getProductPage() {
        let [err, resp] = await axios({
            url: this.url,
            method: "get",
            headers: {
                "user-agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
            }
        }).then(data => [null, data]).catch(err => [err, null]);
        if (err) {
            console.log("Got Error from Amazon:", JSON.stringify(err));
            return Promise.reject(err);
        } else {
            this.document = cheerio.load(resp.data);
        }
    }
    getProductDetails() {
        let product = {};
        product.title = (this.document('#productTitle').text()).trim();
        product.image = this.document('.image.selected img').attr('data-old-hires');
        
        product.price = this.document('#priceblock_dealprice').text() || this.document('#priceblock_ourprice').text();
        /*if (!product.price) {
            product.price = this.document('#priceblock_dealprice').text();
        }*/
        return product;
    }
    getFormattedDetails(details) {
        if (details.price) {
            details.price = details.price.replace('₹', '');
            details.price = details.price.replace(',', '').trim();

        }
        return details;
    }
}


module.exports = AmazonTracker;
/*
let tracker = new AmazonTracker("https://www.amazon.in/Boat-Rockerz-400-Bluetooth-Headphones/dp/B01J82IYLW/ref=sr_1_6?crid=1H3OPVARHA8U9&keywords=bluetooth+headphones+wireless+with+mic&qid=1575176194&smid=A14CZOWI0VEHLG&sprefix=bluetooth+head%2Caps%2C373&sr=8-6");

tracker.getProductPage()
    .then(() => {
        let details = tracker.getProductDetails();
        let formattedDetails = tracker.getFormattedDetails(details);
        console.log("=======", formattedDetails)
    }).catch(e => {
        console.log("Failed:", JSON.stringify(e))
    });
*/