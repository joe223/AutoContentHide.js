/**
 * 图文详情过长则隐藏部分内容 AutoContentHide.js
 * @author Joe223
 * @2016/2/25 16:00
 * @link https://www.github.com/joe223
 */
define( [], function(){
    "use strict"
    function AutoContentHide(config){
        this.LIMIT_PAR_LEN_MIN = config.LIMIT_PAR_LEN_MIN || 1;          // 可以从第几段开始隐藏 ,>= 1
        this.LIMIT_PAR_LEN_MAX = config.LIMIT_PAR_LEN_MAX || 1;          // 至多从第几段开始隐藏_MAX
        this.LIMIT_PROPORTION = config.LIMIT_PROPORTION || 0;            // 内容与屏幕长度比例 阀值
        this.LIMIT_PAR = config.LIMIT_PAR || 0;                          // 段落长度阀值(内容字数长度),超过该比例则启动触发隐藏开关
        this.BREAK = config.BREAK || false;                              // 段落是否可被拆开
        this.BUTTON_CONTENT = config.BUTTON_CONTENT || "查看全文";

    }
    AutoContentHide.prototype = {
        AutoHide: function (contentId){

            // console.log('init!' + contentId);

            var content = document.getElementById(contentId);
            var contents = content.children;
            var contentLen = contents.length;
            var clientHeight = document.documentElement.clientHeight;
            var contentHeight = content.clientHeight;

            // console.log(content+",clientHeight:"+clientHeight+",contentHeight:"+contentHeight+",len"+contents.length);

            // 当内容总长度超过 LIMIT_PROPORTION * clienHeight 隐藏剩下内容
            // 设置阀值
            for(var j = 0; j < contentLen; j++){

                if(contents[j].innerText.length <= this.LIMIT_PAR){

                    // console.log(contents[j].innerText.length+"\n");

                    if(this.LIMIT_PAR_LEN_MIN < this.LIMIT_PAR_LEN_MAX){
                        this.LIMIT_PAR_LEN_MIN ++;
                    }
                }else{
                    this.BREAK && this.LIMIT_PAR_LEN_MIN ++;// 如果段落可被拆开，长度超出阀值的当前一段开始隐藏，当前段落隐藏部分
                    console.log("此段超出阀值:" + j);
                    // console.log("this.LIMIT_PAR_LEN_MIN:" + this.LIMIT_PAR_LEN_MIN);
                    break;
                }
            }

            // console.log("this.LIMIT_PAR_LEN:"+this.LIMIT_PAR_LEN_MIN);

            if (contentHeight / clientHeight >= this.LIMIT_PROPORTION){

                var hideContent = document.createElement('div');
                var showBtn = document.createElement('a');
                var span = document.createElement('span');

                if(this.BREAK && contents[this.LIMIT_PAR_LEN_MIN-2].innerHTML.length > this.LIMIT_PAR){
                    contents[this.LIMIT_PAR_LEN_MIN-2].setAttribute("style","max-height:100px;min-height: 50px;overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 5;-webkit-box-orient: vertical;");// 隐藏部分前一段落隐藏部分
                    console.log("第：" + (this.LIMIT_PAR_LEN_MIN-2) + "段被裁断");
                }

                // 将需要隐藏的元素放置于 hiddenContent 中
                for (var i = this.LIMIT_PAR_LEN_MIN; i <= contentLen; i++){
                    hideContent.appendChild(contents[this.LIMIT_PAR_LEN_MIN-1]);
                    // console.log("this.LIMIT_PAR_LEN_MIN-1:"+this.LIMIT_PAR_LEN_MIN-1);
                }

                hideContent.style.cssText = "display:none;";
                content.appendChild(hideContent);
                showBtn.innerHTML = this.BUTTON_CONTENT;
                showBtn.setAttribute("class","show-btn");
                showBtn.appendChild(span);

                var _this = this;
                // show-btn 按钮响应 ,显示余下内容
                showBtn.addEventListener('click',function(){
                    hideContent.style.display = "block";
                    showBtn.style.display = "none";
                    contents[_this.LIMIT_PAR_LEN_MIN-1].removeAttribute("class"); // 不再显示 “ 查看全文按钮 ”
                    console.log("contents[_this.LIMIT_PAR_LEN_MIN-1]");
                    console.log(contents[_this.LIMIT_PAR_LEN_MIN-1]);
                    _this.BREAK && contents[_this.LIMIT_PAR_LEN_MIN - 2].removeAttribute("style");
                });

                content.appendChild(showBtn, hideContent);
            }
        }
    }
    return window.AutoContentHide = AutoContentHide;
});
