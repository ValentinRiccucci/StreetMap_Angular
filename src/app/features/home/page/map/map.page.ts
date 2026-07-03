import {Component, signal, WritableSignal} from '@angular/core';
import { LeafletDirective } from '@bluehalo/ngx-leaflet';
import {LatLng, latLng, tileLayer} from 'leaflet';
import {FormControl, FormGroup, Validators} from "@angular/forms";

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


  adresseForm = new FormGroup<{
    numero: FormControl<number>;
    rue: FormControl<string>;
    code_Postal: FormControl<number>;
    id: FormControl<string>;
  }>({
    numero: new FormControl<number>(0, [
      Validators.required,
    ]),
    rue: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(250),
    ]),
    code_Postal: new FormControl<number>(0, [
      Validators.maxLength(5),
        Validators.minLength(5),
        //Validators.pattern(/^\d+$/)
    ]),
    id: new FormControl<string>('', [
      Validators.maxLength(5),
  Validators.minLength(5),
  //Validators.pattern(/^\d+$/)
]),
  });

}
