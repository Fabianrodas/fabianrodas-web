import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hero } from '../../../models/portfolio.model';

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class HeroComponent {
  data = input.required<Hero>();
}
