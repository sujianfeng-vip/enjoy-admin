package vip.sujianfeng.admin.rbac.system

import vip.sujianfeng.utils.comm.StringUtilsEx
import com.alibaba.fastjson.JSON
import vip.sujianfeng.admin.base.controller.BaseController
import vip.sujianfeng.admin.vo.rbac.RbacSystemVO
import io.swagger.annotations.Api
import org.springframework.stereotype.Controller
import org.springframework.ui.ModelMap
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.servlet.ModelAndView

/**
 * @Author SuJianFeng
 * @Date 2022/5/20
 * @Description
 **/
@Api(tags = ["界面视图"])
@Controller
class SystemViewController: BaseController() {

    @GetMapping("/rbac/system/list")
    fun list(): ModelAndView {
        return ModelAndView("rbac/system/list", ModelMap().apply {
            this["moduleCode"] = "rbac/system"
            this["moduleApi"] = "system-api"
        })
    }

    @GetMapping("/rbac/system/edit")
    fun edit(@RequestParam id: String?): ModelAndView {
        return ModelAndView("rbac/system/edit", ModelMap().apply {
            this["moduleCode"] = "rbac/system"
            this["moduleApi"] = "system-api"
            this["formItemJson"] = if(StringUtilsEx.isEmpty(id)) "{}" else JSON.toJSONString(jdbcTbDao().selectOneByUuId(
                RbacSystemVO::class.java, id))
        })
    }
}