import { Component, input } from '@angular/core';
import { Skills } from '../../../models/portfolio.model';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.css'
})
export class SkillsComponent {
  data = input.required<Skills>();
}
