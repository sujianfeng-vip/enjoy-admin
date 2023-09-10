package vip.sujianfeng.admin.module.home

import vip.sujianfeng.admin.base.controller.BaseController
import vip.sujianfeng.admin.models.Breadcrumb
import vip.sujianfeng.admin.vo.rbac.RbacSystemVO
import vip.sujianfeng.admin.utils.UserUtils
import io.swagger.annotations.Api
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.ui.ModelMap
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.servlet.ModelAndView
import kotlin.streams.toList

/**
 * @author SuJianFeng
 * @date 2022/5/8
 * @Description
 */
@Api(tags = ["界面视图"])
@Controller
class IndexController: BaseController() {

    @GetMapping("/")
    fun index(): ModelAndView {
        return ModelAndView("index", ModelMap().apply {
            this["breadcrumb"] = listOf(Breadcrumb("首页"))
            this["activeName"] = "00"
            this["openNames"] = "['']"
            val superAdminUser = UserUtils.getCurrUser().superAdminUser()
            val menuList = myRbacHandler.getMenuList(currUserId()).stream().filter {
                //非本系统
                if (!it.systemId.equals(UserUtils.getCurrUser().systemId) ) {
                    return@filter false
                }
                return@filter true
            }.toList().sortedBy { it.sortNo }
            this["menuList"] = menuList
            this["systemRows"] = jdbcTbDao().selectList(RbacSystemVO::class.java, " and a.state = 0 ", 1, 1000, "a.name")
            this["currUser"] = UserUtils.getCurrUser()
            this["pageTitle"] = UserUtils.getCurrUser().systemName ?: ""
        })
    }

    @Autowired
    lateinit var myRbacHandler: vip.sujianfeng.admin.config.MyRbacHandler

}