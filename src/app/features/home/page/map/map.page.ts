import {AfterViewInit, Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {LeafletDirective, LeafletLayersControlDirective} from '@bluehalo/ngx-leaflet';
import L, {icon, LatLng, latLng, marker, tileLayer} from 'leaflet';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AdresseModel, defaultAdresseModel} from "../../../../shared/models/adresses.model";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {Button, ButtonDirective} from "primeng/button";
import {Card} from "primeng/card";
import {IftaLabel} from "primeng/iftalabel";
import {InputNumber} from "primeng/inputnumber";
import {AdressesCrud} from "../../services/adresses.crud";


@Component({
  selector: 'app-map',
  imports: [LeafletDirective, Card, ReactiveFormsModule, IftaLabel, InputNumber, ButtonDirective, LeafletLayersControlDirective],
  templateUrl: './map.page.html',
  styleUrl: './map.page.scss',
})
export class MapPage implements OnInit{

  readonly #messageService: MessageService = inject(MessageService);
  readonly #adressesCRUD: AdressesCrud = inject(AdressesCrud);
  readonly #router: Router = inject(Router);

  private readonly defaultCenter = latLng(46.32292197490511, -0.45840862229322993);
  private readonly alternativeCenter = latLng(46.57880562216769, 0.356848199800482);

  //adresse: AdresseModel | undefined;

  ngOnInit(): void {
  }

  marker = marker([ 46.32292197490511,-0.45840862229322993 ], {
    icon: icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      iconUrl: 'leaflet/marker-icon.png',
      iconRetinaUrl: 'leaflet/marker-icon-2x.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    })
  });

  layersControl = {
    baseLayers: {
    },
    overlays: {
      'Marker': this.marker,
    }
  };

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

  changePositionXY(x: number | undefined, y: number | undefined): void {
    const current = this.center();

    const next = latLng(
        x ?? current.lat,
        y ?? current.lng
    );

    this.center.set(next);
    console.log(this.center());
    this.marker.setLatLng(next);
  }




  adresseForm = new FormGroup<{
    numero: FormControl<number | null>;
    rue: FormControl<string| null>;
    code_Postal: FormControl<number| null>;
    id: FormControl<string| null>;
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


  onSubmit(): void {
    console.log('onSubmit', this.adresseForm);
    this.adresseForm.markAllAsDirty();
    if (this.adresseForm.valid) {
      console.log('Form is valid', this.adresseForm.value);
      const rueModif = this.adresseForm.value.rue;
      rueModif?.replace(' ', "%20")
       this.#adressesCRUD.getAdresseByNumeroVoisCP(this.adresseForm.value.numero,this.adresseForm.value.rue,this.adresseForm.value.code_Postal).subscribe(
           {
             next: (adresse) => {
               console.log('Adresse retrieved:', adresse);
               this.changePositionXY(adresse.lat,adresse.lon);
             },
             error: (error) => {
               console.error('Error retrieving adresse:', error);
             },
             complete: () => {
               console.log('Adresse retrieval completed');
             }
           }
       );
      //const nouveauAdresseValue: AdresseModel = this.adresseForm.value;
    } else {
      console.error('Invalid form ', this.adresseForm);
      this.#messageService.add({
        severity: 'error',
        summary: 'Formulaire non valide',
        detail: `Veuillez corriger les champs en erreur.`,
      });
    }
  }


}
