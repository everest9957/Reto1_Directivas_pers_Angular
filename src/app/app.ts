import { Component } from '@angular/core';
import { DemoTable } from './components/demo-table/demo-table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DemoTable],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  title = 'Reto 1 - Directivas personalizadas';
}