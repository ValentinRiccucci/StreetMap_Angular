import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import {environment} from "../../../../environments/environment";
import {AdresseModel} from "../../../shared/models/adresses.model";

@Injectable({
    providedIn: 'root',
})
export class AdressesCrud {
    readonly #http: HttpClient = inject(HttpClient);
    baseUrl = environment.baseUrl;

    idAdresse = signal(undefined);

    getAdresseByIdRes: HttpResourceRef<AdresseModel | undefined> = httpResource(() => this.idAdresse() ? `${this.baseUrl}/adresse/${this.idAdresse()}` : undefined);

    getAdresseByAllRes: HttpResourceRef<AdresseModel | undefined> = httpResource(() => this.idAdresse() ? `${this.baseUrl}/adresse/${this.idAdresse()}` : undefined);

}
