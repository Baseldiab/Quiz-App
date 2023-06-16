import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { findIndex } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent {
  constructor(public global: GlobalService, private router: Router) {}
  // add questions=============

  ngOnInit() {
    if (parseInt(this.global.sec) > 0) {
      this.global.seconds = parseInt(this.global.sec);
      this.global.qnProgress = parseInt(this.global.prog);
      this.global.questions = JSON.parse(this.global.qns);
      // ===========================
      this.getAnswersOptions(this.global.questions[this.global.qnProgress]);
      if (this.global.qnProgress == 10) {
        this.router.navigate(['/result']);
      } else {
        this.startTimer();
      }
      // =================
    } else {
      this.global.seconds = 0;
      this.global.qnProgress = 0;
      this.global.getQuestions().subscribe((data: any) => {
        localStorage.setItem('questions', JSON.stringify(data.results));
        this.global.qns = localStorage.getItem('questions');
        this.global.questions = JSON.parse(this.global.qns);
        this.getAnswersOptions(this.global.questions[this.global.qnProgress]);
        //add answers =============
        // console.log(this.global.answers[0]);

        this.startTimer();
      });
    }
  }

  // =============
  startTimer() {
    this.global.timer = setInterval(() => {
      this.global.seconds++;
      localStorage.setItem('seconds', this.global.seconds.toString());
    }, 1000);
  }

  // =============
  getAnswersOptions(data: any) {
    let question: any[] = [];
    let correctAnswers: any[] = [];
    let inCorrectAnswers: any[] = [];
    correctAnswers = data?.correct_answer;
    inCorrectAnswers = data?.incorrect_answers;
    this.global.answers = inCorrectAnswers;
    this.global.answers?.splice(
      Math.floor(Math.random() * (inCorrectAnswers.length + 1)),
      0,
      correctAnswers
    );
  }
  // =============
  myChoices: any = [];
  answer(choice: any[], i: any) {
    // make choice of the option
    choice = this.global.answers[i];
    this.myChoices.push(choice);
    localStorage.setItem('choice', JSON.stringify(this.myChoices));
    //========================================
    this.global.qnProgress++;
    localStorage.setItem('qnProgress', this.global.qnProgress.toString());
    if (this.global.qnProgress == 10) {
      clearInterval(this.global.timer);
      window.location.reload();
      this.router.navigate(['/result']);
    }
    let prog: any = localStorage.getItem('qnProgress');
    this.global.qnProgress = parseInt(prog);
    // console.log(parseInt(time));
    this.getAnswersOptions(this.global.questions[this.global.qnProgress]);
    console.log(this.global.qnProgress);
  }

  // =============
}
