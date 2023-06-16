import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  name: string = '';
  questions: any[] = [];
  answers: any[] = [];
  seconds!: number;
  qnProgress!: number;
  timer: any;
  choices: any[] = [];
  correctAnswerCount: number = 0;
  parti: any = localStorage.getItem('participant');
  sec: any = localStorage.getItem('seconds');
  prog: any = localStorage.getItem('qnProgress');
  qns: any = localStorage.getItem('questions');
  choic: any = localStorage.getItem('choice');

  constructor(private http: HttpClient) {}
  // ===============

  getQuestions(): Observable<any> {
    return this.http.get(
      `https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple`
    );
  }
  // ===============
  displayTimeElapsed() {
    return (
      ('0' + Math.floor(this.seconds / 60)).slice(-2) +
      ':' +
      ('0' + Math.floor(this.seconds % 60)).slice(-2)
    );
  }
  // ===============

  getParticipantName() {
    let participant = JSON.parse(this.parti);
    return participant.Name;
  }
  // ===============

  // ===============
}
