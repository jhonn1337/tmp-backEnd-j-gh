import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEgcComponent } from './new-egc.component';

describe('NewEgcComponent', () => {
  let component: NewEgcComponent;
  let fixture: ComponentFixture<NewEgcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewEgcComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewEgcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
