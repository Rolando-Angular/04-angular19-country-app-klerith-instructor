import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { catchError, delay, map, Observable, throwError } from "rxjs";
import { RESTCountry } from "../interfaces/rest-countries.interface";
import { CountryMapper } from "../mappers/country.mapper";
import { Country } from "../interfaces/country.interface";

@Injectable({
  providedIn: 'root',
})
export class CountryService {

  private env: Record<string, string | number> = environment;

  private httpClient = inject(HttpClient);

  public searchByCapital(query: string): Observable<Country[]> {
    return this.httpClient.get<Array<RESTCountry>>(`${this.env["COUNTRY_API_URL"]}/capital/${query.toLowerCase()}`)
      .pipe(
        map(CountryMapper.toCountry),
        catchError((err) => {
          return throwError(() => new Error(`No se puede obtener países con esa query: ${query}`));
        }),
      );
  }

  public searchByCountry(query: string): Observable<Country[]> {
    return this.httpClient.get<RESTCountry[]>(`${this.env["COUNTRY_API_URL"]}/name/${query}`)
      .pipe(
        map(CountryMapper.toCountry),
        delay(2000),
        catchError((err) => {
          return throwError(() => new Error(`No se puede obtener países con esa query: ${query}`));
        }),
      );
  }

  public searchCountryByAlphaCode(code: string): Observable<Country | undefined> {
    return this.httpClient.get<RESTCountry[]>(`${this.env["COUNTRY_API_URL"]}/alpha/${code}`)
      .pipe(
        map(CountryMapper.toCountry),
        map((countries) => countries?.at(0)),
        catchError((err) => {
          return throwError(() => new Error(`No se puede obtener países con ese código: ${code}`));
        }),
      );
  }

}
