package vip.sujianfeng.admin.rbac.role

import com.alibaba.fastjson.JSON
import io.swagger.annotations.Api
import org.springframework.stereotype.Controller
import org.springframework.ui.ModelMap
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.servlet.ModelAndView
import vip.sujianfeng.admin.base.controller.BaseController
import vip.sujianfeng.admin.utils.UserUtils
import vip.sujianfeng.admin.vo.rbac.RbacRoleVO
import vip.sujianfeng.admin.vo.rbac.RbacSystemVO

/**
 * @Author keyy
 * @Date 2022/5/20
 * @Description
 **/
@Api(tags = ["界面视图"])
@Controller
class RoleViewController: BaseController() {

    @GetMapping("/rbac/role/list")
    fun list(@RequestParam systemId: String?): ModelAndView {
        return ModelAndView("rbac/role/list", ModelMap().apply {
            this["moduleCode"] = "rbac/role"
            this["moduleApi"] = "role-api"
            this["systemId"] = systemId ?: UserUtils.currLoginSystemId()
            this["systemRows"] = jdbcTbDao().selectList(RbacSystemVO::class.java, " and a.state = 0 ", 1, 1000, "a.name")
        })
    }

    @GetMapping("/rbac/role/edit")
    fun edit(@RequestParam systemId: String, @RequestParam id: String?): ModelAndView {
        return ModelAndView("rbac/role/edit", ModelMap().apply {
            this["moduleCode"] = "rbac/role"
            this["moduleApi"] = "role-api"
            this["systemId"] = systemId
            var item = jdbcTbDao().selectOneByUuId(RbacRoleVO::class.java, id)
            if (item == null) {
                item = RbacRoleVO().apply {
                    this.systemId = systemId
                }
            }
            this["formItemJson"] = JSON.toJSONString(item)
        })
    }

}