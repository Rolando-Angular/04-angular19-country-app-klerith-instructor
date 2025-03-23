import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { catchError, map, Observable, of, tap, throwError } from "rxjs";
import type { RESTCountry } from "../interfaces/rest-countries.interface";
import { CountryMapper } from "../mappers/country.mapper";
import type { Country } from "../interfaces/country.interface";
import type { Region } from "../interfaces/region.type";

@Injectable({
  providedIn: 'root',
})
export class CountryService {

  private env: Record<string, string | number> = environment;

  private httpClient = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<string, Country[]>();

  public searchByCapital(query: string): Observable<Country[]> {
    const queryLower: string = query.toLowerCase();
    if (this.queryCacheCapital.has(queryLower)) {
      return of(this.queryCacheCapital.get(queryLower) ?? []);
    }

    return this.httpClient.get<Array<RESTCountry>>(`${this.env['COUNTRY_API_URL']}/capital/${queryLower}`)
      .pipe(
        map(CountryMapper.toCountry),
        tap((country) => this.queryCacheCapital.set(queryLower, country)),
        catchError((err) => {
          return throwError(() => new Error(`No se puede obtener países con esa query: ${queryLower}`));
        }),
      );
  }

  public searchByCountry(query: string): Observable<Country[]> {
    const queryLower: string = query.toLowerCase();
    if (this.queryCacheCountry.has(queryLower)) {
      return of(this.queryCacheCountry.get(queryLower) ?? []);
    }

    return this.httpClient.get<RESTCountry[]>(`${this.env['COUNTRY_API_URL']}/name/${queryLower}`)
      .pipe(
        map(CountryMapper.toCountry),
        tap((countries) => this.queryCacheCountry.set(queryLower, countries)),
        catchError((err) => {
          return throwError(() => new Error(`No se puede obtener países con esa query: ${queryLower}`));
        }),
      );
  }

  public searchByRegion(query: Region): Observable<Country[]> {
    const queryLower: string = query.toLowerCase();

    if (this.queryCacheRegion.has(queryLower)) {
      return of(this.queryCacheRegion.get(queryLower) ?? []);
    }

    return this.httpClient.get<RESTCountry[]>(`${this.env['COUNTRY_API_URL']}/region/${queryLower}`)
      .pipe(
        map(CountryMapper.toCountry),
        tap((countries) => this.queryCacheRegion.set(queryLower, countries)),
        catchError((err) => {
          return throwError(() => new Error(`No se puede obtener países con esa query: ${queryLower}`));
        }),
      );
  }

  public searchCountryByAlphaCode(code: string): Observable<Country | undefined> {
    return this.httpClient.get<RESTCountry[]>(`${this.env['COUNTRY_API_URL']}/alpha/${code}`)
      .pipe(
        map(CountryMapper.toCountry),
        map((countries) => countries?.at(0)),
        catchError((err) => {
          return throwError(() => new Error(`No se puede obtener países con ese código: ${code}`));
        }),
      );
  }

}
