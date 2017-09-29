"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by asus on 2017/7/18.
 */
var http = require("http");
var url = require("url");
var querystring = require("querystring");
var constant_1 = require("./constant");
var respLogger = require('./utils').respLogger
var Dispatcher = (function () {
    function Dispatcher() {
    }
    Dispatcher.prototype.get = function (path, callback) {
        var urlObject = url.parse(path);
        var option = {
            method: 'GET',
            hostname: urlObject.hostname,
            port: urlObject.port,
            path: urlObject.path,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        };
        var dispose = function (response) {
            var body = '';
            response.on('data', function (data) {
                body += data;
            });
            response.on('end', function () {
                // console.log(body);
                respLogger(urlObject.path, body)
                callback(body);
            });
        };
        var req = http.request(option, dispose);
        req.end();
    };
    Dispatcher.prototype.post = function (path, data, callback, contentType) {
        if (contentType === void 0) { contentType = 'FORM'; }
        var urlObject = url.parse(path);
        var contents;
        var headers = {
            "content-type": constant_1.CONTENT_TYPE[contentType] + "; charset=UTF-8"
        };
        if (contentType === 'JSON') {
            contents = JSON.stringify(data);
        }
        else {
            contents = querystring.stringify(data);
            Object.assign({
                "Content-Length": contents.length,
            }, headers);
        }
        var option = {
            method: 'POST',
            hostname: urlObject.hostname,
            port: urlObject.port,
            path: urlObject.path,
            headers: headers
            // headers: {// 必选信息
            //     "Content-Type": `${CONTENT_TYPE[contentType]}; charset=UTF-8`,
            //     "Content-Length": contents.length, // 请求长度, 通过上面计算得到
            // }
        };
        var dispose = function (response) {
            var body = '';
            response.on('data', function (data) {
                body += data;
            });
            response.on('end', function () {
                // console.log(body);
                respLogger(urlObject.path, body)
                callback(body);
            });
        };
        var req = http.request(option, dispose);
        req.write(contents); //发送内容
        req.end();
    };
    return Dispatcher;
}());
exports.Dispatcher = Dispatcher;
//# sourceMappingURL=dispatcher.js.map
