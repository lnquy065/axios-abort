# axios-abort

Canceling Axios Request Promises with no code changes and zero-configuration 💁

Starting from v0.22.0 [Axios](https://axios-http.com/docs/cancellation) supports [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) to cancel requests. But it requires lots of [steps](https://axios-http.com/docs/cancellation) to handle AbortController. Now with `axios-abort`, you can implement AbortController with no code changes and configuration as well. 

## Installation

`npm install axios-abort --save`

Notice: Make sure you are using Axios v0.22.0 or higher

## Usage

In your axios configuration file:

**For global configuration:**

```javascript
import axios from "axios";
import withAbort from "axios-abort";

withAbort(axios);
```


**For instance configuration:**

```javascript
import axios from "axios";
import withAbort from "axios-abort";

const axiosAbort = axios.create()
withAbort(axiosAbort);
```

Now, all axios request promises will contain `abort()` function. You can use it to abort a request.

#### Node.js
```javascript
let promise = axios.get("https://google.com")

promise.then().catch(error => {
        console.error(error) // => error due to abort
    })

promise.abort()
```

#### React hook
```javascript
useEffect(() => {
    let promise = axios.get("https://google.com")

    promise.then().catch(error => {
        console.error(error) // => error due to abort
    })

    return () => {
        promise.abort()
    };
}, []);

```

## Supported Methods

`axios-abort` supports methods below:

```javascript
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.options(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])
```

You also can customize supported methods list via `options` parameter:

```javascript
withAbort(axios, {
    methods: ['get']    // only add abort controller into GET method
})
```

## License

MIT © [lnquy065](https://github.com/lnquy065)
