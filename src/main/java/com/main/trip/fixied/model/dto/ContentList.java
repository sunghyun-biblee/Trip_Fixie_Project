package com.main.trip.fixied.model.dto;


public class ContentList {

	private int contentid;
	private String ctitle;
	private String caddr;
	private String ctel;
	private String ceventstartdate;
	private String ceventenddate;
	private String cfirstimage;
	private String csecondimage;
	private double clatitude;
	private double clongitude;
	public ContentList() {
		super();
		// TODO Auto-generated constructor stub
	}
	public ContentList(int contentid, String ctitle, String caddr, String ctel, String ceventstartdate,
			String ceventenddate, String cfirstimage, String csecondimage, double clatitude, double clongitude) {
		super();
		this.contentid = contentid;
		this.ctitle = ctitle;
		this.caddr = caddr;
		this.ctel = ctel;
		this.ceventstartdate = ceventstartdate;
		this.ceventenddate = ceventenddate;
		this.cfirstimage = cfirstimage;
		this.csecondimage = csecondimage;
		this.clatitude = clatitude;
		this.clongitude = clongitude;
	}
	public int getContentid() {
		return contentid;
	}
	public void setContentid(int contentid) {
		this.contentid = contentid;
	}
	public String getCtitle() {
		return ctitle;
	}
	public void setCtitle(String ctitle) {
		this.ctitle = ctitle;
	}
	public String getCaddr() {
		return caddr;
	}
	public void setCaddr(String caddr) {
		this.caddr = caddr;
	}
	public String getCtel() {
		return ctel;
	}
	public void setCtel(String ctel) {
		this.ctel = ctel;
	}
	public String getCeventstartdate() {
		return ceventstartdate;
	}
	public void setCeventstartdate(String ceventstartdate) {
		this.ceventstartdate = ceventstartdate;
	}
	public String getCeventenddate() {
		return ceventenddate;
	}
	public void setCeventenddate(String ceventenddate) {
		this.ceventenddate = ceventenddate;
	}
	public String getCfirstimage() {
		return cfirstimage;
	}
	public void setCfirstimage(String cfirstimage) {
		this.cfirstimage = cfirstimage;
	}
	public String getCsecondimage() {
		return csecondimage;
	}
	public void setCsecondimage(String csecondimage) {
		this.csecondimage = csecondimage;
	}
	public double getClatitude() {
		return clatitude;
	}
	public void setClatitude(double clatitude) {
		this.clatitude = clatitude;
	}
	public double getClongitude() {
		return clongitude;
	}
	public void setClongitude(double clongitude) {
		this.clongitude = clongitude;
	}
	@Override
	public String toString() {
		return "ContentList [contentid=" + contentid + ", ctitle=" + ctitle + ", caddr=" + caddr + ", ctel=" + ctel
				+ ", ceventstartdate=" + ceventstartdate + ", ceventenddate=" + ceventenddate + ", cfirstimage="
				+ cfirstimage + ", csecondimage=" + csecondimage + ", clatitude=" + clatitude + ", clongitude="
				+ clongitude + "]";
	}
	
}