import { Routes } from '@angular/router';
import {MapPage} from "./features/home/page/map/map.page";

export const routes: Routes = [
    {
        path: 'maps',
        loadComponent: () =>
            import('./features/home/page/map/map.page').then(
                (comp) => comp.MapPage,
            ),
    }
];
