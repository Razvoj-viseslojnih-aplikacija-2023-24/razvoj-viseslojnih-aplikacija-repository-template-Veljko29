package rva.implementation;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import rva.models.Ucesnik;
import rva.repository.UcesnikRepository;
import rva.services.UcesnikService;

@Component
public class UcesnikServiceImpl implements UcesnikService {
	
	@Autowired
	private UcesnikRepository repo;

	@Override
	public List<Ucesnik> getAll() {
		// TODO Auto-generated method stub
		return repo.findAll();
	}

	@Override
	public boolean existById(int id) {
		// TODO Auto-generated method stub
		return repo.existsById(id);
	}

	@Override
	public Ucesnik create(Ucesnik t) {
		return repo.save(t);
	}

	@Override
	public Optional<Ucesnik> update(Ucesnik t, int id) {
		if(existById(id)) {
			t.setId(id);
			return Optional.of(repo.save(t));
		}
		return Optional.empty();
	}

	@Override
	public void delete(int id) {
		repo.deleteById(id);

	}

	@Override
	public List<Ucesnik> getUcesniksByMbr(String mbr) {
		// TODO Auto-generated method stub
		return repo.findByMbrContainingIgnoreCase(mbr);
	}

	@Override
	public Optional<Ucesnik> findById(int id) {
		// TODO Auto-generated method stub
		return repo.findById(id);
	}


}
