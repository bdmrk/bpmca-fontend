import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animation-course',
  templateUrl: './animation-course.component.html',
  styleUrls: ['./animation-course.component.scss']
})
export class AnimationCourseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  animationCourses(){
    window.location.href = 'https://www.edutubebd.com/content/';
  }
}
