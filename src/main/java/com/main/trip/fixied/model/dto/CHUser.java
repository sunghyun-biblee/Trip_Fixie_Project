package com.main.trip.fixied.model.dto;

public class CHUser {

	private String uid;
	private String uemail;
	private String uname;
	private String unickname;
	private String uprofile;

	public CHUser() {
		super();
	}
	
	public CHUser(String uid, String uemail, String uname, String unickname, String uprofile) {
		super();
		this.uid = uid;
		this.uemail = uemail;
		this.uname = uname;
		this.unickname = unickname;
		this.uprofile = uprofile;
	}
	
	public String getUid() {
		return uid;
	}
	public void setUid(String uid) {
		this.uid = uid;
	}
	public String getUemail() {
		return uemail;
	}
	public void setUemail(String uemail) {
		this.uemail = uemail;
	}
	public String getUname() {
		return uname;
	}
	public void setUname(String uname) {
		this.uname = uname;
	}
	public String getUnickname() {
		return unickname;
	}
	public void setUnickname(String unickname) {
		this.unickname = unickname;
	}
	public String getUprofile() {
		return uprofile;
	}
	public void setUprofile(String uprofile) {
		this.uprofile = uprofile;
	}
	
}
