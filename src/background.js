import $ from 'jquery';
const debug = process.env.NODE_ENV !== 'production';
const host = debug ? '' : 'http://api.hikingnet.cn/index.php';

var ADV_LIST_URL = host + '/Aplus/advList';
var POST_ARTICLE_URL = host + '/Aplus/submitArticle';
var CHECK_BINDING_URL = host + '/Aplus/isBind';

function App() {
    this.init();
}

App.prototype = {
    init: function () {
        this.handleEvent();
    },
    handleEvent: function () {
        var self = this;
        chrome.extension.onRequest.addListener(
            function (request, sender, sendResponse) {
                switch (request.action) {
                    case 'getAdList':
                        self.getAdList(request.data,function (res) {
                            sendResponse(res);
                        });
                        break;
                    case 'syncArticle':
                        self.syncArticle(request.data,function (res) {
                            sendResponse(res);
                        });
                        break;
                    case 'checkBinding':
                        self.checkBinding(request.data,function (res) {
                            sendResponse(res);
                        });
                        break;
                    default:
                        sendResponse({});
                }
            });
        return this;
    },
    getAdList: function (data,callback) {

        $.ajax({
            type: "POST",
            url: ADV_LIST_URL,
            data:data,
            dataType: "json",
            success: function (res) {
                callback && callback(res);
            }
        });
    },
    syncArticle: function (data,callback) {
        $.ajax({
            type: "POST",
            url: POST_ARTICLE_URL,
            data:data,
            dataType: "json",
            success: function (res) {
                callback && callback(res);
            }
        });
    },
    checkBinding: function (data,callback) {
        $.ajax({
            type: "POST",
            url: CHECK_BINDING_URL,
            data:data,
            sync:true,
            dataType: "json",
            success: function (res) {
                callback && callback(res);
            }
        });
    }

    
}

new App();