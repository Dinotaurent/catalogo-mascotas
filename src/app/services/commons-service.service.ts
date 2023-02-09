import { Observable } from 'rxjs';
import { Generic } from './../models/generic';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export abstract class CommonsServiceService<E extends Generic> {
  protected URL: string;
  protected headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(protected http: HttpClient) {}

  public listar(): Observable<E[]> {
    return this.http.get<E[]>(this.URL);
  }

  public listarXId(id: number): Observable<E> {
    return this.http.get<E>(`${this.URL}${id}`);
  }

  public listarXPagina(page: string, size: string): Observable<any> {
    const PARAMS = new HttpParams().set('page', page).set('size', size);

    return this.http.get<any>(`${this.URL}pagina`, { params: PARAMS });
  }

  public crear(e: E): Observable<E> {
    return this.http.post<E>(this.URL, e, {
      headers: this.headers,
    });
  }

  public editar(e: E): Observable<E> {
    return this.http.put<E>(`${this.URL}${e.id}`, e, {
      headers: this.headers,
    });
  }

  public eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}${id}`);
  }
}
