import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { UserDetailsComponent } from './user-details.component';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user.model';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let userService: UserService;

  const mockUser: User = {
    id: 2,
    name: "Jane Smith",
    socialMediaHandle: "@janesmith",
    profileImgSrc: "https://example.com/profile.jpg",
    bio: "I'm a creative graphic designer with over five years of experience.",
    location: "London, UK",
    website: "https://janesmith.co.uk"
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDetailsComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: of({ userId: 1 }) }
        },
        UserService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);

    jest.spyOn(userService, 'getUser').mockReturnValue(of(mockUser));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user data on init', () => {
    expect(userService.getUser).toHaveBeenCalledWith(2);
    expect(component.user).toEqual(mockUser);
  });

  it('should display user name', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.card-title').textContent).toContain('Jane Smith');
  });

  it('should display user username', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.card-text').textContent).toContain('@janesmith');
  });

  it('should display user bio', () => {
    const compiled = fixture.nativeElement;
    const bioElement = compiled.querySelectorAll('.card-text')[1];
    expect(bioElement.textContent).toContain('I\'m a creative graphic designer with over five years of experience.');
  });

  it('should display user location', () => {
    const compiled = fixture.nativeElement;
    const locationElement = compiled.querySelectorAll('.card-text')[2];
    expect(locationElement.textContent).toContain('London, UK');
  });

  it('should display user website', () => {
    const compiled = fixture.nativeElement;
    const websiteElement = compiled.querySelector('a');
    expect(websiteElement.textContent).toBe('https://janesmith.co.uk');
    expect(websiteElement.getAttribute('href')).toBe('https://janesmith.co.uk');
  });
});
