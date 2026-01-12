import { Component, input } from '@angular/core';
import { Projects } from '../../../models/portfolio.model';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class ProjectsComponent {
  data = input.required<Projects>();
}
