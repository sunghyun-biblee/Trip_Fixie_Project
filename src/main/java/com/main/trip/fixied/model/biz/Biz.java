package com.main.trip.fixied.model.biz;

import java.util.ArrayList;
import java.util.List;

import com.main.trip.fixied.model.dto.AreaCodeDto;
import com.main.trip.fixied.model.dto.CHUser;
import com.main.trip.fixied.model.dto.ContentList;
import com.main.trip.fixied.model.dto.Favorite;
import com.main.trip.fixied.model.dto.FavoriteList;

public interface Biz {

	public AreaCodeDto codeOut(int areacode);
	public int signUp(CHUser dto);
	public List<Integer> contentSelectAll();
	public int addContentList(ContentList contentlist);		//관광지, 축제 리스트 추가
	public int addFavorite(Favorite favorite);
	public Integer getFid(String ftitle);
	public int addFavoriteList(FavoriteList favoriteList);
	public CHUser loadProfile(String userid);
	public ArrayList<Favorite> loadFavorites(String userid);
	public ArrayList<ContentList> loadFavoriteList(String favorFid);
	public AreaCodeDto getLongLat(String MainAreaCode);
	public int deleteUser(String uid);
	public ArrayList<String> selectUidAll();
	public Favorite getFavorArea(String favorFid);
	public String getFavorNotepad(String favorFid);
	public String updateProfile(String uid, String uprofile);
}
