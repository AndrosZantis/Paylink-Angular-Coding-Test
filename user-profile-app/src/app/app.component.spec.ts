import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have isDarkMode initially set to false', () => {
    expect(component.isDarkMode).toBe(false);
  });

  it('should toggle isDarkMode from false to true', () => {
    component.toggleDarkMode();
    expect(component.isDarkMode).toBe(true);
  });

  it('should toggle isDarkMode from true to false', () => {
    component.isDarkMode = true; // Set initial state
    component.toggleDarkMode();
    expect(component.isDarkMode).toBe(false);
  });
});
