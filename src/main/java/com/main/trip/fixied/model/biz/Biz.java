package com.main.trip.fixied.model.biz;

import com.main.trip.fixied.model.dto.AreaCodeDto;
import com.main.trip.fixied.model.dto.CHUser;

public interface Biz {

	public AreaCodeDto codeOut(int areacode);
	public int signUp(CHUser dto);
}
