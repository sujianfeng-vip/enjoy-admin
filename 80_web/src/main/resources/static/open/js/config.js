
function getEnvType(){
    if ( window.location.href.indexOf("127.0.0.1") >= 0 || window.location.href.indexOf("localhost") >= 0){
        return "debug"
    }
    if (window.location.href.indexOf("/dt-test") >= 0){
        return "test"
    }
    return "prod";
}

function getApiContextPath(){
    var envType = getEnvType();
    if (envType === "debug"){
        return "/dt-api-test"
    }
    return "/dt-api";
}

function getWebroot(){
    var envType = getEnvType();
    if (envType === "debug"){
        return "http://127.0.0.1/dt-api-test"
    }
    if (envType === "test"){
        return "http://dt-test.xmhougu.com/dt"
    }
    return "https://dt.xmhougu.com/dt";
}

function getApiTokenKeyName(){
    return "API-TOKEN";
}

