import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { MessageService } from 'primeng/api';
import Aura from '@primeuix/themes/aura';
import {providePrimeNG} from "primeng/config";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({ theme: { preset: Aura },license: 'eyJpZCI6ImE3NTU1ZGVhLTVkYTgtNDkyOS1iMmY3LWRiZThjNDE0YWRiNyIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3ODMzMjMwOTAsImV4cCI6MTgxNDg1OTA5MH0.U1XLAKzW8Dz5kBSPg9uvCxN9QMYOJeHeHDSg5AAd9_gZP74gF0xBluFjyzrBXI-XJFezZsU71j5hg8VgVGu2Ag' }),
    provideHttpClient(),
    MessageService,
  ]
};
