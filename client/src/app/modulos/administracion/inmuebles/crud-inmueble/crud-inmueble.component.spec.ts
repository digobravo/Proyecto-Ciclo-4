import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInmuebleComponent } from './crud-inmueble.component';

describe('CrudInmuebleComponent', () => {
  let component: CrudInmuebleComponent;
  let fixture: ComponentFixture<CrudInmuebleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudInmuebleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInmuebleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
