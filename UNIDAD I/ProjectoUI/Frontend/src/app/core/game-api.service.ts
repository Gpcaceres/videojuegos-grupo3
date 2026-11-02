import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { GameMode, GameState } from './game.models';

@Injectable({ providedIn: 'root' })
export class GameApiService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/api`;

  modes(): Observable<GameMode[]> {
    return this.http.get<GameMode[]>(`${this.base}/modes`);
  }

  create(level: number): Observable<GameState> {
    return this.http.post<GameState>(`${this.base}/games`, { level });
  }

  /** = clic en btnTicTacToeN (index = TabIndex 0..8). */
  move(id: string, index: number): Observable<GameState> {
    return this.http.post<GameState>(`${this.base}/games/${id}/moves`, { index });
  }

  /** = btnNew / Archivo > Nuevo. */
  restart(id: string): Observable<GameState> {
    return this.http.post<GameState>(`${this.base}/games/${id}/new`, {});
  }

  /** = cambiar el RadioButton de nivel. */
  setLevel(id: string, level: number): Observable<GameState> {
    return this.http.put<GameState>(`${this.base}/games/${id}/level`, { level });
  }
}
