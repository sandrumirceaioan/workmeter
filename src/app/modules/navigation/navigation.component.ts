import { Component, OnInit, Input } from '@angular/core';
import { Feature } from '../../models/feature.model';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @Input() userAccess: number;
  items: Feature[] = [    
    { title: 'Tasks', url: './tasks', rank: 2, allowed: 'user', order: 3},
    { title: 'Lists', url: './lists', rank: 1, allowed: 'mp', order: 2},
    { title: 'Projects', url: './projects', rank: 0, allowed: 'owner', order: 1},
    { title: 'Workmeter', url: './workmeter', rank: 2, allowed: 'user', order: 4}
  ];
  constructor() { }

  ngOnInit() {
  }

}
