import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromProducts from '../../store/reducers/products.reducer';
import * as ProductActions from '../../store/actions/products.actions';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  criteria: String = '';

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromProducts.State>,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.criteria = params['q'];
      console.log(this.criteria);

      this.productService
        .fetchProducts(this.criteria)
        .subscribe(
          result => new ProductActions.FetchProducts(result),
          error =>
            this.store.dispatch(new ProductActions.ErrorFetchingProducts(error))
        );
    });
  }
}
