import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import * as fromProducts from '../../store/reducers/products.reducer';
import * as ProductActions from '../../store/actions/products.actions';
import * as fromGenerals from '../../store/reducers/generals.reducer';
import { ProductService } from '../../services/product.service';
import { Observable, Subscription } from 'rxjs';
import { ItemModel } from '../../models/ItemModel';
import { ResultItemModel } from '../../models/ResultItemModel';
import { ResultModel } from '../../models/ResultModel';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  id: String = '';
  result$: Observable<fromProducts.State>;
  resultSub: Subscription;
  generals$: Observable<fromGenerals.State>;
  generalsSub: Subscription;
  criteria: String = '';
  result: ResultItemModel;
  loading = true;

  constructor(private route: ActivatedRoute, private store: Store<fromProducts.State>,
    private productService: ProductService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.productService
        .getProductById(this.id);
    });

    this.result$ = this.store.select('products');
    this.resultSub = this.result$.subscribe(res => {
      this.result = res.item;
    });

    this.generals$ = this.store.select('generals');
    this.generalsSub = this.generals$.subscribe(res => {
      this.loading = res.loading;
    });
  }
}
