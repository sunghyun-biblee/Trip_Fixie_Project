package com.main.trip.fixied.model.dto;

public class Favorite {
	
	private String uid;
	private String ftitle;
	private int fid;
	
	public Favorite() {
		super();
	}

	public Favorite(String uid, String ftitle, int fid) {
		super();
		this.uid = uid;
		this.ftitle = ftitle;
		this.fid = fid;
	}

	public String getUid() {
		return uid;
	}

	public void setUid(String uid) {
		this.uid = uid;
	}

	public String getFtitle() {
		return ftitle;
	}

	public void setFtitle(String ftitle) {
		this.ftitle = ftitle;
	}

	public int getFid() {
		return fid;
	}

	public void setFid(int fid) {
		this.fid = fid;
	}
	
	
}
