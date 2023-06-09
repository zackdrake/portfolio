import { Component } from '@angular/core';
import * as emailjs from 'emailjs-com';

emailjs.init('haOTysv-4HPEnoaC-');

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  contact = {
    name: '',
    email: '',
    message: '',
    valid: false,
  };

  onSubmit() {
    console.log('Form submitted', this.contact);
    emailjs.send('default_service', 'template_nmxjqq5', this.contact).then(
      function (response) {
        console.log('SUCCESS!', response.status, response.text);
      },
      function (error) {
        console.log('FAILED...', error);
      }
    );
  }
}
