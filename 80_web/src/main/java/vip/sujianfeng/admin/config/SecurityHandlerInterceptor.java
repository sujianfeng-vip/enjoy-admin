package vip.sujianfeng.admin.config;

import com.alibaba.fastjson.JSON;
import vip.sujianfeng.admin.utils.UserUtils;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.servlet.HandlerInterceptor;
import vip.sujianfeng.utils.define.CallResult;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

import static vip.sujianfeng.utils.define.CallResult.NOT_LOGGED_CODE;


/**
 * @Author SuJianFeng
 * @Date 2022/5/27
 * @Description
 **/
public class SecurityHandlerInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(@NotNull HttpServletRequest request, @NotNull HttpServletResponse response, @NotNull Object handler) throws Exception {
        CallResult<String> callResult = new CallResult<>();
        AntPathMatcher antPathMatcher = new AntPathMatcher();
        String uri = request.getRequestURI();
        boolean match = antPathMatcher.match("/login/**", uri)
                || antPathMatcher.match("/demo/**", uri)
                || antPathMatcher.match("/doc.html", uri)
                || antPathMatcher.match("/webjars/**", uri)
                || antPathMatcher.match("/swagger-resources", uri)
                || antPathMatcher.match("/error", uri)
                || antPathMatcher.match("/health", uri)
                || antPathMatcher.match("/websocket/*", uri)
                || antPathMatcher.match("/open/**", uri);
        if (match) {
            return true;
        }
        if (!UserUtils.isLogin()){
            //只拦截Api请求，页面请求不拦截，由前端自行控制
            if (contentTypeIsJson(request)) {
                setResponseJsonResult(response, callResult.putCode(NOT_LOGGED_CODE, "未登录!"));
                logger.info("未登录无法访问此接口: {}", uri);
                return false;
            }
            this.forwardLogin(request, response);
            return false;
        }
        //request.getSession().setAttribute("currUser", UserUtils.getCurrUserJson());
        return true;
    }

    private void forwardLogin(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setAttribute("message","您还未登录，请先登录");
        request.getRequestDispatcher("/login").forward(request, response);
    }

    private void setResponseJsonResult(HttpServletResponse response, CallResult<String> opResult) {
        try {
            response.setContentType("application/json;charset=UTF-8");
            PrintWriter writer = response.getWriter();
            writer.write(JSON.toJSONString(opResult));
            writer.flush();
        } catch (IOException e) {
            logger.error(e.toString(), e);
        }
    }

    private boolean contentTypeIsJson(HttpServletRequest request) {
        if (request.getContentType() == null){
            return false;
        }
        return request.getContentType().toLowerCase().contains("application/json");
    }

    private static Logger logger = LoggerFactory.getLogger(SecurityHandlerInterceptor.class);
}
