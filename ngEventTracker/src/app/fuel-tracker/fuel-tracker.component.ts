import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Entry } from '../models/entry';
import { FuelTrackerService } from './../fuel-tracker.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-fuel-tracker',
  templateUrl: './fuel-tracker.component.html',
  styleUrls: ['./fuel-tracker.component.css']
})
export class FuelTrackerComponent implements OnInit {
  entries: Entry[] = [];
  selected: Entry = null;
  newEntry: Entry = new Entry();
  editEntry: Entry = null;

  reload() {
    this.ftService.index().subscribe(
      data => {
        this.entries = data;
      },
      err => console.error('Observer got an error ' + err)
    );
  }
  allEntries() {
    this.selected = null;
  }
  addEntry() {
    this.ftService.create(this.newEntry).subscribe(
      data => {
        console.log('returned data: ');
        console.log(data);
        this.reload();
        this.newEntry = new Entry();
      },
      err => console.error('Observer received an error: ' + err)
    );
  }
  displayEntry(entry: Entry) {
    this.selected = entry;
  }
  setEditEntry() {
    this.editEntry = Object.assign({}, this.selected);
  }
  public updateEntry(entry: Entry, setSelected: boolean) {
    this.ftService.update(entry).subscribe(data => {
      if (setSelected) {
        this.selected = entry;
      }
      this.reload();
      this.editEntry = null;
    });
  }
  cancel() {
    this.editEntry = null;
  }
  deleteTodo(id: number) {
    this.ftService.destroy(id).subscribe(
      data => {
        this.reload();
      },
      err => console.error('Observer received an error: ' + err)
    );
  }
  constructor(
    private ftService: FuelTrackerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.reload();
    // const entryId = this.activatedRoute.snapshot.paramMap.get('id');
    // if (entryId) {
    //   this.ftService.show(entryId).subscribe(data => {
    //     if (data) {
    //       this.selected = data;
    //     } else {
    //       this.router.navigateByUrl('/notFound');
    //     }
    //   });
    // }
  }
}
