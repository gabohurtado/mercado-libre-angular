import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromGenerals from '../../store/reducers/generals.reducer';
import { CleanPathFromRoot } from '../../store/actions/products.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  searForm: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder, private store: Store<fromGenerals.State>) { }

  ngOnInit() {
    this.searForm = this.formBuilder.group({
      search: ['']
    });
  }

  search() {
    this.router.navigate([`/search`], { queryParams: { q: this.searForm.value.search } });
  }

  goHome() {
    this.store.dispatch(new CleanPathFromRoot);
    this.router.navigate([`/`]);
  }
}
