package com.main.trip.fixied.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.main.trip.fixied.model.biz.Biz;
import com.main.trip.fixied.model.dto.AreaCodeDto;
import com.main.trip.fixied.model.dto.CHUser;
import com.main.trip.fixied.model.dto.ContentList;
import com.main.trip.fixied.model.dto.Favorite;
import com.main.trip.fixied.model.dto.FavoriteList;

@RestController
@RequestMapping("/test")
public class apiController {

	@Autowired
	private Biz biz;

	@GetMapping("/send")
	public ResponseEntity<String> sayHello() {

		return ResponseEntity.ok("스트리퍼 조성현");
	}

	@RequestMapping("/codeout")
	public AreaCodeDto codeOut(@RequestBody Map<String, Integer> requestBody) {
		int areacode = requestBody.get("areacode");
		AreaCodeDto dto = biz.codeOut(areacode);
		return dto;
	}

	@RequestMapping("/signup")
	public String signUp(@RequestBody Map<String, String> requestBody) {

		CHUser dto = new CHUser();
		dto.setUid(requestBody.get("uid"));
		dto.setUemail(requestBody.get("email"));
		dto.setUname(requestBody.get("name"));
		dto.setUnickname(requestBody.get("nickname"));
		if (requestBody.get("profile") != null) {
			dto.setUprofile((String)requestBody.get("profile"));
		}
		
		if (biz.signUp(dto) > 0) {
			return "잘돼용";
		} else {
			return "조땠서요";
		}
	}

	@RequestMapping("/selectUidAll")
	public ArrayList<String> selectUidAll() {
		ArrayList<String> list = biz.selectUidAll();

		return list;
	}

	@RequestMapping("/addFavorite")
	public String addFavorite(@RequestBody Map<String, Object> requestBody) {

		// favorite 목록 생성
		Favorite favorite = new Favorite();
		favorite.setUid((String) requestBody.get("uid"));
		favorite.setFtitle((String) requestBody.get("ftitle"));
		Random rd = new Random();
		int fid = rd.nextInt(10000);
		System.out.println("fid ------ " + fid);
		System.out.println("FID=======" + requestBody.get("fdate"));
		favorite.setFid(fid);
		favorite.setFstart((String) requestBody.get("fstart"));
		favorite.setFend((String) requestBody.get("fend"));
		favorite.setFarea((String) requestBody.get("farea"));
		favorite.setFdate((String) requestBody.get("fdate"));
		favorite.setFnotepad((String) requestBody.get("fnotepad"));
		biz.addFavorite(favorite);

		// 생성된 favorite목록에서 auto increment된 fid값을 불러오는 작업
		// ftitle 미리 검사하는 로직 짜야함 *****************************혹시라도 같은 난수 생성으로 조회
		// 안될떄를대비해야함 (나중에)

		// tour목록의 contentid들을 위에서 뽑아둔 fid값으로 묶어서 favoriteList에 저장
		Map<String, Object> saveTourList = (Map<String, Object>) requestBody.get("saveTourList");
		ArrayList<Map<String, String>> saveTourList1 = (ArrayList<Map<String, String>>) saveTourList
				.get("saveTourList");

		for (int i = 0; i < saveTourList1.size(); i++) {
			FavoriteList favoriteList = new FavoriteList();
			favoriteList.setFid(fid);
			favoriteList.setContentid(Integer.parseInt(saveTourList1.get(i).get("contentid")));

			biz.addFavoriteList(favoriteList);
		}

		// contentlist에 저장 => 저장하기 전 tour목록에서 기존의 contentlist와 중복저장 막기 위하여 검사진행
		// contentlist에서 겹치는 항목 검사하기위해 먼저 불러오기
		List<Integer> cList = biz.contentSelectAll();
		List<Map<String, String>> removeList = new ArrayList<>();
		for (Map<String, String> item : saveTourList1) {
			String contentIdStr = item.get("contentid"); // contentid 값을 문자열변환

			// cList에 해당 contentId가 있는지 확인
			if (cList.contains(Integer.parseInt(contentIdStr))) {
				removeList.add(item); // 일치하는 경우 제거할 리스트에 추가
			}
		}
		// 제거할 리스트의 항목을 saveTourList1에서 제거
		saveTourList1.removeAll(removeList);
		System.out.println("수정된 saveTourList1 : " + saveTourList1);

		for (int i = 0; i < saveTourList1.size(); i++) {
			ContentList contentlist = new ContentList();
			contentlist.setContentid(Integer.parseInt(saveTourList1.get(i).get("contentid")));
			contentlist.setCtitle(saveTourList1.get(i).get("ctitle"));
			contentlist.setCaddr(saveTourList1.get(i).get("caddr1"));
			contentlist.setCtel(saveTourList1.get(i).get("ctel"));
			contentlist.setCfirstimage(saveTourList1.get(i).get("cfirstimage"));
			contentlist.setCsecondimage(saveTourList1.get(i).get("csecondimage"));
			contentlist.setClatitude(Double.parseDouble(saveTourList1.get(i).get("clatitude")));
			contentlist.setClongitude(Double.parseDouble(saveTourList1.get(i).get("clongitude")));
			contentlist.setCeventstartdate(saveTourList1.get(i).get("ceventstartdate"));
			contentlist.setCeventenddate(saveTourList1.get(i).get("ceventenddate"));
			contentlist.setContenttypeid(Integer.parseInt(saveTourList1.get(i).get("contenttypeid")));
			System.out.println(saveTourList1.get(i).get("cfirstimg"));
			System.out.println(contentlist.getClatitude());
			System.out.println(contentlist.getClongitude());

			// 새로운 contentList저장
			biz.addContentList(contentlist);
		}

		return "성공";
	}

	@RequestMapping("/loadProfile")
	public CHUser loadProfile(@RequestBody Map<String, String> uid) {
		String userid = uid.get("uid");
		System.out.println(userid);
		CHUser user = biz.loadProfile(userid);
		System.out.println(user);
		return user;
	}

	@RequestMapping("/loadFavorite")
	public ArrayList<Favorite> loadFavorite(@RequestBody Map<String, String> uid) {
		String userid = uid.get("uid");

		ArrayList<Favorite> list = biz.loadFavorites(userid);

		return list;
	}

	@RequestMapping("/loadFavoriteList")
	public ArrayList<ContentList> loadFavoriteList(@RequestBody String favorFid) {
		ArrayList<ContentList> list = biz.loadFavoriteList(favorFid);

		return list;
	}

	@RequestMapping("/getLongLat")
	public AreaCodeDto getWeather(@RequestBody String MainAreaCode) {
		System.out.println("안녕하세요 " + MainAreaCode);
		AreaCodeDto AreaDto = biz.getLongLat(MainAreaCode);
		System.out.println(AreaDto);
		return AreaDto;
	}

	@RequestMapping("/deleteUser")
	public String deleteUser(@RequestBody Map<String, String> userid) {
		String uid = userid.get("userid");
		if (biz.deleteUser(uid) > 0) {
			System.out.println("성공");
		} else {
			System.out.println("실패");
		}
		return "성공";
	}

	@RequestMapping("/getFavorArea")
	public Favorite getFavorARea(@RequestBody String favorFid) {
		Favorite favor = new Favorite();
		favor = biz.getFavorArea(favorFid);
		return favor;

	}

	@RequestMapping("/getFavorNotepad")
	public String getFavorNotepad(@RequestBody String favorFid) {
		String note = biz.getFavorNotepad(favorFid);
		return note;
	}
	
	@RequestMapping("/updateProfile")
	public String updateProfile(@RequestBody Map<String, String> requestBody) {
		String uid = requestBody.get("uid");
		String uprofile = requestBody.get("uprofile");
		
		if(biz.updateProfile(uid, uprofile) > 0) {
			return "성공"; 
		}else
			return "실패";
	}
}
