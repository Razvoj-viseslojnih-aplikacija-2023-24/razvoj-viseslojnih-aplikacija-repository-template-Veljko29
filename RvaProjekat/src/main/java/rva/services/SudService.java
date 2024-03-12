package rva.services;

import java.util.List;

import org.springframework.stereotype.Service;

import rva.models.Sud;

@Service
public interface SudService extends CrudService<Sud> {

	List<Sud> getSudsByNaziv(String naziv);
}
