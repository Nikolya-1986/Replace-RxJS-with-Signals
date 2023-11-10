import { Routes } from '@angular/router';
 
export const APP_ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'rxjs',
    },
    {
        path: 'rxjs',
        loadComponent: () =>
        import('./components/rxjs/rxjs.component').then(
            (m) => m.RxjsComponent
        ),
    },
    {
        path: 'signal',
        loadComponent: () =>
        import('./components/signal/signal.component').then(
            (m) => m.SignalComponent
        ),
    },
    // {
    //     path: 'flights',
    //     loadChildren: () =>
    //         import('./ui/flights/flights.routing').then((m) => m.FLIGHTS_ROUTES),
    // },
];