import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromProducts from './store/reducers/products.reducer';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  result$: Observable<fromProducts.State>;
  resultSub: Subscription;
  error: string;

  constructor(private store: Store<fromProducts.State>) {

  }

  ngOnInit() {
    this.result$ = this.store.select('products');
    this.resultSub = this.result$.subscribe(res => {
      console.log(res.result);
      this.error = res.error;
    });
  }

  ngOnDestroy() {
    this.resultSub.unsubscribe();
  }
}
