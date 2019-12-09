import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesModalPage } from './recipes-modal.page';

describe('RecipesModalPage', () => {
  let component: RecipesModalPage;
  let fixture: ComponentFixture<RecipesModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipesModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
