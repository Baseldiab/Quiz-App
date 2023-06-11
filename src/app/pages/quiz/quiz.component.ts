import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent {
  constructor(public global: GlobalService, private router: Router) {
    // =============
    this.global.getQustions().subscribe((data: any) => {
      this.global.questions = data.results;
    });
  }
  // =============
  startTimer() {
    this.global.timer = setInterval(() => {
      this.global.seconds++;
    }, 1000);
  }
  // =============
  // =============
}
