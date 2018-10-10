import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { of, Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromProducts from '../../store/reducers/products.reducer';
import * as ProductActions from '../../store/actions/products.actions';
import * as fromGenerals from '../../store/reducers/generals.reducer';
import { ProductService } from '../../services/product.service';
import { ResultModel } from '../../models/ResultModel';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  result$: Observable<fromProducts.State>;
  resultSub: Subscription;
  generals$: Observable<fromGenerals.State>;
  generalsSub: Subscription;
  criteria: String = '';
  result: ResultModel;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromProducts.State>,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.criteria = params['q'];
      console.log(this.criteria);

      this.productService.fetchProducts(this.criteria);
    });

    this.result$ = this.store.select('products');
    this.resultSub = this.result$.subscribe(res => {
      console.log(res.result);
      this.result = res.result;
    });

    this.generals$ = this.store.select('generals');
    this.generalsSub = this.generals$.subscribe(res => {
      console.log(res.loading);
      this.loading = res.loading;
    });

  }

  ngOnDestroy(): void {
    this.resultSub.unsubscribe();
    this.generalsSub.unsubscribe();
  }
}
