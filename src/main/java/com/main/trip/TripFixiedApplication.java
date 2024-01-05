package com.main.trip;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;

import com.main.trip.fixied.model.biz.Biz;

@SpringBootApplication
public class TripFixiedApplication {

	public static void main(String[] args) {
		SpringApplication.run(TripFixiedApplication.class, args);
		
	}

}
