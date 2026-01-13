import { Component, input } from '@angular/core';
import { Contact } from '../../../models/portfolio.model';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent {
  data = input.required<Contact>();
}
