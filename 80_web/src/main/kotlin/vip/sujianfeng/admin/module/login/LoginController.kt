package vip.sujianfeng.admin.module.login

import vip.sujianfeng.admin.base.controller.BaseController
import io.swagger.annotations.Api
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.servlet.ModelAndView
import vip.sujianfeng.admin.utils.UserUtils
import vip.sujianfeng.admin.vo.rbac.RbacSystemVO
import javax.servlet.http.HttpServletRequest

/**
 * @Author SuJianFeng
 * @Date 2022/5/20
 * @Description
 **/
@Api(tags = ["界面视图"])
@Controller
class LoginController: BaseController() {


    @GetMapping("/login")
    fun login(request: HttpServletRequest): ModelAndView {
        return ModelAndView("login").apply {
            val systemRows = jdbcTbDao().selectList(RbacSystemVO::class.java, " and a.state = 0 ", 1, 1000, "a.sort_no")
            this.addObject("defaultLoginPane", "panePassword")
            this.addObject("pageTitle", "后古BI")
            this.addObject("systemRows", systemRows)
            this.addObject("defaultSystemId", systemRows[0].id)
            UserUtils.logout()
        }
    }

}