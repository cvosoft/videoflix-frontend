import { Routes } from '@angular/router';
import { ImprintComponent } from './imprint/imprint.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { StartpageComponent } from './startpage/startpage.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { VideoOfferComponent } from './video-offer/video-offer.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', component: StartpageComponent },
    { path: 'reset-password/:uid/:token', component: ResetPasswordComponent },
    { path: 'forgot-pw', component: ForgotPasswordComponent },
    { path: 'login', component: LogInComponent },
    { path: 'register', component: SignUpComponent },
    { path: 'legalnotice', component: LegalNoticeComponent },
    { path: 'imprint', component: ImprintComponent },
    { path: 'confirm-email', component: ConfirmEmailComponent },
    { path: 'videos', component: VideoOfferComponent, canActivate: [authGuard] }
];