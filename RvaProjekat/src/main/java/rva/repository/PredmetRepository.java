package rva.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import rva.models.Predmet;
import rva.models.Sud;

@Repository
public interface PredmetRepository extends JpaRepository<Predmet, Integer> {
	
	List<Predmet>findByAktivanEquals(boolean aktivan);	
    List<Predmet>findBySud(Sud sud);
}
