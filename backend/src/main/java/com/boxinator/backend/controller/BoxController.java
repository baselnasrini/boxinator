package com.boxinator.backend.controller;

import java.net.URISyntaxException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.boxinator.backend.model.Box;
import com.boxinator.backend.repository.BoxRepository;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class BoxController {
	private ShippingCostCal shippingCal = new ShippingCostCal();
	
	@Autowired
	private BoxRepository boxRepo;
	
	@GetMapping("/listboxes")
	public String getAllBoxes(){
		List<Box> boxesList = boxRepo.findAll();
		JsonObject jo;
		JsonArray arr = new JsonArray();
		
		for (Box box: boxesList) {
			jo = new JsonObject();
			jo.addProperty("id", box.getId());
			jo.addProperty("name", box.getName());
			jo.addProperty("weight", box.getWeight());
			jo.addProperty("cost", shippingCal.costCalculator(box.getWeight(), box.getCountry()));
			jo.addProperty("color", box.getColor());
			jo.addProperty("country", box.getCountry());
			arr.add(jo);
		}
		return new Gson().toJson(arr);
	}
	
	@PostMapping("/addbox")
	ResponseEntity<Box> addBox(@Valid @RequestBody Box box) throws URISyntaxException{
		System.out.print(box);
		Box result = boxRepo.save(box);
		return ResponseEntity.ok().body(result);
	}
	
	  @ExceptionHandler(Exception.class)
	    public ResponseEntity<String> handleException(Exception e) {
		  System.out.print(e.toString());
		  	if (e.getClass() == MethodArgumentNotValidException.class) {
		  		return ResponseEntity
		                .status(HttpStatus.BAD_REQUEST)
		                .body("Bad Request Error: 400 \n Box arguments are not valid.");
		  	} else {
		  		return ResponseEntity
		                .status(HttpStatus.INTERNAL_SERVER_ERROR)
		                .body("Server Error: 500");
		  	}
	    }      
	
}
