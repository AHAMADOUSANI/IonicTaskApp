import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordResetdPage } from './password-resetd.page';

describe('PasswordResetdPage', () => {
  let component: PasswordResetdPage;
  let fixture: ComponentFixture<PasswordResetdPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordResetdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
