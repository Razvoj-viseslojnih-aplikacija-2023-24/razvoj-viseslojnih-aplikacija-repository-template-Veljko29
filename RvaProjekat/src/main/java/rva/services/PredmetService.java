package rva.services;

import java.util.List;

import org.springframework.stereotype.Service;

import rva.models.Predmet;
import rva.models.Sud;

@Service
public interface PredmetService extends CrudService<Predmet> {
	
	List<Predmet> getPredmetsByAktivan(boolean aktivan);
	
	List<Predmet> getByForeignKey(Sud sud);

	List<Predmet> getAll();

}
