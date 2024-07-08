import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EvenementPage } from './evenement.page';

describe('EvenementPage', () => {
  let component: EvenementPage;
  let fixture: ComponentFixture<EvenementPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EvenementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
