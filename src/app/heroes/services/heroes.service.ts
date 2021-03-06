import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Heroes } from '../interfaces/heroes.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient ) { }

  getHeroes(): Observable<Heroes[]>{
    return this.http.get<Heroes[]>(`${this.baseUrl}/heroes`);
  }

  getHeroe(id:string): Observable<Heroes>{
    return this.http.get<Heroes>(`${this.baseUrl}/heroes/${id}`)
  }

  getSugerencia(termino:string): Observable<Heroes[]>{
    return this.http.get<Heroes[]>(`${this.baseUrl}/heroes/?q=${termino}&_limit=6`)
  }

  agregarHeroe( heroe: Heroes ): Observable<Heroes>{
    return this.http.post<Heroes>(`${this.baseUrl}/heroes/`, heroe);
  }

  actualizarHeroe( heroe: Heroes ): Observable<Heroes>{
    return this.http.put<Heroes>(`${this.baseUrl}/heroes/${heroe.id}`, heroe);
  }

  borrarHeroe( id: string ): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/heroes/${id}`);
  }
  
  }
