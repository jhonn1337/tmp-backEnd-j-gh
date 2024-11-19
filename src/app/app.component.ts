import { Component, effect } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tmpFrontEnd';

  setTheme = effect(() => {
    document.body.style.setProperty(`--primary`, '#E08D2D');
    document.body.style.setProperty(`--primary-light`,'#FCF5ED');
    document.body.style.setProperty(`--ripple`, '#E08D2D1e');
    document.body.style.setProperty(`--primary-dark`,'#766969');
    document.body.style.setProperty(`--background`,'#FFFFFF');
    document.body.style.setProperty(`--error`, '#ba1a1a');
  });

}
