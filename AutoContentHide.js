/**
 * 图文详情过长则隐藏部分内容 AutoContentHide.js
 * @author Joe223
 * @2016/2/25 16:00
 */

function AutoContentHide(config){
    this.LIMIT_PAR_LEN_MIN = config.LIMIT_PAR_LEN_MIN || 1;         // 可以从第几段开始隐藏 ,>= 1
    this.LIMIT_PAR_LEN_MAX = config.LIMIT_PAR_LEN_MAX;              // 最多从第几段开始隐藏_MAX
    this.LIMIT_PROPORTION = config.LIMIT_PROPORTION;                // 内容与屏幕长度比例 阀值
    this.LIMIT_PAR = config.LIMIT_PAR;                              // 段落长度阀值(内容字数长度)
    // this.contentId = config.contentId;                           // 被隐藏的元素 id

    this.AutoHide = function (contentId){
        
        // console.log('init!' + contentId);
        
        var content = document.getElementById(contentId);
        var contents = content.children;
        var contentLen = contents.length;
        var clientHeight = document.documentElement.clientHeight;
        var contentHeight = content.clientHeight;
        
        console.log(content+","+clientHeight+","+contentHeight+",len"+contents.length);
        
        // 当内容总长度超过 2.5 * clienHeight 隐藏剩下内容
        // 设置阀值
        for(var j = 0; j < contentLen; j++){
            
            if(contents[j].innerText.length < this.LIMIT_PAR){
                
                // console.log(contents[j].innerText.length+"\n");
                
                if(this.LIMIT_PAR_LEN_MIN < this.LIMIT_PAR_LEN_MAX){
                    this.LIMIT_PAR_LEN_MIN ++;
                }
            }else{
                this.LIMIT_PAR_LEN_MIN ++;//长度超出阀值的下一段开始隐藏，当前段落隐藏部分
                console.log("j:"+j);
                break;
            }
        }

        // console.log("this.LIMIT_PAR_LEN:"+this.LIMIT_PAR_LEN_MIN);
        
        if (contentHeight / clientHeight >= this.LIMIT_PROPORTION){
            
            var hideContent = document.createElement('div');
            var showBtn = document.createElement('a');
            var span = document.createElement('span');

            if(contents[this.LIMIT_PAR_LEN_MIN-1].innerHTML.length > 100){
                contents[this.LIMIT_PAR_LEN_MIN-1].setAttribute("class","first-paragraph-hide");// 隐藏部分前一段落隐藏部分
            }

            // 将需要隐藏的元素放置于 hiddenContent 中
            for (var i = this.LIMIT_PAR_LEN_MIN; i < contentLen; i++){
                hideContent.appendChild(contents[this.LIMIT_PAR_LEN_MIN]);
            }

            hideContent.style.cssText = "display:none;";
            content.appendChild(hideContent);
            showBtn.innerHTML = "查看全文";
            showBtn.setAttribute("class","show-btn");
            showBtn.appendChild(span);
            
            // show-btn 按钮响应 ,显示余下内容
            showBtn.addEventListener('click',function(){
                hideContent.style.display = "block";
                showBtn.style.display = "none";
                contents[this.LIMIT_PAR_LEN_MIN-1].removeAttribute("class");

            });

            content.appendChild(showBtn, hideContent);
        }
    }
}