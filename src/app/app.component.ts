import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PortalComponent } from './components/portal/portal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PortalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sensationanddesire-app';
}
