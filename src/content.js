import './assets/css/content.less';
import $ from 'jquery';
import Vue from 'vue';
import {template} from 'template'
import asideHtml from './tpl/aside.html'
import dialogHtml from './tpl/dialog.html';
import insertHtml from './tpl/insert.html';
import commonHtml from './tpl/common.html';
import insertScript from './tpl/insert.txt';
import 'layer'


function App() {
    this.$aside;
    this.myVue;
    this.msgList = [];
    this.data;  //公众号信息
    this.isBinding
    this.init();
}
App.prototype = {
    init: function() {
        var self = this;

        $(function() {
            setTimeout(function(){
                //处理公共事务
                self.handleCommon().syncData().checkBinding(function(){
                    self.$aside = $('#body .appmsg_tpl_area .scroll-content');
                    if(self.$aside.length){
                        //素材编辑
                        self.insertMyCode().initViewModal();
                    }else{
                        //已发送页面
                        self.isBinding && self.historyPage();
                    }
                });


            },100)
        })
    },
    handleCommon:function(){
        var self = this;
        
        //添加公共代码
        $('body').append(commonHtml);

        var $bridge = $('#j-taBridge');
        $bridge.on('syncData',function(){
            self.data = JSON.parse($(this).val());
        })
        return this;
    },
    syncData:function(){
        var $bridge = $('#j-taBridge');
        if($bridge.length){
            var customEvent = document.createEvent('Event');
            customEvent.initEvent('syncData', true, true);
            document.getElementById('j-taBridge').dispatchEvent(customEvent);
        }
        return this;
    },
    checkBinding:function(callback){
        var self = this;
        self.sendExtensionRequest({action:'checkBinding',data:{wechatId:self.data.user_name}},function(res){
            self.isBinding = res.status;
            callback && callback();
        })
        return this;
    },
    historyPage:function(){
        var $item = $('#masslist').find('.appmsgSendedItem'),
            self = this;

        $item.each(function(i){
            var $this = $(this);
            var reg = new RegExp('\\[.+?\\]',"g");
            var url = $this.find('a.title_wrp').attr('href'),
                title = $this.find('.title').text().replace(reg,""),
                read_num = $this.find('.desc span').eq(0).text().split(' ')[1],
                like_num = $this.find('.desc span').eq(1).text().split(' ')[1],
                publish_time = $this.closest('.mass_item').find('.mass_time').text();

                self.msgList.push({
                    title:title,
                    url:url,
                    read_num:read_num,
                    like_num:like_num,
                    publish_time:publish_time
                })
            $(this).append('<div class="mt15"><span data-index="'+ i +'" class="j-taSyncBtn btn btn_input btn_primary"><button type="button">同步广告结算数据</button></span></div>')
        });

        $(document).on('click','.j-taSyncBtn',function(){
            var index = $(this).data('index');
            var data = $.extend(true,self.msgList[index],{
                channel_id:self.data.user_name
            });
            console.log(data);
            layer.confirm('确认同步该文章访问数据到 <a href="http://www.taoooa.com" target="_blank" >淘A网</a>？<p class="red">注意：请确保该文章已插入淘A广告图片！</p>', {
                title:'淘A网互选广告',
                btn: ['确认','取消']
            }, function(){
                self.sendExtensionRequest({action:'syncArticle',data:data},function(res){
                    if(res.status){
                        layer.msg('同步成功！');
                    }else{
                        return layer.msg(res.msg);
                    }
                });
                
            }, function(){

            });
        })
    },
    sendExtensionRequest:function(prams,callback){
       // prams => {action:'',data:{}}
        chrome.extension.sendRequest(prams, function(res) {
           callback(res);
        });
    },
    initViewModal: function() {
        var self = this;

        self.myVue = new Vue({
            el: '#j-taAside',
            data: {
                user:{},
                adList:[],
                html:''
            },
            watch:{
                html:function(newVal,oldVal){
                    this.dispatchEvent();
                }
            },
            methods: {
                showAdList:function(){
                    var that = this;
                    var render = template.compile(dialogHtml);
                    var index = self.dialogIndex = layer.open({
                        type: 1,
                        title:'插入广告 ',
                        area: ['710px', '540px'], //宽高
                        content: render(that.$data)
                    });
                    
                    self.initDialogViewModal(index,that.adList)
                    
                },
                dispatchEvent:function(){
                    setTimeout(function(){
                        var customEvent = document.createEvent('Event');
                        customEvent.initEvent('insertHtml', true, true);
                        document.getElementById('j-editorAdTpl').dispatchEvent(customEvent);
                    },100)
                }
            },
            created:function(){
                //预读广告列表
                self.sendExtensionRequest({action:'getAdList',data:{wechatId:self.data.user_name}},function(res){
                    if(res.status){
                        self.myVue.adList = res.data;
                    }else{
                        return layer.msg('请先登录淘A广告助手哦~');
                    }
                });
            }
        })

        return this;
    },
    initDialogViewModal:function(index, adList){
        var self = this;

        var data = adList.map(function(item,index){
            item.selected = false;
            return item;
        })

        new Vue({
            el: '#j-taAdDialog',
            data: {
                adList:data,
                selected:[],
                selectedIndex:''
            },
            watch:{
                adList:function(newVal,oldVal){
                    // this.selected = this.adList.filter(function(item){
                    //     return item.selected;
                    // });
                }
            },
            methods: {
                toggleSelected:function(index){
                    this.selectedIndex = this.selectedIndex === index ? '' : index;
                    //this.$set(this.adList,index,$.extend({},this.adList[index],{selected:!this.adList[index].selected}))
                },
                confirm:function(){
                    var that = this,
                    render = template.compile(insertHtml);

                    if(that.selectedIndex === ''){
                        return layer.msg('请选择要插入的广告！');
                    }

                    var item = that.adList[that.selectedIndex];
                    self.uploadImg(item.advimg,function(res){
                        var data = [{
                            img: res.url,
                            format: res.img_format,
                            advurl: item.advurl,
                            advimg: item.advimg,
                            name: item.name,
                            txt:item.advertising_guide
                        }];

                        var html = render({selected:data});
                        self.myVue.html = html;
                    })

                    layer.close(index);
                    var tipIndex = layer.confirm('文章群发完成后请到<span class="red">【群发功能】</span>-><span class="red">【已发送】</span>页面中定期同步广告效果数据，该数据将作为广告费结算依据！', {
                        btn: ['确认','取消'],
                        title:'广告数据结算提示'
                    }, function(){
                        layer.close(tipIndex)
                    });
                },
                cancel:function(){
                    self.myVue.html = '';
                    layer.close(index);
                }
            },
            created:function(){
                var that = this; 
                //更新广告数据
                self.sendExtensionRequest({action:'getAdList',data:{wechatId:self.data.user_name}},function(res){
                    if(res.status){
                        self.myVue.adList = res.data;
                    }else{
                        return layer.msg('请先登录淘A广告助手哦~');
                    }
                });
                var render = template.compile(insertHtml);
                var html = render(that.$data);
                self.myVue.html = html;
                
            }
        })

    },
    uploadImg:function(url,success,fail){
        var self = this;

        $.ajax({
            type: "POST",
            url: "https://mp.weixin.qq.com/cgi-bin/uploadimg2cdn?lang=zh_CN&token=" + self.getUrlParam('token'),
            data: {
                imgurl:url,
                t:'ajax-editor-upload-img'
            },
            dataType: "json",
            success: function (res) {
                if(res.errcode== 0){
                    success(res)
                }
            }
        });
       

    },
    getUrlParam: function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); 
      var r = window.location.search.substr(1).match(reg); 
      if (r != null) return unescape(r[2]); return null; 
    },
    insertMyCode:function(){
        //插入侧边菜单
        this.$aside.append(asideHtml);
        
        setTimeout(function(){
            $('body').append(insertScript);
        },100)
        
        //fuck the xmt
        // setTimeout(function(){
        //     var $xmt = $('.xmt-btn-group');
        //     if($xmt.length){
        //         $xmt.parent().find('.appmsg_container_bd').eq(0).removeAttr('style');
        //     }        
        // },800)

        return this;
    }
}
new App();