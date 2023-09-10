package vip.sujianfeng.admin.module.home

import io.swagger.annotations.Api
import org.springframework.stereotype.Controller
import org.springframework.ui.ModelMap
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.servlet.ModelAndView
import vip.sujianfeng.admin.base.controller.BaseController

/**
 * @Author SuJianFeng
 * @Date 2022/5/24
 * @Description
 **/
@Api(tags = ["界面视图"])
@Controller
class HomeController: BaseController() {

    @GetMapping("/home/welcome")
    fun welcome(): ModelAndView {
        return ModelAndView("home/welcome", ModelMap().apply {
            this["currUser"] = vip.sujianfeng.admin.utils.UserUtils.getCurrUser()
        })

    }
}