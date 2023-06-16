import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent {
  constructor(public global: GlobalService, private router: Router) {}
  question: any;

  ngOnInit() {
    if (parseInt(this.global.prog) == 10) {
      let Name: string = '';
      this.global.seconds = parseInt(this.global.sec);
      this.global.qnProgress = parseInt(this.global.prog);
      this.global.choices = JSON.parse(this.global.choic);
      this.global.questions = JSON.parse(this.global.qns);
      // console.log(parseInt(this.global.prog));
      this.global.name = JSON.parse(this.global.parti)[0].Name;
      // ==========================================
      this.global.correctAnswerCount = 0;
      for (let i = 0; i <= this.global.questions?.length; i++) {
        let correct: any = this.global.questions[i]?.correct_answer;
        if (this.global.choices[i] == correct) {
          this.global.correctAnswerCount++;
        }
      }
    }
  }

  // ==========================================
  onSubmit() {
    localStorage.clear();
    this.router.navigate(['/register']);
  }
  // ==========================================
  restart() {
    this.router.navigate(['/quiz']);
    localStorage.setItem('qnProgress', '0');
    // localStorage.setItem('questions', '');
    localStorage.setItem('seconds', '0');
    localStorage.setItem('choice', '');
  }
}
