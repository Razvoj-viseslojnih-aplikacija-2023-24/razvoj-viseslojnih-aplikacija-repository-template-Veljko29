package rva.implementation;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import rva.models.Predmet;
import rva.models.Sud;
import rva.repository.PredmetRepository;
import rva.services.PredmetService;

@Component
public class PredmetServiceImpl implements PredmetService {
	
	@Autowired
	private PredmetRepository repo;
	
	@Override
	public List<Predmet> getAll() {
		// TODO Auto-generated method stub
		return repo.findAll();
	}

	@Override
	public boolean existById(int id) {
		// TODO Auto-generated method stub
		return repo.existsById(id);

	}

	@Override
	public Predmet create(Predmet t) {
		// TODO Auto-generated method stub
		return repo.save(t);
	}

	@Override
	public Optional<Predmet> update(Predmet t, int id) {
		// TODO Auto-generated method stub
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
	public List<Predmet> getPredmetsByAktivan(boolean aktivan) {
		// TODO Auto-generated method stub
		return repo.findByAktivanEquals(aktivan);
	}


	@Override
	public List<Predmet> getByForeignKey(Sud sud) {
		// TODO Auto-generated method stub
		return repo.findBySud(sud);
	}

}
