import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-course-documents',
  templateUrl: './course-documents.component.html',
  styleUrls: ['./course-documents.component.scss']
})
export class CourseDocumentsComponent implements OnInit {

  @Input() data;
  documents=[];
  constructor() { }

  ngOnInit() {
    console.log(this.data);
    this.data.sections.filter( (section) => {
      section.lectures.filter((lecture)=>{
        lecture.course_content.filter((content)=>{
           if(content.extension === "pdf"){
             console.log(content);
             this.documents.push(content);
           }
        });

      });
    });
    console.log(this.documents);
  }
  downloadPDF(url){
    // console.log(url);
    window.open(url, '_blank');
  }

}
