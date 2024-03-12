package rva.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import rva.models.Sud;

@Repository
public interface SudRepository extends JpaRepository<Sud, Integer> {
	
      List<Sud>findByNazivContainingIgnoreCase(String naziv);	

}
