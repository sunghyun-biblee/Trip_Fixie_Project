package com.main.trip.fixied.model.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;

import com.main.trip.fixied.model.dto.AreaCodeDto;
import com.main.trip.fixied.model.dto.CHUser;

@org.apache.ibatis.annotations.Mapper
public interface Mapper {

	@Select(" SELECT * FROM AREACODE WHERE AREACODE = #{areacode} ")
	public AreaCodeDto codeOut(int areacode);
	
	@Insert(" INSERT INTO CHUSER VALUES(#{uid}, #{uemail}, #{uname}, #{unickname}, null) ")
	public int signUp(CHUser dto);
}
