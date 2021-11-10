import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {
  elements:any;

  constructor(private el: ElementRef) { 
     this.elements = el;
  }

  ngOnInit() {
    let inc = 1000;
    this.clock();
  }

  clock() {
    let now = new Date();

    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    let diff = now.getTime() - today.getTime();

    let currentSec = Math.round(diff / 1000);

    let seconds = (currentSec / 60) % 1;
    let minutes = (currentSec / 3600) % 1;
    let hours = (currentSec / 43200) % 1;
    
    let hour = hours * 43200 * -1;
    let minute = minutes * 3600 * -1;
    let second = seconds * 60 * -1;
    
    this.elements.nativeElement.querySelector('.clock-hour').style.animationDelay = `${hour}s`
    this.elements.nativeElement.querySelector('.clock-minute').style.animationDelay = `${minute}s`
    this.elements.nativeElement.querySelector('.clock-second').style.animationDelay = `${second}s`
  }
}