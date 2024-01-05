package com.main.trip.fixied.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.main.trip.fixied.model.biz.Biz;
import com.main.trip.fixied.model.dto.AreaCodeDto;
import com.main.trip.fixied.model.dto.CHUser;

@RestController
@RequestMapping("/test")
public class apiController {
	
	@Autowired
	private Biz biz;
	
	@GetMapping("/send")
	public ResponseEntity<String> sayHello(){
		
		return ResponseEntity.ok("sexy boy cho sung hyeon");
	}
	
	@RequestMapping("/codeout")
	public AreaCodeDto codeOut(@RequestBody Map<String, Integer>requestBody) {
		int areacode = requestBody.get("areacode");
		AreaCodeDto dto = biz.codeOut(areacode);
		return dto;
	}
	
	@RequestMapping("/signup")
	public String signUp(@RequestBody Map<String, String>requestBody) {
		
		CHUser dto  = new CHUser();
		dto.setUid(requestBody.get("uid"));
		dto.setUemail(requestBody.get("email"));
		dto.setUname(requestBody.get("name"));
		dto.setUnickname(requestBody.get("nickname"));
		//dto.setUprofile(null);		나중에 이미지 스토리지 추가하고 로직짠뒤에 추가		

		if(biz.signUp(dto)>0) {
			return "잘돼용";
		}else {
			return "조땠서요";
		}
	}

}
