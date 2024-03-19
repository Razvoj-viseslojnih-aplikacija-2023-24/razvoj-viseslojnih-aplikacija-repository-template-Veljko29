package rva.implementation;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import rva.models.Predmet;
import rva.models.Rociste;
import rva.models.Ucesnik;
import rva.repository.RocisteRepository;
import rva.services.RocisteService;

@Component
public class RocisteServiceImpl implements RocisteService {
	
	@Autowired
	private RocisteRepository repo;

	@Override
	public List<Rociste> getAll() {
		// TODO Auto-generated method stub
		return repo.findAll();
	}

	@Override
	public boolean existById(int id) {
		// TODO Auto-generated method stub
		return repo.existsById(id);
	}

	@Override
	public Rociste create(Rociste t) {
		// TODO Auto-generated method stub
		return repo.save(t);

	}

	@Override
	public Optional<Rociste> update(Rociste t, int id) {
		// TODO Auto-generated method stub
		if(existById(id)) {
			t.setId(id);
			return Optional.of(repo.save(t));
		}
		return Optional.empty();

	}

	@Override
	public void delete(int id) {
		// TODO Auto-generated method stub
		repo.deleteById(id);
	}

	@Override
	public List<Rociste> getRocistesBySudnica(String sudnica) {
		// TODO Auto-generated method stub
		return repo.findBySudnicaContainingIgnoreCase(sudnica);
	}


	@Override
	public List<Rociste> getByForeignKey(Ucesnik ucesnik) {
		// TODO Auto-generated method stub
		return repo.findByUcesnik(ucesnik);
	}

	@Override
	public List<Rociste> getByForeignKey(Predmet predmet) {
		// TODO Auto-generated method stub
		return repo.findByPredmet(predmet);
	}

	@Override
	public Optional<Rociste> findById(int id) {
		// TODO Auto-generated method stub
		return repo.findById(id);
	}

}
