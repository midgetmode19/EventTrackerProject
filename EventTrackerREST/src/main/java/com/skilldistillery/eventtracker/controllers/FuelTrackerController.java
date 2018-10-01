package com.skilldistillery.eventtracker.controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.eventtracker.entities.FuelTracker;
import com.skilldistillery.eventtracker.service.FuelTrackerService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost:4202" })
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
	public FuelTracker create(@RequestBody FuelTracker entry, HttpServletResponse resp){
		FuelTracker newEntry = fts.newEntry(entry);
		if (newEntry != null && newEntry.getId() != 0) {
			resp.setStatus(201);
		} else {
			resp.setStatus(500);
		}
		return newEntry;
	}
	@RequestMapping(path = "entries/{id}", method = RequestMethod.PATCH)
	public FuelTracker update(@RequestBody String json, @PathVariable Integer id, HttpServletResponse resp) {
		FuelTracker patchedEntry = fts.patchEntry(json, id);
		if (patchedEntry != null) {
			resp.setStatus(202);
		} else {
			resp.setStatus(500);
		}
		return patchedEntry;
 	}
	@RequestMapping(path = "entries/{id}", method = RequestMethod.PUT)
	public FuelTracker replace(@RequestBody FuelTracker entry, @PathVariable Integer id, HttpServletResponse resp) {
		FuelTracker replacedEntry = fts.replaceEntry(entry, id);
		if (replacedEntry != null) {
			resp.setStatus(202);
		}
		else {
			resp.setStatus(500);
		}
		return replacedEntry;
	}
	@RequestMapping(path = "entries/{id}", method = RequestMethod.DELETE)
	public Boolean destroy(@PathVariable Integer id, HttpServletResponse resp) {
		Boolean entryDeleted = fts.deleteEntry(id);
		if (entryDeleted == true) {
			resp.setStatus(202);
		} else {
			resp.setStatus(500);
		}
		return entryDeleted;
	}
}
