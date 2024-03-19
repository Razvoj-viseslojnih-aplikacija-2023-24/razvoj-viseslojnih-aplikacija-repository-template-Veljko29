package rva.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import rva.models.Predmet;
import rva.models.Sud;
import rva.services.PredmetService;
import rva.services.SudService;

public class PredmetController {
	
	@Autowired
	private PredmetService service;
	
	@Autowired
	private SudService sudService;
	
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
