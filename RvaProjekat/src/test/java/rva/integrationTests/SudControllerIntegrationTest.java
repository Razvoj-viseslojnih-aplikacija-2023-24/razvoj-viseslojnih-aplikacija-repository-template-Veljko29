package rva.integrationTests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.assertj.core.api.Assert;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import rva.models.Sud;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class SudControllerIntegrationTest {
@Autowired
TestRestTemplate template;

int highestId;

void createHighestId() {
	ResponseEntity<List<Sud>> response = template
			.exchange("/sud/naziv/" , HttpMethod.GET,
					null,
					new ParameterizedTypeReference<List<Sud>>() {} );
	ArrayList<Sud> list = (ArrayList<Sud>) response.getBody();
	for(int i = 0 ; i < list.size() ; i++) {
		if(highestId <= list.get(i).getId()) {
			highestId = list.get(i).getId() + 1;
		}
	}
}
public void getHighestId() {
	createHighestId();
    highestId--;
}

@Test
@Order
void testGetAllSuds() {
	ResponseEntity<List<Sud>> response = template
			.exchange("/sud", HttpMethod.GET,
					null,
					new ParameterizedTypeReference<List<Sud>>() {} );
	
	int statusCode = response.getStatusCode().value();
	List<Sud> sudovi = response.getBody();
	assertEquals(200,statusCode);
	assertTrue(!sudovi.isEmpty());
}
@Test
@Order(2)
void testGetSudById() {
	int id=1;
	ResponseEntity<Sud> response = template
			.exchange("/sud/id/" + id, HttpMethod.GET,
					null,
					Sud.class);
	
	int statusCode = response.getStatusCode().value();
	assertEquals(200, statusCode);
	assertEquals(id, response.getBody().getId());
}
@Test
@Order(3)
void testGetSudByNaziv() {
	String naziv = "Moja";
	ResponseEntity<List<Sud>> response = template
			.exchange("/sud/naziv/" + naziv, HttpMethod.GET,
					null,
					new ParameterizedTypeReference<List<Sud>>() {} );
	
	int statusCode = response.getStatusCode().value();
	List<Sud> sudovi = response.getBody();
	assertEquals(200,statusCode);
	assertNotNull(sudovi.get(0));
	for(Sud s: sudovi) {
		assertTrue(s.getNaziv().contains(naziv));
	}
}

@Test
@Order(4)
void testCreateSud() {
	Sud sud = new Sud();
	sud.setNaziv("POST NAZIV");
	sud.setAdresa("POST ADRESA");
	
	HttpEntity<Sud> entity = new HttpEntity<Sud>(sud);
	createHighestId();
	ResponseEntity<Sud> response = template
			.exchange("/sud", HttpMethod.POST,
					entity, Sud.class );
	
	int statusCode = response.getStatusCode().value();
	
	assertEquals(201,statusCode);
	assertEquals("/sud/id/" + highestId, response.getHeaders().getLocation().getPath());
	assertEquals(sud.getNaziv(), response.getBody().getNaziv());
	assertEquals(sud.getAdresa(), response.getBody().getAdresa());
	
}

@Test
@Order(5)
void testUpdateSud() {
	Sud sud = new Sud();
	sud.setNaziv("PUT NAZIV");
	sud.setAdresa("PUT ADRESA");
	
	HttpEntity<Sud> entity = new HttpEntity<Sud>(sud);
	getHighestId();
	ResponseEntity<Sud> response = template
			.exchange("/sud/id" + highestId, HttpMethod.PUT,
					entity, Sud.class );
	
	int statusCode = response.getStatusCode().value();
	
	assertEquals(200,statusCode);
	assertTrue(response.getBody() instanceof Sud);
	assertEquals(sud.getNaziv(), response.getBody().getNaziv());
	assertEquals(sud.getAdresa(), response.getBody().getAdresa());
}
@Test
@Order(6)
void testDeleteSudById() {
	getHighestId();
	ResponseEntity<String> response = template
			.exchange("/sud/id" + highestId, HttpMethod.DELETE,
					null, String.class );
	int statusCode = response.getStatusCode().value();
	
	assertEquals(200, statusCode);
	assertTrue(response.getBody().contains("has been successfully deleted"));
}


}

