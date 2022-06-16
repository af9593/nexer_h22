import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, tap } from "rxjs";
import { Claim } from "../model/claim";

@Injectable({
    providedIn: 'root'
})

export class ClaimsService {
  private dataStore: {
    claims: Claim[]
  }

  constructor(private http: HttpClient) {this.dataStore = { claims: [] };}
    
  loadAll(): Observable<Claim[]> {
    const claimsUrl = 'https://patrik1970.github.io/user-api/claims.json';
    if (this.dataStore.claims.length > 0) {
      return of(this.dataStore.claims)
    }  
    return this.http.get<Claim[]>(claimsUrl).pipe(tap(claims => this.dataStore.claims = claims));
  }
}