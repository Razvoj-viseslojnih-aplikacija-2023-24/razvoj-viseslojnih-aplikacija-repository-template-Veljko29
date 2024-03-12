package rva.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import rva.models.Ucesnik;

@Repository
public interface UcesnikRepository extends JpaRepository<Ucesnik, Integer> {
	
	List<Ucesnik>findByMbrContainingIgnoreCase(String mbr);	

}
