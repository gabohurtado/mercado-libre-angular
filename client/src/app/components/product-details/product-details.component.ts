import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import * as fromProducts from '../../store/reducers/products.reducer';
import * as ProductActions from '../../store/actions/products.actions';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  id: String = '';

  constructor(private route: ActivatedRoute, private store: Store<fromProducts.State>,
    private productService: ProductService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
        this.productService
          .getProductById(this.id)
          .subscribe(
            result => new ProductActions.ShowDetails(result),
            error =>
              this.store.dispatch(new ProductActions.ErrorShowingDetails(error))
          );
      });
  }
}
