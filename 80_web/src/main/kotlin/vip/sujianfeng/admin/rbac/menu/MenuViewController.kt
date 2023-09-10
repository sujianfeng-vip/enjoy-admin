package vip.sujianfeng.admin.rbac.menu

import com.alibaba.fastjson.JSON
import vip.sujianfeng.admin.base.controller.BaseController
import vip.sujianfeng.admin.vo.rbac.RbacMenuVO
import vip.sujianfeng.admin.vo.rbac.RbacSystemVO
import io.swagger.annotations.Api
import org.springframework.stereotype.Controller
import org.springframework.ui.ModelMap
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.servlet.ModelAndView
import vip.sujianfeng.admin.utils.UserUtils
import vip.sujianfeng.admin.vo.rbac.RbacPermissionVO

/**
 * @Author keyy
 * @Date 2022/5/20
 * @Description
 **/
@Api(tags = ["界面视图"])
@Controller
class MenuViewController: BaseController() {

    @GetMapping("/rbac/menu/list")
    fun list(@RequestParam systemId: String?): ModelAndView {
        return ModelAndView("rbac/menu/list", ModelMap().apply {
            this["moduleCode"] = "rbac/menu"
            this["moduleApi"] = "menu-api"
            this["systemId"] = systemId ?: UserUtils.currLoginSystemId()
            this["rootMenus"] = jdbcTbDao().selectList(RbacMenuVO::class.java,
                " and a.system_id = '$systemId' and a.state = 0 and ifnull(a.parent_id,'') = '' ", 1, 1000, "a.sort_no")
            this["systemRows"] = jdbcTbDao().selectList(RbacSystemVO::class.java, " and a.state = 0 ", 1, 1000, "a.name")
        })
    }

    @GetMapping("/rbac/menu/edit")
    fun edit(@RequestParam systemId: String, @RequestParam id: String?): ModelAndView {
        return ModelAndView("rbac/menu/edit", ModelMap().apply {
            this["moduleCode"] = "rbac/menu"
            this["moduleApi"] = "menu-api"
            this["rootMenus"] = jdbcTbDao().selectList(RbacMenuVO::class.java, " and a.system_id = '$systemId' and a.state = 0 and ifnull(a.parent_id,'') = '' ", 1, 1000, "a.sort_no")
            this["systemRows"] = jdbcTbDao().selectList(RbacSystemVO::class.java, " and a.state = 0 ", 1, 1000, "a.name")
            var item = jdbcTbDao().selectOneByUuId(RbacMenuVO::class.java, id)
            if (item == null) {
                item = RbacMenuVO().apply {
                    this.systemId = systemId
                }
            }
            this["permissionRows"] = jdbcTbDao().selectList(RbacPermissionVO::class.java, " and a.system_id = '${systemId}' ", 1, 1000)
            this["formItemJson"] = JSON.toJSONString(item)
        })
    }

}