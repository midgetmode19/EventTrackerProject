package com.skilldistillery.eventtracker.entities;

import java.sql.Date;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "fuel_tracker")
public class FuelTracker {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "trip_miles")
	private Integer miles;

	@Column(name = "fuel_cost")
	private Double fuelCost;

	@Column(name = "gallons_per_fill")
	private Double gallonsPerFill;

	@Column(name = "date_of_refuel")
	private LocalDate refuelDate;

	public FuelTracker() {
	}

	public FuelTracker(int id, Integer miles, Double fuelCost, Double gallonsPerFill, LocalDate refuelDate) {
		this.id = id;
		this.miles = miles;
		this.fuelCost = fuelCost;
		this.gallonsPerFill = gallonsPerFill;
		this.refuelDate = refuelDate;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Integer getMiles() {
		return miles;
	}

	public void setMiles(Integer miles) {
		this.miles = miles;
	}

	public Double getFuelCost() {
		return fuelCost;
	}

	public void setFuelCost(Double fuelCost) {
		this.fuelCost = fuelCost;
	}

	public Double getGallonsPerFill() {
		return gallonsPerFill;
	}

	public void setGallonsPerFill(Double gallonsPerFill) {
		this.gallonsPerFill = gallonsPerFill;
	}

	public LocalDate getRefuelDate() {
		return refuelDate;
	}

	public void setRefuelDate(LocalDate refuelDate) {
		this.refuelDate = refuelDate;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((fuelCost == null) ? 0 : fuelCost.hashCode());
		result = prime * result + ((gallonsPerFill == null) ? 0 : gallonsPerFill.hashCode());
		result = prime * result + id;
		result = prime * result + ((miles == null) ? 0 : miles.hashCode());
		result = prime * result + ((refuelDate == null) ? 0 : refuelDate.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		FuelTracker other = (FuelTracker) obj;
		if (fuelCost == null) {
			if (other.fuelCost != null)
				return false;
		} else if (!fuelCost.equals(other.fuelCost))
			return false;
		if (gallonsPerFill == null) {
			if (other.gallonsPerFill != null)
				return false;
		} else if (!gallonsPerFill.equals(other.gallonsPerFill))
			return false;
		if (id != other.id)
			return false;
		if (miles == null) {
			if (other.miles != null)
				return false;
		} else if (!miles.equals(other.miles))
			return false;
		if (refuelDate == null) {
			if (other.refuelDate != null)
				return false;
		} else if (!refuelDate.equals(other.refuelDate))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "FuelTracker [id=" + id + ", miles=" + miles + ", fuelCost=" + fuelCost + ", gallonsPerFill="
				+ gallonsPerFill + ", refuelDate=" + refuelDate + "]";
	}

}
