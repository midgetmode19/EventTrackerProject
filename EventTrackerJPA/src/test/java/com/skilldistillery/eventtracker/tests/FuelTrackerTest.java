package com.skilldistillery.eventtracker.tests;

import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.skilldistillery.eventtracker.entities.FuelTracker;

class FuelTrackerTest {
	private EntityManagerFactory emf;
	private EntityManager em;
	private FuelTracker ft;

	@BeforeEach
	void setUp() throws Exception {
		emf = Persistence.createEntityManagerFactory("eventtracker");
		em = emf.createEntityManager();
		ft = em.find(FuelTracker.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		emf.close();
	}	

	@Test
	void testFuelTracker() {
		assertEquals(318, ft.getMiles(), 1);
		assertEquals(32.96, ft.getFuelCost(), .01);
		assertEquals(10.893, ft.getGallonsPerFill(), .01);
	}

}
