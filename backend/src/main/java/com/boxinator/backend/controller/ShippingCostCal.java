package com.boxinator.backend.controller;

public class ShippingCostCal {
	private final double sweden = 1.3;
	private final double china = 4.0;
	private final double brazil = 8.6;
	private final double australia = 7.2;

	public ShippingCostCal() {
		
	}
	

	public double costCalculator(double weight, String country) {
		 switch (country){
         case "Sweden":
             return weight * sweden;
         case "China":
             return weight * china;
         case "Brazil":
             return weight * brazil;
         case "Australia":
             return weight * australia;
	     }
		 
	     return 0;
	}
	

}
