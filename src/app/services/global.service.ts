import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  questions: any[] = [];
  seconds!: number;
  qnProgress!: number;
  timer: any;
  correctAnswerCount: number = 0;

  constructor(private http: HttpClient) {}
  // ===============

  getQustions(): Observable<any> {
    return this.http.get(
      `https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple`
    );
  }
  // ===============
  displayTimeElapsed() {
    return (
      Math.floor(this.seconds / 3600) +
      ':' +
      Math.floor(this.seconds / 60) +
      ':' +
      Math.floor(this.seconds % 60)
    );
  }
  // ===============
  parti: any;
  getParticipantName() {
    let parti = localStorage.getItem('participant');

    let participant = JSON.parse(this.parti);
    return participant.Name;
  }
  // ===============
  // ===============
}
