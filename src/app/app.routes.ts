import { Routes } from '@angular/router';
import { ImprintComponent } from './imprint/imprint.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { StartpageComponent } from './startpage/startpage.component';


export const routes: Routes = [
    { path: '', component: StartpageComponent },
    { path: 'legalnotice', component: LegalNoticeComponent },
    { path: 'imprint', component: ImprintComponent }
];