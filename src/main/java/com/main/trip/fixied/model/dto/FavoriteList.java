package com.main.trip.fixied.model.dto;

public class FavoriteList {
	
	private int fid;
	private int contentid;
	
	public FavoriteList() {	
		super();
	}
	
	public FavoriteList(int fid, int contentid) {
		super();
		this.fid = fid;
		this.contentid = contentid;
	}

	public int getFid() {
		return fid;
	}

	public void setFid(int fid) {
		this.fid = fid;
	}

	public int getContentid() {
		return contentid;
	}

	public void setContentid(int contentid) {
		this.contentid = contentid;
	}
	
	
	
}
