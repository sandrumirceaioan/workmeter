import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListsService } from '../../shared/services/lists/lists.service';

@Component({
  selector: 'list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.css']
})
export class ListEditComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private listsService: ListsService
  ) { }

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.params);
  }

}
