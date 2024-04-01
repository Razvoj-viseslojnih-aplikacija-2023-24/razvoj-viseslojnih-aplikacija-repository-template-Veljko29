package rva.controllers;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import rva.models.Ucesnik;
import rva.services.UcesnikService;

public class UcesnikController {
	
	@Autowired
	private UcesnikService service;
	
	@GetMapping("/ucesnik")
	 //duza verzija GetMapping
	//@RequestMapping(method = RequestMethod.GET, path = "/sud")
	public List<Ucesnik> getAllUcesniks(){
		return service.getAll();
	}
	
	@GetMapping("/ucesnik/id/{id}")
	public ResponseEntity<?> getUcesnikById(@PathVariable int id) {
		
		Optional<Ucesnik> ucesnik = service.findById(id); //klasa optional obmotava objekat kako bismo koristili null point exceptione, pa sluzi radi provere
		
		if(ucesnik.isPresent()) {
			return ResponseEntity.ok(ucesnik.get());
		}
		return ResponseEntity.status(404).body("Resources with requested ID: " + id + "does not exist!");
	}
	
	@GetMapping("/ucesnik/mbr/{mbr}")
	public ResponseEntity<?> getSudByMbr (@PathVariable String mbr)
	{
		List<Ucesnik> ucesniks = service.getUcesniksByMbr(mbr);
		if(ucesniks.isEmpty()) {
			return ResponseEntity.status(404).body("Resources with Naziv: " + mbr + 
					" do not exist");
		}
		return ResponseEntity.ok(ucesniks);
		
	}
	
	@PostMapping("/ucesnik") //pravimo novi resurs
	public ResponseEntity<?> createUcesnik(@RequestBody Ucesnik ucesnik){
		if(service.existById(ucesnik.getId())) {
			return ResponseEntity.status(409).body("Resource already exists");
		}
		Ucesnik savedUcesnik = service.create(ucesnik);
		URI uri = URI.create("sud/id/" + savedUcesnik.getId());
		return ResponseEntity.created(uri).body(savedUcesnik);
		
	}
	
	@PutMapping("/ucesnik/id/{id}")
	public ResponseEntity<?> updateUcesnik (@RequestBody Ucesnik ucesnik, @PathVariable int id){
		Optional<Ucesnik> updatedUcesnik = service.update(ucesnik, id);
		if(updatedUcesnik.isPresent()) {
            	return ResponseEntity.ok(updatedUcesnik.get());		
		}
		return ResponseEntity.status(404).body("Resource with requested ID: " + id + " could not be updated because it does not exist!");
	}
	
	@DeleteMapping("/ucesnik/id/{id}")
	public ResponseEntity<?> deleteUcesnik(@PathVariable int id) {
		if(service.existById(id)) {
			service.delete(id);
			return ResponseEntity.ok("Resource with ID: " + id + " has been "
					+ "successfully deleted");
		}
			return ResponseEntity.status(404).body("Resource with ID: " + id + 
					" couldn't be deleted because it doesn't exist");
		}
}
