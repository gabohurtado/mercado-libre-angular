import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import * as fromProducts from './store/reducers/products.reducer';
import * as fromGenerals from './store/reducers/generals.reducer';

// Components
import { NavbarComponent } from './components/navbar/navbar.component';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './store/effects/product.effects';
import { GeneralEffects } from './store/effects/general.effects';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

// Server Side Render SSR
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    ProductDetailsComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'client' }),
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forFeature('products', fromProducts.reducer),
    StoreModule.forFeature('generals', fromGenerals.reducer),
    // EffectsModule.forRoot([ProductEffects, GeneralEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
}
