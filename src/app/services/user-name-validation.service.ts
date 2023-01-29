import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { catchError, Observable, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserNameValidationService {

  constructor() { }
  validate(control: AbstractControl) : Observable<ValidationErrors | null> {
    return this.validateUserName(control.value).pipe(
      map((duplicateUserName) => {
        if(duplicateUserName) {
          return { userNameNotAvailable: true }
        } else {
          return null;
        }
      }),
      catchError(() => of(null))
    )
  }

  private validateUserName(username: string): Observable<boolean> {
    const UserList = ['admin', 'user', 'superuser'];
    return of(UserList.includes(username.toLocaleLowerCase()));
  }

}
