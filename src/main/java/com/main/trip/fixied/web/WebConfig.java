package com.main.trip.fixied.web;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class WebConfig implements WebMvcConfigurer{
	 
	@Override
	    public void addCorsMappings(CorsRegistry registry) {
	        registry.addMapping("/**")  // 모든 경로에 대해 CORS 설정을 적용합니다.
	                .allowedOrigins("http://localhost:3000")  // 모든 오리진 (도메인)에서 요청을 허용합니다. 필요한 경우 특정 도메인만 지정할 수 있습니다.
	                .allowedMethods("GET", "POST", "PUT", "DELETE")  // 허용되는 HTTP 메서드를 지정합니다.
	                .allowedHeaders("*");  // 모든 헤더를 허용합니다.
	    }
}