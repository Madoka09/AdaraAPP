import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const apiUrl = 'http://api.adarawellness.site/menuGet/';
const apiAuthentication = 'http://api.adarawellness.site/patientsLogin?';

@Injectable({
  providedIn: 'root'
})
export class CallApiService {

  constructor(private httpC: HttpClient) { }

  getAll(id) {
    let query = apiUrl;
    return this.httpC.get(query + parseInt(id));
  }

  authenticateUser(info) {
    let data = apiAuthentication;
    return this.httpC.get(data + info);
  }

}
