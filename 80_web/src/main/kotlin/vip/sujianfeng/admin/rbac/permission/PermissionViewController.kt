package vip.sujianfeng.admin.rbac.permission

import com.alibaba.fastjson.JSON
import vip.sujianfeng.admin.base.controller.BaseController
import vip.sujianfeng.admin.vo.rbac.RbacPermissionVO
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
class PermissionViewController: BaseController() {

    @GetMapping("/rbac/permission/list")
    fun list(@RequestParam systemId: String?): ModelAndView {
        return ModelAndView("rbac/permission/list", ModelMap().apply {
            this["moduleCode"] = "rbac/permission"
            this["moduleApi"] = "permission-api"
            this["systemId"] = systemId ?: UserUtils.currLoginSystemId()
            this["systemRows"] = jdbcTbDao().selectList(RbacSystemVO::class.java, " and a.state = 0 ", 1, 1000, "a.name")
        })
    }

    @GetMapping("/rbac/permission/edit")
    fun edit(@RequestParam systemId: String, @RequestParam id: String?): ModelAndView {
        return ModelAndView("rbac/permission/edit", ModelMap().apply {
            this["moduleCode"] = "rbac/permission"
            this["moduleApi"] = "permission-api"
            var item = jdbcTbDao().selectOneByUuId(RbacPermissionVO::class.java, id)
            if (item == null) {
                item = RbacPermissionVO().apply {
                    this.systemId = systemId
                }
            }
            this["formItemJson"] = JSON.toJSONString(item)
        })
    }

}