import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import {environment} from "../../../../environments/environment";
import {AdresseModel} from "../../../shared/models/adresses.model";
import {FormControl, ɵValue} from "@angular/forms";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class AdressesCrud {
    readonly #http: HttpClient = inject(HttpClient);
    baseUrl = environment.baseUrl;

    getAdresseByNumeroVoisCP(numero: ɵValue<FormControl<number | null>> | undefined, voie: ɵValue<FormControl<string | null>> | undefined, code_postal: ɵValue<FormControl<number | null>> | undefined): Observable<AdresseModel> {
        const url = `${this.baseUrl}/79/maps?numero=${numero}&voie=${voie}&code_postal=${code_postal}`;
        return this.#http.get<AdresseModel>(url);
    }
}
