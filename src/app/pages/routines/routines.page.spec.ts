import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutinesPage } from './routines.page';

describe('RoutinesPage', () => {
  let component: RoutinesPage;
  let fixture: ComponentFixture<RoutinesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutinesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutinesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
