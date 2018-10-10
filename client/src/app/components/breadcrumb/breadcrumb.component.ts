import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import * as fromProducts from '../../store/reducers/products.reducer';
import { ResultModel } from '../../models/ResultModel';
import { Store } from '@ngrx/store';
import { PathModel } from '../../models/PathModel';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  result$: Observable<fromProducts.State>;
  resultSub: Subscription;
  criteria: String = '';
  paths: PathModel[];

  constructor(
    private store: Store<fromProducts.State>
  ) { }

  ngOnInit() {
    this.result$ = this.store.select('products');
    this.resultSub = this.result$.subscribe(res => {
      this.paths = res.path_from_root;
    });
  }

}
