import { Country } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/rest-countries.interface";

export class CountryMapper {

  public static toCountry(data: RESTCountry): Country;
  public static toCountry(data: RESTCountry[]): Country[];

  public static toCountry(data: RESTCountry | RESTCountry[]): Country | Country[] {
    if (Array.isArray(data)) {
      return data.map((country) => CountryMapper.toCountry(country));
    }
    const country: Country = {
      cca2: data.cca2,
      flag: data.flag,
      flagSvg: data.flags.svg,
      name: data.translations["spa"]?.common ?? 'unknown',
      capital: data.capital?.length ? data.capital.join(",") : '',
      population: data.population,
    }
    return country;
  }

}

