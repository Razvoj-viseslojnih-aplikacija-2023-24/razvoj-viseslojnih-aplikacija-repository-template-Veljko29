package rva.implementation;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import rva.models.Sud;
import rva.repository.SudRepository;
import rva.services.SudService;

@Component
public class SudServiceImpl implements SudService {

	@Autowired
	private SudRepository repo;
	@Override
	public List<Sud> getAll() {
		// TODO Auto-generated method stub
		return repo.findAll();
	}

	@Override
	public boolean existById(int id) {
		// TODO Auto-generated method stub
		return repo.existsById(id);
	}

	@Override
	public Sud create(Sud t) {
		// TODO Auto-generated method stub
		return repo.save(t);
	}

	@Override
	public Optional<Sud> update(Sud t, int id) {
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
	public List<Sud> getSudsByNaziv(String naziv) {
		// TODO Auto-generated method stub
		return repo.findByNazivContainingIgnoreCase(naziv);
	}

	@Override
	public Optional<Sud> findById(int id) {
		// TODO Auto-generated method stub
		return repo.findById(id);
	}


}
