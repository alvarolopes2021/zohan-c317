import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { ErrorHandler } from 'src/app/services/errorHandler';
import { UserService } from 'src/app/services/user.service';
import { Constants } from 'src/constants';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css']
})
export class ListClientsComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  users: UserModel[] = [];

  errors: Map<string, string> = new Map<string, string>();

  ngOnInit(): void {
    this.userService.getAllUsers()?.
      pipe(catchError(ErrorHandler.handleError)).
      subscribe((users) => {

        if (users instanceof Map) {
          if (users.has(Constants.Errors.ERROR)) {
            this.errors.set(Constants.Errors.ERROR, users.get(Constants.Errors.ERROR) as string);
            return;
          }
        }

        this.users = <UserModel[]>users;
      });
  }

}
