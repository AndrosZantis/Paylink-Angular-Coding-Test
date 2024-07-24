import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  public user: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      let userId = 2;
      this.userService.getUser(userId).subscribe(data => {
        if(!data) return;
        this.user = data;
      });
    });
  }
}
