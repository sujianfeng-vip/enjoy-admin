var websocket = null;

$(document).ready(function(){
    webSocketInit();
});

function webSocketInit(){
    setCurrTaskId(0);
    //判断当前浏览器是否支持WebSocket
    if('WebSocket' in window){
        try{
            websocket = new WebSocket(wsRoot() + "/taskWebsocket");
        }catch (e) {
            appendMsg2logPanel(e.toString());
        }
    }else{
        alert('抱歉当前浏览器不支持websocket！');
        appendMsg2logPanel('抱歉当前浏览器不支持websocket！');
    }
    //连接发生错误的回调方法
    websocket.onerror = function(e){
        appendMsg2logPanel("连接WebSocket出错!" + e.toString());
    };

    //连接成功建立的回调方法
    websocket.onopen = function(event){
        appendMsg2logPanel("客户端实时连接成功!");
    }

    //接收到消息的回调方法
    websocket.onmessage = function(event){
        if (event.data.indexOf("{") === -1 && event.data.indexOf("}") === -1){
            appendMsg2logPanel(event.data);
            return;
        }
        var obj = json2obj(event.data);

        //有任务到期了，需要执行，在前端弹出提示
        if (obj.code === 100){
            if ($('.mint-msgbox').is(':visible')){
                return;
            }
            if (getCurrTaskId() === obj.taskId + ""){
                return;
            }
            var xVue = new Vue({
                methods: {
                    showMsgBox: function(){
                        this.$messagebox({
                            title: '任务执行通知',
                            message: obj.message,
                            showCancelButton: true,
                            confirmButtonText: "执行",
                            cancelButtonText: "取消"
                        }).then(function(action){
                            if(action === 'confirm'){
                                startTaskRun(obj.taskId, function(op){
                                    if (op.success){
                                        setCurrTaskId(obj.taskId);
                                        //跳转到任务详情页面
                                        window.location.href = httpRoot() + '/mobile/task/task-detail.html?taskId=' + obj.taskId;
                                    }
                                });
                            }else{

                                startTaskCancel(obj.taskId, function(op){
                                    if (op.success){
                                        alert('任务已成功取消!');
                                    }
                                });
                            }});
                    }
                }
            });
            xVue.showMsgBox();
            return;
        }
        var taskId = cInt(getArgsFromCurrHref("taskId"));
        if (obj.taskId !== taskId){
            //如果消息跟本任务无关，那么直接退出
            return;
        }
        //任务更新消息
        if (obj.code === 0){
            taskdetailData.task[obj.field] = obj.value;
            fixImgs();
            return;
        }
        //升级应用更新消息
        if (obj.code === 1){
            updateAppInfo(obj.key, obj.field, obj.value);
            fixImgs();
            return;
        }
        //升级步骤更新消息
        if (obj.code === 2){
            updateUpgradeStep(obj.key, obj.field, obj.value);
            return;
        }
        //回滚步骤更新消息
        if (obj.code === 3){
            updateRollBackSteps(obj.key, obj.field, obj.value);
            return;
        }
        //置顶消息
        if (obj.code === 8){
            if (!window.document.getElementById('topLabel')){
                return
            }
            $('#topLabel').html(obj.message);
            return;
        }
        //日志消息
        if (obj.code === 9){
            appendMsg2logPanel(obj.message);
            return;
        }

    }

    //连接关闭的回调方法
    websocket.onclose = function(){
        appendMsg2logPanel("已断开实时连接!6秒后重新连接...");
        setTimeout(function(){
            webSocketInit();
        }, 6000);
    }

    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = function(){
        websocket.close();
    }
}


//将消息显示在网页上
function appendMsg2logPanel(content){
    console.log(content);
    if (!window.document.getElementById('log')){
        return
    }
    if ($('#log')){
        //document.getElementById('logPanel').innerHTML += innerHTML + '<br/>';
        var html = $('#log').val();
        $('#log').val(html + "\n" + content);
        var scrollTop = $("#log")[0].scrollHeight;
        $("#log").scrollTop(scrollTop);
    }
}

//关闭连接
function closeWebSocket(){
    websocket.close();
}

//发送消息
function webSocketSend(message){
    //var message = document.getElementById('text').value;
    websocket.send(message);
}

function startTaskRun(taskId, callBack) {
    ajaxCall({
        url: '/taskRun/start',
        type: 'post',
        dataType: 'json',
        data: {taskId: taskId},
        success: function(op){
            if (!op.success){
                appendMsg2logPanel(op.msg);
                alert(op.msg);
            }
            if (callBack){
                callBack(op);
            }
        }
    });
}

function startTaskCancel(taskId, callBack) {
    ajaxCall({
        url: '/taskRun/cancel',
        type: 'post',
        dataType: 'json',
        data: {taskId: taskId},
        success: function(op){
            if (!op.success){
                appendMsg2logPanel(op.msg);
                alert(op.msg);
            }
            if (callBack){
                callBack(op);
            }
        }
    });
}

function getCurrTaskId(){
    return window.localStorage.getItem("currTaskId");
}

function setCurrTaskId(taskId){
    window.localStorage.setItem("currTaskId", taskId);
}