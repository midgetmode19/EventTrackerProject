package com.skilldistillery.eventtracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.eventtracker.entities.FuelTracker;

public interface FuelTrackerRepository extends JpaRepository<FuelTracker, Integer> {

}
