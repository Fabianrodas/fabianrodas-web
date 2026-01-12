import { Component, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Contact } from '../../../models/portfolio.model';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent {
  data = input.required<Contact>();
  
  formData = signal({
    name: '',
    email: '',
    message: ''
  });

  submitForm() {
    console.log('Form submitted:', this.formData());
    // TODO: Implementar envío de formulario
    alert('¡Mensaje enviado! (Esta es una demo)');
    this.formData.set({ name: '', email: '', message: '' });
  }
}
