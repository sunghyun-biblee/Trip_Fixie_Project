package com.main.trip.fixied.model.mapper;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.main.trip.fixied.model.dto.AreaCodeDto;
import com.main.trip.fixied.model.dto.CHUser;
import com.main.trip.fixied.model.dto.ContentList;
import com.main.trip.fixied.model.dto.Favorite;
import com.main.trip.fixied.model.dto.FavoriteList;

@org.apache.ibatis.annotations.Mapper
public interface Mapper {

	@Select(" SELECT * FROM AREACODE WHERE AREACODE = #{areacode} ")
	public AreaCodeDto codeOut(int areacode);

	@Insert(" INSERT INTO CHUSER VALUES(#{uid}, #{uemail}, #{uname}, #{unickname}, #{uprofile}) ")
	public int signUp(CHUser dto);

	@Select(" SELECT CONTENTID FROM CONTENTLIST ")
	public List<Integer> contentSelectAll();

	@Insert(" INSERT INTO CONTENTLIST VALUES(#{contentid}, #{ctitle}, #{caddr}, #{ctel}, #{ceventstartdate}, #{ceventenddate}, #{cfirstimage}, #{csecondimage}, #{clatitude}, #{clongitude} ,#{contenttypeid}) ")
	public int addContentList(ContentList contentlist);

	@Insert(" INSERT INTO FAVORITE VALUES(#{uid}, #{ftitle}, #{fid}, #{fstart}, #{fend}, #{farea}, #{fdate} ,#{fnotepad}) ")
	public int addFavorite(Favorite favorite);

	@Select(" SELECT FID FROM FAVORITE WHERE FTITLE = #{ftitle} ")
	public Integer getFid(String ftitle);

	@Insert(" INSERT INTO FAVORITELIST VALUES(#{fid}, #{contentid}) ")
	public int addFavoriteList(FavoriteList favoriteList);

	@Select(" SELECT * FROM CHUSER WHERE UID = #{userid} ") // 프로필 불러오기
	public CHUser loadProfile(String userid);

	@Select(" SELECT * FROM FAVORITE WHERE UID = #{userid} ORDER BY FDATE DESC") // 즐겨찾기 불러오기
	public ArrayList<Favorite> loadFavorites(String userid);

	@Select(" SELECT TA.CONTENTID, CTITLE, CADDR, CTEL, CEVENTSTARTDATE, CEVENTENDDATE, CFIRSTIMAGE, CSECONDIMAGE, CLATITUDE, CLONGITUDE , CONTENTTYPEID FROM CONTENTLIST TA JOIN (SELECT CONTENTID FROM FAVORITELIST WHERE FID = #{favorFid} )TB ON TA.CONTENTID = TB.CONTENTID; ")
	public ArrayList<ContentList> loadFavoriteList(String favorFid);

	@Select(" SELECT * FROM AREACODE WHERE AREACODE = #{MainAreaCode} ")
	public AreaCodeDto getLongLat(String MainAreaCode);

	@Delete(" DELETE FROM CHUSER WHERE UID = #{uid} ")
	public int deleteUser(String uid);

	@Select(" SELECT UID FROM CHUSER ")
	public ArrayList<String> selectUidAll();

	@Select("SELECT * FROM FAVORITE WHERE FID= #{favorFid}")
	public Favorite getFavorArea(String favorFid);

	@Select(" SELECT FNOTEPAD FROM FAVORITE WHERE FID = #{favorFid} ")
	public String getFavorNotepad(String favorFid);
	
	@Update(" UPDATE CHUSER SET UPROFILE = #{uprofile} WHERE UID = #{uid} ")
	public String updateProfile(String uid, String uprofile);

}
