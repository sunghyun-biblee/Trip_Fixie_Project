package com.main.trip.fixied.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;

import com.main.trip.fixied.model.dto.AreaCodeDto;
import com.main.trip.fixied.model.dto.CHUser;
import com.main.trip.fixied.model.dto.ContentList;
import com.main.trip.fixied.model.dto.Favorite;
import com.main.trip.fixied.model.dto.FavoriteList;

@org.apache.ibatis.annotations.Mapper
public interface Mapper {

	@Select(" SELECT * FROM AREACODE WHERE AREACODE = #{areacode} ")
	public AreaCodeDto codeOut(int areacode);
	
	@Insert(" INSERT INTO CHUSER VALUES(#{uid}, #{uemail}, #{uname}, #{unickname}, null) ")
	public int signUp(CHUser dto);
	
	@Select(" SELECT CONTENTID FROM CONTENTLIST ")
	public List<Integer> contentSelectAll();
	
	@Insert(" INSERT INTO CONTENTLIST VALUES(#{contentid}, #{ctitle}, #{caddr}, #{ctel}, #{ceventstartdate}, #{ceventenddate}, #{cfirstimage}, #{csecondimage}, #{clatitude}, #{clongitude}) ")
	public int addContentList(ContentList contentlist);
	
	@Insert(" INSERT INTO FAVORITE VALUES(#{uid}, #{ftitle}, null) ")
	public int addFavorite(Favorite favorite);
	
	@Select(" SELECT FID FROM FAVORITE WHERE FTITLE = #{ftitle} ")
	public Integer getFid(String ftitle);
	
	@Insert(" INSERT INTO FAVORITELIST VALUES(#{fid}, #{contentid}) ")
	public int addFavoriteList(FavoriteList favoriteList);
}
