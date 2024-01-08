import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // generated in Strapi
  private apiKey =
    '84e7de193f45ea7c1536b06af9c657b1821714e417389486c25f7afb0a3593b6ead24804943c33d3070cc36fff6f04658ad86a418782cdfab562954ec6020fb52aaf59e3c2edf60dbc811040209fc1c17d428fef819d9f2b51110ad100f760432ced490efdb90184791d99e53f8c8de914ef82829329513ae24891e11a99c7f9';
  private apiUrl = 'http://localhost:1337/graphql';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    }),
  };
  constructor(private http: HttpClient) {}

  graphql<T>(query: string, variables?: Partial<T>) {
    return this.http
      .post(this.apiUrl, JSON.stringify({ query, variables }), this.httpOptions)
      .pipe(map((response: any) => response.data));
  }
}
