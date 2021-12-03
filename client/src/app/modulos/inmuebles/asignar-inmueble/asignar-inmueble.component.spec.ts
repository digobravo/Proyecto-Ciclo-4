import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarInmuebleComponent } from './asignar-inmueble.component';

describe('AsignarInmuebleComponent', () => {
  let component: AsignarInmuebleComponent;
  let fixture: ComponentFixture<AsignarInmuebleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarInmuebleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarInmuebleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
