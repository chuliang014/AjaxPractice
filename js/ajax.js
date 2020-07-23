var $ = {
    ajax: function (options) {
        var xhr = null,
            url = options.url,
            method = options.method || 'GET',
            async = typeof options.async === "undefined" ? true : options.async,
                data = options.data || null,
                params = '',
                callback = options.success,
                error = options.error;

        //transform the data to formal format
        if (data) {
            for (var i in data) {
                params += i + '=' + data[i] + '&';
            }
            params = params.replace(/&$/, "");
            // console.log(params);
        }

        //if GET, need to add '?' to url directly
        if (method === 'get') {
            url += '?' + params;
        }
        if (typeof XMLHttpRequest != "undefined") {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                    callback && callback(JSON.parse(xhr.responseText));
                } else {
                    error && error();
                }
            }
        }
        //create and send request
        xhr.open(method, url, async);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(params);
    }
}