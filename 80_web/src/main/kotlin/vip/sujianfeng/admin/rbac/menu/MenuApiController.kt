package vip.sujianfeng.admin.rbac.menu

import vip.sujianfeng.admin.base.controller.MasterController
import vip.sujianfeng.admin.vo.rbac.RbacMenuVO
import io.swagger.annotations.Api
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import vip.sujianfeng.admin.rbac.menu.params.MenuPageParam
import vip.sujianfeng.enjoydao.handler.model.ManyIdParam
import vip.sujianfeng.enjoydao.interfaces.JdbcTbDao
import vip.sujianfeng.utils.define.CallResult

/**
 * @Author keyy
 * @Date 2022/5/20
 * @Description
 **/
@Api(tags = ["菜单管理"])
@RestController
@RequestMapping("/menu-api")
class MenuApiController: MasterController<RbacMenuVO, MenuPageParam>() {

    override fun afterAdd(op: CallResult<*>, jdbcDao: JdbcTbDao, item: RbacMenuVO) {
        super.afterAdd(op, jdbcDao, item)
        myRbacHandler.clearCache()
    }

    override fun afterUpdate(op: CallResult<*>, jdbcDao: JdbcTbDao, item: RbacMenuVO) {
        super.afterUpdate(op, jdbcDao, item)
        myRbacHandler.clearCache()
    }

    override fun afterDelete(
        op: CallResult<*>,
        jdbcDao: JdbcTbDao,
        manyIdParam: ManyIdParam,
        rows: MutableList<RbacMenuVO>
    ) {
        super.afterDelete(op, jdbcDao, manyIdParam, rows)
        myRbacHandler.clearCache()
    }

    @Autowired
    lateinit var myRbacHandler: vip.sujianfeng.admin.config.MyRbacHandler
}