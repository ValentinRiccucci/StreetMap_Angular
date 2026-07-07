import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'maps',
        loadComponent: () =>
            import('./features/home/page/map/map.page').then(
                (comp) => comp.MapPage,
            ),
    },
    {
        path: 'maps2',
        loadComponent: () =>
            import('./features/home/page/map2/map2.page').then(
                (comp) => comp.Map2Page,
            ),
    }
];
