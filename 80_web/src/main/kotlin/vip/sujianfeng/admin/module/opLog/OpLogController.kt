package vip.sujianfeng.admin.module.opLog

import vip.sujianfeng.admin.base.controller.BaseController
import io.swagger.annotations.Api
import org.springframework.stereotype.Controller
import org.springframework.ui.ModelMap
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.servlet.ModelAndView

/**
 * @Author SuJianFeng
 * @Date 2022/6/2
 * @Description
 **/
@Api(tags = ["界面视图"])
@Controller
class OpLogController: BaseController() {
    @GetMapping("/module/op-log/list")
    fun list(): ModelAndView {
        return ModelAndView("module/op-log/list", ModelMap().apply {
            this["moduleCode"] = "module/op-log"
            this["moduleApi"] = "op-log-api"
        })
    }
}