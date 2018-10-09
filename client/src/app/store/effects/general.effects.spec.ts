import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { GeneralEffects } from './general.effects';

describe('GeneralEffects', () => {
  let actions$: Observable<any>;
  let effects: GeneralEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GeneralEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(GeneralEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
