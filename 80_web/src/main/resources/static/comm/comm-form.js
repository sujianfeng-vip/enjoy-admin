store.commFormData = {
    visible: true,
    title: '公共窗口'
}

store.confirmData = {
    visible: false,
    title: '确认',
    content: '请确认是否执行此操作',
    okBack: null
}

methods.confirmBack = function() {
    if (store.confirmData.okBack) {
        store.confirmData.okBack()
    }
}

window.callCommForm = function(title, url, height, width) {
    let left = (window.screen.availWidth - width) / 3;
    let top = (window.screen.availHeight - height) / 3;
    window.callCommForm0(title, url, left, top, height, width)
}

window.callCommForm1 = function(title, url, {left, top, height, width} ) {
	window.callCommForm0(title, url, left, top, height, width)  
}

window.callCommForm0 = function(title, url, left, top, height, width) {
    let id = `id${Math.floor(Math.random()*1000)}`;
    let iframeId = `iframe${id}`
    let html = `
                <div id="${id}" class="commFormBox">
                    <div class="commForm" style="top: ${top}px; left: ${left}px; width: ${width}px; height: ${height}px; ">
                        <div class="toolbar">
                            <label class="title">${title}</label>
                            <label class="close-btn" onclick="window.removeElement('${id}')">X</label>
                        </div>
                        <iframe id="${iframeId}" src="" style="border: none; width: 100%; height: ${height}px;"></iframe>
                    </div>
                </div>
            `
    $('#app').append(html)
    $(`#${iframeId}`).attr("src", url)
}

window.removeElement = function(id) {
    var item = document.getElementById(id);
    document.getElementById('app').removeChild(item)
}

window.confirmForm = function(title, content, okBack) {
    store.confirmData = {
        visible: true,
        title: title || store.confirmData.title,
        content: content || store.confirmData.content,
        okBack: okBack
    }
}