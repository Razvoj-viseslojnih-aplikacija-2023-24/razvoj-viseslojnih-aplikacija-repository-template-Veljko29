package rva.services;

import java.util.List;

import org.springframework.stereotype.Service;

import rva.models.Predmet;
import rva.models.Rociste;
import rva.models.Ucesnik;

@Service
public interface RocisteService extends CrudService<Rociste> {
	
	List<Rociste> getRocistesBySudnica(String sudnica);
	
	
	List<Rociste> getByForeignKey(Ucesnik ucesnik);
	List<Rociste> getByForeignKey(Predmet predmet);

}
