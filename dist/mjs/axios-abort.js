/**
 * Create AbortController
 * @param config
 * @returns {AbortController}
 */
function initController(config) {
    let controller;
    if (!config.signal) {
        // skip creating signal if already existed
        controller = new AbortController();
        config.signal = controller.signal;
    }
    return controller;
}

/**
 * Consider if method includes data
 * @param method
 * @returns {boolean}
 */
function withData(method) {
    return ["post", "put", "patch"].includes(method);
}

/**
 * Apply abort controller for all request
 * @param axiosInstance
 * @param options
 */
export default function withAbort(
    axiosInstance,
    options = {
        methods: ["delete", "get", "head", "options", "post", "put", "patch"],
    }
) {
    options.methods.forEach((method) => {
        const orgFunc = axiosInstance[method];
        axiosInstance[method] = function (url, dataOrConfig, config) {
            const isWithData = withData(method);
            config = (isWithData ? config : dataOrConfig) || {};
            const controller = initController(config);
            const promise = isWithData
                ? orgFunc(url, dataOrConfig, config)
                : orgFunc(url, config);
            if (controller) {
                promise.abort = () => controller.abort();
            }
            return promise;
        };
    });
}
