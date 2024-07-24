import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000/user/';

  constructor(private http: HttpClient) { }

 public getUser(userId: number): Observable<User> {
    return this.http.get<any>(`${this.baseUrl}/${userId}`).pipe(
      map(data => new User(
        data.id,
        data.name,
        data.socialMediaHandle,
        data.profileImgSrc,
        data.bio,
        data.location,
        data.website
      ))
    );
  }
}
