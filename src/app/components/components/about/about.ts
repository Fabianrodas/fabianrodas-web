import { Component, input } from '@angular/core';
import { About } from '../../../models/portfolio.model';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class AboutComponent {
  data = input.required<About>();
}
