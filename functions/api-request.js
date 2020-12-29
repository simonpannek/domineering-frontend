const fetch = require("node-fetch");

exports.handler = async event => {
    const addr = "dom.simon.rest";

    const url = "http://" + addr + "/" + event.path.substring(event.path.lastIndexOf("/") + 1);

    const url_param = Object.keys(event.queryStringParameters).map(function(k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(event.queryStringParameters[k])
    }).join('&');

    console.log(url + "?" + url_param);

    return fetch(url + "?" + url_param).then(res => {
        return res.json();
    }).then(json => {
        return {
            statusCode: 200,
            body: JSON.stringify(json).replace(/[\u007F-\uFFFF]/g, function(chr) {
                return "\\u" + ("0000" + chr.charCodeAt(0).toString(16)).substr(-4)
            })
        };
    }).catch(err => {
        console.log(err);
        return {
            statusCode: 200,
            body: ""
        };
    });
}
