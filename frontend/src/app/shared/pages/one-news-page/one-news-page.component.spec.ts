import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneNewsPageComponent } from './one-news-page.component';

describe('OneNewsPageComponent', () => {
  let component: OneNewsPageComponent;
  let fixture: ComponentFixture<OneNewsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OneNewsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OneNewsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
