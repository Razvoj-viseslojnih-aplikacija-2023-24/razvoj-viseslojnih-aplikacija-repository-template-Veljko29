package rva.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import rva.models.Predmet;
import rva.models.Rociste;
import rva.models.Sud;
import rva.models.Ucesnik;

@Repository
public interface RocisteRepository extends JpaRepository<Rociste, Integer> {
          
	List<Rociste>findBySudnicaContainingIgnoreCase(String sudnica);	
	
	List<Rociste>findByUcesnik(Ucesnik ucesnik);
	List<Rociste>findByPredmet(Predmet predmet);
}
