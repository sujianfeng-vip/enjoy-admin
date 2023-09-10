package vip.sujianfeng.admin.rbac.user

import vip.sujianfeng.utils.comm.StringUtilsEx
import com.alibaba.fastjson.JSON
import vip.sujianfeng.admin.base.controller.BaseController
import vip.sujianfeng.admin.vo.rbac.RbacUserVO
import io.swagger.annotations.Api
import org.springframework.stereotype.Controller
import org.springframework.ui.ModelMap
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.servlet.ModelAndView

/**
 * @Author keyy
 * @Date 2022/5/20
 * @Description
 **/
@Api(tags = ["界面视图"])
@Controller
class UserViewController: BaseController() {

    @GetMapping("/rbac/user/list")
    fun list(): ModelAndView {
        return ModelAndView("rbac/user/list", ModelMap().apply {
            this["moduleCode"] = "rbac/user"
            this["moduleApi"] = "user-api"
        })
    }


    @GetMapping("/rbac/user/edit")
    fun edit(@RequestParam id: String?): ModelAndView {
        return ModelAndView("rbac/user/edit", ModelMap().apply {
            this["moduleCode"] = "rbac/user"
            this["moduleApi"] = "user-api"
            this["formItemJson"] = if(StringUtilsEx.isEmpty(id)) "{}" else JSON.toJSONString(jdbcTbDao().selectOneByUuId(
                RbacUserVO::class.java, id))
        })
    }
}