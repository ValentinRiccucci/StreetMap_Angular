import {Component, signal, WritableSignal} from '@angular/core';
import { LeafletDirective } from '@bluehalo/ngx-leaflet';
import {LatLng, latLng, tileLayer} from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [LeafletDirective],
  templateUrl: './map.page.html',
  styleUrl: './map.page.scss',
})
export class MapPage{

  private readonly defaultCenter = latLng(46.32292197490511, -0.45840862229322993);
  private readonly alternativeCenter = latLng(46.57880562216769, 0.356848199800482);

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 13,
    center: this.defaultCenter
  };
  center: WritableSignal<LatLng> = signal(this.defaultCenter);

  changePosition(): void {
    const current = this.center();
    const next = current.lat === this.defaultCenter.lat && current.lng === this.defaultCenter.lng
      ? this.alternativeCenter
      : this.defaultCenter;

    this.center.set(next);
  }
}
