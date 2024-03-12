package rva.services;

import java.util.List;

import org.springframework.stereotype.Service;

import rva.models.Ucesnik;

@Service
public interface UcesnikService extends CrudService<Ucesnik> {
	
	List<Ucesnik> getUcesniksByMbr(String mbr);
	

}
