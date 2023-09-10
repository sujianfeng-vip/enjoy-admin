let store = {
    showLoading: false,
};
let methods = {
    // 全局配置,报错信息
    popMessage (that,message) {
        that.$Message.error(message)
    }
};

let computed = {

};
let mounted = function(){
    console.log("vue load completed.")
    setTimeout(function(){
        $('.loading').hide()
        if (window.loaded) {
            window.loaded()
        }
    }, 200)
}

window.onload = function() {
    console.log("window.onload ...")
    window.vue = new Vue({
        el: '#app',
        data: store,
        methods: methods,
        computed:computed,
        mounted: mounted
    });
    if (window.onPageDataLoad) {
        window.onPageDataLoad()
    }
}
