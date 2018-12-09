import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  genders = ['male', 'female'];
  signUpFrom: FormGroup;
  forbiddenUsername = ['Chris', 'Anna'];

  ngOnInit(): void {
    this.signUpFrom = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.email, Validators.required], this.forbiddenEmail.bind(this))
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });

    this.signUpFrom.valueChanges.subscribe(value => {
      console.log(value);
    });

    this.signUpFrom.statusChanges.subscribe((status) => {
      console.log(status);
    });
  }

  onSubmit() {
    console.log(this.signUpFrom);
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } | null {
    if (this.forbiddenUsername.includes(control.value)) {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signUpFrom.get('hobbies')).push(control);
  }

  forbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });

    return promise;
  }
}
