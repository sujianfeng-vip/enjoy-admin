package vip.sujianfeng.admin.rbac.userRole

import vip.sujianfeng.admin.base.controller.BaseController
import io.swagger.annotations.Api
import org.springframework.stereotype.Controller
import org.springframework.ui.ModelMap
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.servlet.ModelAndView
import vip.sujianfeng.admin.utils.UserUtils
import vip.sujianfeng.admin.vo.rbac.RbacSystemVO

/**
 * @Author keyy
 * @Date 2022/5/20
 * @Description
 **/
@Api(tags = ["界面视图"])
@Controller
class UserRoleViewController: BaseController() {

    @GetMapping("/rbac/user-role/list")
    fun list(@RequestParam systemId: String?, @RequestParam userId: String): ModelAndView {
        return ModelAndView("rbac/user-role/list", ModelMap().apply {
            this["moduleCode"] = "rbac/user-role"
            this["moduleApi"] = "user-role-api"
            this["userId"] = userId
            this["systemId"] = systemId ?: UserUtils.currLoginSystemId()
            this["systemRows"] = jdbcTbDao().selectList(RbacSystemVO::class.java, " and a.state = 0 ", 1, 1000, "a.name")
        })
    }
}