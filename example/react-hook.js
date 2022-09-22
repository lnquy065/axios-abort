import {withAbort} from "../dist/mjs/axios-abort.js";
import axios from "axios";

withAbort(axios);



useEffect(() => {
    let promise = axios.get("https://google.com")

    promise.then().catch(error => {
        console.error(error)
    })

    return () => {
        promise.abort()
    };
}, []);
