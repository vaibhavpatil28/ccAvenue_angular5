import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { RsaService } from './rsa-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[RsaService]
})
export class AppComponent {
  title = 'app';
  @ViewChild('form')
  form: ElementRef;
  url = `https://theopallabs.com/ccavenueapi/payment/GetRSA`;

  encRequest: String;
  accessCode: String;
  orderId = 10;
  encryptedData: string;
  decryptedData: string;
  constructor(private httpClient: HttpClient, private rsaService: RsaService) {}
  formData = {
    merchant_id: 176088,
    order_id: 2597145,
    currency: 'INR',
    amount: 1,
    redirect_url: 'https://theopallabs.com/ccavenueapi/payment/ccavResponseHandler',
    cancel_url: 'https://theopallabs.com/ccavenueapi/payment/ccavResponseHandler',
    integration_type: 'iframe_normal',
    language: 'en',
    access_code: 'AVEI77FE93AU82IEUA'
  };

  ngOnInit() {
    this.accessCode = 'AVEI77FE93AU82IEUA';
    // this.getEncRequest().subscribe(
    //   data => {
    //     console.log('data', data)
    //     this.encRequest = data as string;
    //     console.log('this.encRequest', this.encRequest)
    //   }, error => {
    //     console.log(error)
    //   }
    // );

    /* --------------------- for encrypt data ---------------- */
    // console.log(' JSON.stringify(this.formData)', JSON.stringify(this.formData))
    // this.encryptedData = this.rsaService.encrypt( JSON.stringify(this.formData));
    // console.log('this.encryptedData', this.encryptedData);
  }
  // getEncRequest(){
  //   return this.httpClient.post(this.url, {accessCode: this.accessCode, orderId: this.orderId});
  // }

  pay() {
    this.form.nativeElement.submit();
  }
}
