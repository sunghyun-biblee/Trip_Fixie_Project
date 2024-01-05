package com.main.trip.fixied.model.dto;

public class AreaCodeDto {
	private String areaname;
	private int areacode;
	private double arealatitude;
	private double arealongitude;
	
	public AreaCodeDto() {
		super();
	}

	public AreaCodeDto(String areaname, int areacode, double arealatitude, double arealongitude) {
		super();
		this.areaname = areaname;
		this.areacode = areacode;
		this.arealatitude = arealatitude;
		this.arealongitude = arealongitude;
	}

	public String getAreaname() {
		return areaname;
	}

	public void setAreaname(String areaname) {
		this.areaname = areaname;
	}

	public int getAreacode() {
		return areacode;
	}

	public void setAreacode(int areacode) {
		this.areacode = areacode;
	}

	public double getArealatitude() {
		return arealatitude;
	}

	public void setArealatitude(double arealatitude) {
		this.arealatitude = arealatitude;
	}

	public double getArealongitude() {
		return arealongitude;
	}

	public void setArealongitude(double arealongitude) {
		this.arealongitude = arealongitude;
	}
	
	

}
