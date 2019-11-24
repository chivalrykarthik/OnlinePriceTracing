const prompts = require('prompts');
let ManageTracker = require('./controller.js')
const quitTimeout = 0;
const jsonDB = 'source.json';

let manageTracker = new ManageTracker();
const createNewProduct = async () => {
    const { url } = await prompts({
        type: "text",
        name: "url",
        message: "Enter the URL to track:"
    });
    const [err, result] = await manageTracker.storeURL(url)
        .then(resp => [null, resp])
        .catch(e => [e, null]);
    if (err) {
        console.log('Cannot add the URL:', err);
    } else {
        console.log("Successfully created");
    }
    init();
};


const landing = async () => {
    console.log("1. List Products");
    console.log("2. Enter new Product");
    console.log("3. Quit");
    const { option } = await prompts({
        type: "number",
        name: "option",
        message: "Enter your choice"
    });
    if (option === 1) {
        getProductList();
    }
    else if (option === 2) {
        createNewProduct().catch(e => console.log("Not able to create:", e));
    } else if (option === 3) {
        console.log("Closing the App...");
        setTimeout(process.exit, quitTimeout, -1);
    } else {
        init();
    }
};

function init() {
    console.log("called Init:")
    landing().catch(e => {
        console.log("Got some error");
        console.log(e);
    });
}


init();