import { Component, OnInit } from '@angular/core';
import { visibility,expand, flyInOut} from '../animations/app.animation';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import {FeedbackService} from '../services/feedback.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
     host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand(),
    visibility()

  ]
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedbackFormcopy:FormGroup;
  feedback: Feedback;
  feedbackcopy:Feedback;
  spinner:boolean;
  showresult:boolean;
  showform:boolean;
  visibility = 'shown';
  contactType = ContactType;

 formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
    'message': {
      'required':      'message is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
  };

  constructor(private fb: FormBuilder,private feedbackservice: FeedbackService ){
    this.createForm();
  }

  ngOnInit() {
  this.spinner=false;
  this.showresult=false;
  this.showform=true;
  }
  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });
     this.feedbackFormcopy=this.feedbackForm;
     this.feedbackForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now

  }
   onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }


  onSubmit() {

    this.feedback = this.feedbackForm.value;
    this.feedbackFormcopy=this.feedbackForm.value;
    this.visibility = 'hidden';
    this.spinner=true;
    this.feedbackservice.submitFeedback(this.feedback)
    .subscribe(feedback=>{this.feedback=feedback;setTimeout(()=>{this.spinner=false;this.showresult=true;},2000);
     setTimeout(()=> {this.spinner=false;this.showresult=false;this.showform=true},7000);});

       setTimeout(()=> this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    }), 7403);
  }

  }