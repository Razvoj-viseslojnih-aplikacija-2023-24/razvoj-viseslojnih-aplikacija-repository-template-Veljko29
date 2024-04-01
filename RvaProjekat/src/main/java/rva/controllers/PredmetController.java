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

import rva.models.Predmet;
import rva.models.Sud;
import rva.services.PredmetService;
import rva.services.SudService;

public class PredmetController {
	
	@Autowired
	private PredmetService service;
	
	@Autowired
	private SudService sudService;
	
	@GetMapping("/predmet")
	 //duza verzija GetMapping
	//@RequestMapping(method = RequestMethod.GET, path = "/sud")
	public List<Predmet> getAllPredmets(){
		return service.getAll();
	}
	
	@GetMapping("/predmet/id/{id}")
	public ResponseEntity<?> getPredmetById(@PathVariable int id) {
		
		Optional<Predmet> predmet = service.findById(id); //klasa optional obmotava objekat kako bismo koristili null point exceptione, pa sluzi radi provere
		
		if(predmet.isPresent()) {
			return ResponseEntity.ok(predmet.get());
		}
		return ResponseEntity.status(404).body("Resources with requested ID: " + id + "does not exist!");
	}
	
	@GetMapping("/predmet/aktivan/{aktivan}")
	public ResponseEntity<?> getPredmetByAktivan (@PathVariable boolean aktivan)
	{
		List<Predmet> predmets = service.getPredmetsByAktivan(aktivan);
		if(predmets.isEmpty()) {
			return ResponseEntity.status(404).body("Resources with Naziv: " + aktivan + 
					" do not exist");
		}
		return ResponseEntity.ok(predmets);
		
	}
	
	@PostMapping("/predmet") //pravimo novi resurs
	public ResponseEntity<?> createPredmet(@RequestBody Predmet predmet){
		if(service.existById(predmet.getId())) {
			return ResponseEntity.status(409).body("Resource already exists");
		}
		Predmet savedPredmet = service.create(predmet);
		URI uri = URI.create("predmet/id/" + savedPredmet.getId());
		return ResponseEntity.created(uri).body(savedPredmet);
		
	}
	
	@PutMapping("/predmet/id/{id}")
	public ResponseEntity<?> updatePredmet (@RequestBody Predmet predmet, @PathVariable int id){
		Optional<Predmet> updatedPredmet = service.update(predmet, id);
		if(updatedPredmet.isPresent()) {
            	return ResponseEntity.ok(updatedPredmet.get());		
		}
		return ResponseEntity.status(404).body("Resource with requested ID: " + id + " could not be updated because it does not exist!");
	}
	
	@DeleteMapping("/predmet/id/{id}")
	public ResponseEntity<?> deletePredmet(@PathVariable int id) {
		if(service.existById(id)) {
			service.delete(id);
			return ResponseEntity.ok("Resource with ID: " + id + " has been "
					+ "successfully deleted");
		}
			return ResponseEntity.status(404).body("Resource with ID: " + id + 
					" couldn't be deleted because it doesn't exist");
		}
	
	@GetMapping("/predmet/sud/{foreignKey}")
	public ResponseEntity<?> getStavkeBySuds(@PathVariable int foreignKey){
		Optional<Sud> sud = sudService.findById(foreignKey);
		if(sud.isPresent()) {
			List<Predmet> predmeti = service.getByForeignKey(sud.get());
			if(!predmeti.isEmpty()) {
				return ResponseEntity.ok(predmeti);
			}
			return ResponseEntity.status(404).body("Resources with foreign key: " + foreignKey + " do not exist!");
		}
		return ResponseEntity.status(404).body("Invalid foreign key!");
	}

}
