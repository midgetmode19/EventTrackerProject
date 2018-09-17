package com.skilldistillery.eventtracker.service;

import java.util.List;

import com.skilldistillery.eventtracker.entities.FuelTracker;

public interface FuelTrackerService {
	List<FuelTracker> getAllEntries();
	FuelTracker getById(Integer id);
	FuelTracker newEntry(FuelTracker entry);
	FuelTracker updateEntry(FuelTracker entry, Integer id);
	Boolean deleteEntry(Integer id);
}
