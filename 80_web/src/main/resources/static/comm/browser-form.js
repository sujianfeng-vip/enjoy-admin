/**
 * @param url strUrl【可选参数，字符串类型】要在新打开的窗口中加载的 URL.要在新打开的窗口中加载的URL，如果省略了这个参数，或者它的值是空字符串，那么新窗口就不会显示任何文档。
 * @param name strWindowName【可选参数，字符串类型】新窗口的名称
 * @param top 0 | 0%    0    新窗口距离显示器顶端（y坐标）的像素值
 * @param left 0 | 0%    0    新窗口距离显示器左边（x坐标）的像素值
 * @param width 0 | 0%    同屏幕大小    新窗口的宽度
 * @param height 0 | 0%    同屏幕大小    新窗口的高度
 * @param centerscreen 1 | 0 | yes | no    no    使窗口相对于其父级的大小和位置居中
 * @param titlebar 1 | 0 | yes | no    yes    是否显示标题栏
 * @param toolbar 1 | 0 | yes | no    yes    是否显示工具栏
 * @param menubar 1 | 0 | yes | no    yes    是否显示菜单栏
 * @param location 1 | 0 | yes | no    yes    是否显示地址栏
 * @param status 1 | 0 | yes | no    yes    是否显示状态栏
 * @param scrollbars 1 | 0 | yes | no    yes    是否显示滚动条
 * @param resizable 1 | 0 | yes | no    yes    是否允许改变窗口大小
 * @param directories 1 | 0 | yes | no    yes    是否添加目录按钮（部分浏览器已废弃）
 * @param fullscreen 1 | 0 | yes | no    no    是否使用全屏模式显示浏览器， 注：处于全屏模式的窗口必须同时处于剧院模式。
 * @param channelmode 1 | 0 | yes | no    no    是否使用剧院模式显示窗口
 * @param dataParamKey
 * @param callBack
 */
function showBrowseForm({url, name, onTop, params}, {top, left, width, height, centerscreen, titlebar, toolbar, menubar, location, status, scrollbars, resizable, directories, fullscreen, channelmode}) {
    let paramStr = `top=${top || 0}, left=${left || 0}, width=${width || '50%'}, height=${height || '50%'}, centerscreen=${centerscreen || 'yes'}, titlebar=${titlebar || 'yes'}, toolbar=${toolbar || 'no'}, menubar=${menubar || 'no'}, location=${location || 'no'}, status=${status || 'yes'}, scrollbars=${scrollbars || 'yes'}, resizable=${resizable || 'yes'}, directories=${directories || 'yes'}, fullscreen=${fullscreen || 'no'}, channelmode=${channelmode || 'no'}`
    let win = window.open(url, name, paramStr)
    win.title = name
    win.params = params || {}
    if (!win.params.callBackFun) {
        win.params.callBackFun = 'callback'
    }
    if (onTop) {
        win.focus()
    }
}
