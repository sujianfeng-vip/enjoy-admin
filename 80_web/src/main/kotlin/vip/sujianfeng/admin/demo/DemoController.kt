package vip.sujianfeng.admin.demo


import io.swagger.annotations.Api
import org.apache.commons.lang3.RandomUtils
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.ui.ModelMap
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.servlet.ModelAndView
import org.thymeleaf.context.Context
import vip.sujianfeng.admin.config.ViewResolverConfig

@Api(tags = ["演示案例"])
@Controller
@RequestMapping("/demo")
class DemoController {

    @Autowired
    lateinit var viewResolverConfig: ViewResolverConfig

    @GetMapping("demo1")
    fun demo1(): ModelAndView {
        return ModelAndView("/demo/demo1", ModelMap().apply {
            val bodyHtml = """
                <script>
                    function test1() {
                        alert("123")                    
                    }
                </script>
                <div style="color: red" onclick="test1()">
                    hello !! <th:block th:text="${'$'}{userName}"></th:block>
                </div>
            """.trimIndent()
            this.addAttribute("bodyHtml", viewResolverConfig.springTemplateEngine().process(bodyHtml, Context().apply {
                this.setVariable("userName", "张三")
            }))
        })
    }

    @GetMapping("/hello")
    fun hello(model: Model, @RequestParam currUserId: String?): String {

        model.addAttribute("msg", "springboot集成thymeleaf演示案例")
        model.addAttribute("currUserId", currUserId)

        model.addAttribute("demoUser1", DemoUser().apply {
            id = "001"
            name = "张三"
            age = 18
        })
        model.addAttribute("demoUser2", DemoUser().apply {
            id = "002"
            name = "李四"
            age = 19
        })
        val userList = ArrayList<DemoUser>()
        for (i in 100..110) {
            userList.add(DemoUser().apply {
                id = "$i"
                name = "用户$i"
                age = 10 + RandomUtils.nextInt(0, 20)
            })
        }
        model.addAttribute("userList", userList)
        return "demo/hello"
    }

    @GetMapping("/hello2")
    fun hello2(): ModelAndView {
        return ModelAndView("demo/hello2").apply {
            addObject("msg", "测试文本2...")
        }
    }

    val logger: Logger = LoggerFactory.getLogger(this.javaClass)
}


class DemoUser {
    var id: String = ""
    var name: String = ""
    var age: Int = 0
}