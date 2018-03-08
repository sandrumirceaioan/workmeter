import { Component, OnInit } from '@angular/core';
import { List } from '../../models/list.model';
import { ToastService } from '../../shared/services/toast/toast.service';
import { ActivatedRoute } from '@angular/router';
import { ListsService } from '../../shared/services/lists/lists.service';
import { ListsFilterPipe } from '../../shared/filters/lists-filter.pipe';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, state, animate, style, transition, keyframes } from '@angular/animations';

@Component({
  selector: 'lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter',
        animate('.3s ease-out', keyframes([
          style({ opacity: '0', transform: 'translateY(0)', offset:0 }),
          style({ opacity: '0.5', transform: 'translateY(25px)', offset:0.3 }),
          style({ opacity: '1', transform: 'translateY(0)', offset:1 })
        ])),
      ),
      transition(":leave", 
      animate('.2s ease-out', keyframes([
        style({ opacity: '1', transform: 'translateX(25%)', offset:0 }),
        style({ opacity: '0.3', transform: 'translateX(50%)', offset:0.5 }),
        style({ opacity: '0', transform: 'translateX(70%)', offset:1 })
      ]))
      )
    ]),
  ]
})
export class ListsComponent implements OnInit {
  listForm: FormGroup;
  addState: boolean = false;
  loader: boolean;
  searchTerm: string;
  lists: List[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private listsService: ListsService
  ) { }

  ngOnInit(): void {
    this.loader = true;
    this.listsService.getAll().subscribe((result) => {
        this.lists = result;
      },
      (error) => {
        this.toastService.toastTrigger({
          message: error.error.message,
          options: {type: 'error'}
        });
      },
      () => {
        this.loader = false;
      }
    );
    this.listForm = new FormGroup({
      listName: new FormControl('', Validators.required),
      listDescription: new FormControl('',Validators.required),
      listProject: new FormControl('',Validators.required)
    });
  }

  addList(): void {
    this.listsService.addList(this.listForm.value).subscribe(
      (result) => {
        this.toastService.toastTrigger({
          message: 'List added! ',
          options: {type: 'success'}
        });
        this.listForm.reset();
        this.addState = false;
        this.lists.unshift(result);
      },
      (error) => {
        this.toastService.toastTrigger({
          message: error.error.message,
          options: {type: 'error'}
        });
      });
  }

  onSearchChange(e){
    this.searchTerm = e;
  }

}
