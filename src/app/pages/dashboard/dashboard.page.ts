import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  userData: any;
  constructor(public activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.userData = res;
  });
  }

  ngOnInit() {
    console.log(this.userData);
  }

  getMeals() {
    this.router.navigate(['/meals'], {queryParams: this.userData});
  }

  getRoutines() {
    this.router.navigate(['/routines'], {queryParams: this.userData});
  }

  getProgress() {
    this.router.navigate(['/progress'], {queryParams: this.userData});
  }

}
