package com.bluntsoftware.app.config;

import com.bluntsoftware.lib.app.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

/**
 * Created by Alex Mcknight on 4/16/2017.
 *
 */
@Configuration
@ComponentScan({"com.bluntsoftware.lib.app"})
public class AppConfiguration implements EnvironmentAware {
    @Autowired
    private ApplicationRepository application;

    @Override
    public void setEnvironment(Environment environment) {
        String appName = environment.getProperty("app.name");
        if(appName != null && !appName.equalsIgnoreCase("")){
            application.setAppName(appName);
            application.initialize();
        }
    }

}