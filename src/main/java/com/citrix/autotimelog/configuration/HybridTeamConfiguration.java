package com.citrix.autotimelog.configuration;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
 
@Configuration
@EnableWebMvc
@ComponentScan(basePackages = "com.citrix.autotimelog")
public class HybridTeamConfiguration extends WebMvcConfigurerAdapter{
	  
	
}
