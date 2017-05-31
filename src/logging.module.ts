import {NgModule, enableProdMode} from '@angular/core'
import {LoggingService} from './logging.service'

enableProdMode();

@NgModule({
    providers: [LoggingService]
})

export class LoggingModule {

}