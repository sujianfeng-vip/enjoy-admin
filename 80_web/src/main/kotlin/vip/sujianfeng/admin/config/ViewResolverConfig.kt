package vip.sujianfeng.admin.config

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import org.thymeleaf.dialect.IDialect
import org.thymeleaf.spring5.SpringTemplateEngine
import org.thymeleaf.spring5.dialect.SpringStandardDialect
import org.thymeleaf.spring5.view.ThymeleafViewResolver
import org.thymeleaf.templateresolver.StringTemplateResolver
import vip.sujianfeng.admin.dbconn.MyJdbcDao
import javax.annotation.PostConstruct


/**
 * @Author SuJianFeng
 * @Date 2022/6/1
 * @Description
 **/
@Component
class ViewResolverConfig {
    companion object {
        @Autowired
        private var _springTemplateEngine: SpringTemplateEngine? = null
    }

    @Autowired
    lateinit var thymeleafViewResolver: ThymeleafViewResolver
    fun springTemplateEngine(): SpringTemplateEngine {
        if (_springTemplateEngine != null) {
            return _springTemplateEngine!!
        }
        //创建TemplateEngine
        _springTemplateEngine = SpringTemplateEngine()
        val dialect: IDialect = SpringStandardDialect()
        _springTemplateEngine!!.setDialect(dialect)
        //创建StringTemplateResolver
        val resolver = StringTemplateResolver()
        resolver.isCacheable = false
        //引擎使用StringTemplateResolver
        _springTemplateEngine!!.setTemplateResolver(resolver)
        return _springTemplateEngine!!
    }

    @Autowired
    lateinit var jdbcTbDao: MyJdbcDao

    @PostConstruct
    fun init() {
        thymeleafViewResolver.addStaticVariable("test123", "123")
    }
}