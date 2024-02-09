import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoEstudianteComponent } from './nuevo-estudiante.component';

describe('NuevoEstudianteComponent', () => {
  let component: NuevoEstudianteComponent;
  let fixture: ComponentFixture<NuevoEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoEstudianteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NuevoEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
