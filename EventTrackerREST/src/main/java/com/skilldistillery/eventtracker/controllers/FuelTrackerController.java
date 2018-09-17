package com.skilldistillery.eventtracker.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.eventtracker.entities.FuelTracker;
import com.skilldistillery.eventtracker.service.FuelTrackerService;

@RestController
@RequestMapping("api")
public class FuelTrackerController {
	@Autowired
	private FuelTrackerService fts;
	
	@RequestMapping(path = "entries", method = RequestMethod.GET)
	public List<FuelTracker> index() {
		return fts.getAllEntries();
	}
	@RequestMapping(path = "entries/{id}", method = RequestMethod.GET)
	public FuelTracker show(@PathVariable Integer id) {
		return fts.getById(id);
	}
	@RequestMapping(path = "entries", method = RequestMethod.POST)
	public FuelTracker create(@RequestBody FuelTracker newEntry) {
		return fts.newEntry(newEntry);
	}
	@RequestMapping(path = "entries/{id}", method = RequestMethod.PATCH)
	public FuelTracker update(@RequestBody FuelTracker entry, @PathVariable Integer id) {
		return fts.updateEntry(entry, id);
	}
	@RequestMapping(path = "entries/{id}", method = RequestMethod.DELETE)
	public Boolean destroy(@PathVariable Integer id) {
		return fts.deleteEntry(id);
	}
}
