package com.main.trip.fixied.model.biz;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.main.trip.fixied.model.dto.AreaCodeDto;
import com.main.trip.fixied.model.dto.CHUser;
import com.main.trip.fixied.model.mapper.Mapper;

@Service
public class BizImpl implements Biz{

	@Autowired
	private Mapper mapper;
	
	@Autowired
	public BizImpl(Mapper mapper) {
		this.mapper = mapper;
	}
	
	@Override
	public AreaCodeDto codeOut(int areacode) {
		return mapper.codeOut(areacode);
	}

	@Override
	public int signUp(CHUser dto) {
		return mapper.signUp(dto);
	}
	

}
