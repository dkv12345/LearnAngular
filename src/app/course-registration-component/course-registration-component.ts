import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

interface CourseRegistration {
  fullName: string;
  email: string;
  phone: string;
  course: string;
  select_class: string;
  agree: boolean;
}

@Component({
  selector: 'app-course-registration',
  standalone: false,
  templateUrl: './course-registration-component.html',
})
export class CourseRegistrationComponent {
  readonly courseModel: CourseRegistration = {
    fullName: 'Thanh Duy Tran',
    email: 'thanhtd@uel.edu.vn',
    phone: '0987773061',
    course: 'datascience',
    select_class: 'morning',
    agree: true,
  };

  submittedRegistration: CourseRegistration | null = null;

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    this.submittedRegistration = { ...this.courseModel };
  }
}
