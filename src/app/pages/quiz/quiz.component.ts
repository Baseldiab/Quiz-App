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
  constructor(public global: GlobalService, private router: Router) {
    // add questions=============

    let sec: any = localStorage.getItem('seconds');
    let prog: any = localStorage.getItem('qnProgress');
    let qns: any = localStorage.getItem('questions');
    if (parseInt(sec) > 0) {
      this.global.seconds = parseInt(sec);
      this.global.qnProgress = parseInt(prog);
      this.global.questions = JSON.parse(qns);

      console.log(this.global.questions);
      if (this.global.qnProgress == 10) {
        this.router.navigate(['/result']);
      } else {
        this.startTimer();
      }
    } else {
      this.global.getQustions().subscribe((data: any) => {
        this.global.seconds = 0;
        this.global.qnProgress = 0;
        this.global.correctAnswerCount = 0;
        localStorage.setItem('questions', JSON.stringify(data.results));
        qns = localStorage.getItem('questions');
        this.global.questions = JSON.parse(qns);
        this.getAnswersOptions(this.global.questions[0]);
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
    correctAnswers = data.correct_answer;
    inCorrectAnswers = data.incorrect_answers;
    this.global.answers = inCorrectAnswers;
    this.global.answers.splice(
      Math.floor(Math.random() * (inCorrectAnswers.length + 1)),
      0,
      correctAnswers
    );
  }
  // =============
  answer(choice: any, i: any) {
    if (this.global.qnProgress < 10) {
      choice = this.global.answers[i];
      // localStorage.setItem('choice', JSON.stringify(choice));
      localStorage.setItem('qns', JSON.stringify(this.global.questions));
      this.global.qnProgress++;
      localStorage.setItem('qnProgress', this.global.qnProgress.toString());
      let prog: any = localStorage.getItem('qnProgress');
      this.global.qnProgress = parseInt(prog);
      this.getAnswersOptions(this.global.questions[this.global.qnProgress]);
    } else if (this.global.qnProgress == 10) {
      clearInterval(this.global.timer);
      this.router.navigate(['/result']);
    }
  }
  // =============
}
