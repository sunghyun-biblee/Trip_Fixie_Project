package com.main.trip.fixied.model.dto;

public class Favorite {
	
	private String uid;
	private String ftitle;
	private int fid;
	private String fstart;
	private String fend;
	private String farea;
	private String fdate;
	
	public Favorite() {
		super();
	}

	public Favorite(String uid, String ftitle, int fid, String fstart, String fend, String farea, String fdate) {
		super();
		this.uid = uid;
		this.ftitle = ftitle;
		this.fid = fid;
		this.fstart = fstart;
		this.fend = fend;
		this.farea = farea;
		this.fdate = fdate;
	}

	public String getFstart() {
		return fstart;
	}

	public void setFstart(String fstart) {
		this.fstart = fstart;
	}

	public String getFend() {
		return fend;
	}

	public void setFend(String fend) {
		this.fend = fend;
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

	public String getFarea() {
		return farea;
	}

	public void setFarea(String farea) {
		this.farea = farea;
	}

	public String getFdate() {
		return fdate;
	}

	public void setFdate(String fdate) {
		this.fdate = fdate;
	}
	
	
}
