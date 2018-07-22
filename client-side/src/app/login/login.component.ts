import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credential = {
    username: '',
    password: '',
  };

  constructor(private router: Router, private http: Http) { }
  // In login
  ngOnInit() {
  }

  submit() {
<<<<<<< HEAD
    this.http.post(environment.localhostcontext + 'users/login', this.credential, {withCredentials: true})
      .subscribe( (succResp) => {
        if (succResp.text() !== '') {
          this.router.navigateByUrl('/user/home');
        } else {
          alert('failed to login');
        }
      });
=======
    // this.http.post(environment.gambitContext + 'users/login', this.credential, {withCredentials: true})
    //   .subscribe( (succResp) => {
    //     if (succResp.text() !== '') {
    //       this.router.navigateByUrl('/user/home');
    //     } else {
    //       alert('failed to login');
    //     }
    //   });
>>>>>>> Commented out all lines that referenced gambitContext (the ec2); Created a localHostContext for JSON server usage
  }

}
