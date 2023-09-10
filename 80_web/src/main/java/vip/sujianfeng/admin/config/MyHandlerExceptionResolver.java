package vip.sujianfeng.admin.config;

import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 全局异常处理
 * @author SuJianFeng
 * @date 2022/5/11
 * @Description
 */
@Component
public class MyHandlerExceptionResolver implements HandlerExceptionResolver {

    @Override
    public ModelAndView resolveException(@NotNull HttpServletRequest request,
                                         @NotNull HttpServletResponse response,
                                         Object handler,
                                         @NotNull Exception ex) {
        logger.error("全局异常：", ex);
        ModelAndView view = new ModelAndView();
        view.setViewName("error");
        view.addObject("message",ex.toString());
        return view;
    }

    private Logger logger = LoggerFactory.getLogger(this.getClass());
}
