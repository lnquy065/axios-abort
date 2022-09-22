const withAbort = require('../dist/cjs/axios-abort')
const axios = require("axios");

withAbort(axios);

let promise = axios.get("https://google.com")

promise.then().catch(error => {
        console.error(error)
    })

promise.abort()