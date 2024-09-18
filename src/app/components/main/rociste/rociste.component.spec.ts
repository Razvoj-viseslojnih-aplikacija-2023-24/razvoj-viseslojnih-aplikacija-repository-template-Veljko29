import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RocisteComponent } from './rociste.component';

describe('RocisteComponent', () => {
  let component: RocisteComponent;
  let fixture: ComponentFixture<RocisteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RocisteComponent]
    });
    fixture = TestBed.createComponent(RocisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
