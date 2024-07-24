import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../_models/user.model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifies that no unmatched requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a user by ID', () => {
    const dummyUser = {
      id: 1,
      name: 'Jane Smith',
      socialMediaHandle: '@janesmith',
      profileImgSrc: 'path/to/profile.jpg',
      bio: 'A bio about Jane',
      location: 'London, UK',
      website: 'https://www.janesmith.co.uk'
    };

    service.getUser(1).subscribe(user => {
      expect(user).toEqual(new User(
        dummyUser.id,
        dummyUser.name,
        dummyUser.socialMediaHandle,
        dummyUser.profileImgSrc,
        dummyUser.bio,
        dummyUser.location,
        dummyUser.website
      ));
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUser);
  });

  it('should handle 404 error when user is not found', () => {
    service.getUser(999).subscribe(
      () => fail('should have failed with a 404 error'),
      (error) => {
        expect(error.status).toBe(404);
      }
    );

    const req = httpMock.expectOne(`${service['baseUrl']}/999`);
    expect(req.request.method).toBe('GET');
    req.flush('User not found', { status: 404, statusText: 'Not Found' });
  });
});
