package rva.models;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;

@Entity
public class Sud implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@SequenceGenerator(name = "SUD_SEQ_GENERATOR", sequenceName = "SUD_SEQ", 
	allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE,
	generator = "SUD_SEQ_GENERATOR")
	private int id;
	
	private String naziv;
	private String adresa;
	
	@OneToMany(mappedBy = "predmet") //vlasnik predmet-sud jeste predmet
	@JsonIgnore
	private List<Predmet> predmet;
	
	public Sud() {
		
	}
	
	public Sud(int id, String naziv, String adresa) {
		this.id = id;
		this.naziv = naziv;
		this.adresa = adresa;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public String getAdresa() {
		return adresa;
	}

	public void setAdresa(String adresa) {
		this.adresa = adresa;
	}

	public List<Predmet> getPredmet() {
		return predmet;
	}

	public void setPredmet(List<Predmet> predmet) {
		this.predmet = predmet;
	}
	
	

}
