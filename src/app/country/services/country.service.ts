import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { catchError, map, Observable, throwError } from "rxjs";
import { RESTCountry } from "../interfaces/rest-countries.interface";
import { CountryMapper } from "../mappers/country.mapper";
import { Country } from "../interfaces/country.interface";

@Injectable({
  providedIn: 'root',
})
export class CountryService {

  private env: Record<string, string | number> = environment;

  private httpClient = inject(HttpClient);

  public searchByCapital(query: string): Observable<Array<Country>> {
    return this.httpClient.get<Array<RESTCountry>>(`${this.env["COUNTRY_API_URL"]}/capital/${query.toLowerCase()}`)
      .pipe(
        map(CountryMapper.toCountry),
        catchError((err) => {
          console.log(err);
          return throwError(() => new Error(`No se puedo obtener países con ese query: ${query}`));
        }),
      );
  }

}
