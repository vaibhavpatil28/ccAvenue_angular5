import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { RsaService } from './rsa-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RsaService]
})
export class AppComponent {
  title = 'app';
  @ViewChild('form')
  form: ElementRef;
  // url = 'https://theopallabs.com/ccavenueapi/payment/ccavRequestHandler';
  url = 'http://192.168.0.110/ccavenueapi/payment/ccavRequestHandler';


  encRequest: String;
  accessCode: String;
  orderId = 10;
  encryptedData: string;
  decryptedData: string;
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

  constructor(private httpClient: HttpClient, private rsaService: RsaService) {}
  ngOnInit() {
    this.accessCode = 'AVEI77FE93AU82IEUA';
    const fd = this.saveMsadetail(
      176088,
      2597145,
      'INR',
      1,
      'https://theopallabs.com/ccavenueapi/payment/ccavResponseHandler',
      'https://theopallabs.com/ccavenueapi/payment/ccavResponseHandler',
      'en',
      'AVEI77FE93AU82IEUA'
    );
    this.getEncRequest(fd).subscribe(
      data => {
        console.log('data', data);
        this.encRequest = data as string;
        console.log('this.encRequest', this.encRequest);
      },
      error => {
        console.log(error);
      }
    );

    /* --------------------- for encrypt data ---------------- */

    // console.log(' JSON.stringify(this.formData)', JSON.stringify(this.formData));
    // this.encryptedData = this.rsaService.encrypt(JSON.stringify(this.formData));
    // console.log('this.encryptedData', this.encryptedData);
  }
  getEncRequest(fd) {
    return this.httpClient.post(this.url, fd,{
      headers: new HttpHeaders().set('Content-type', 'application/json')
    });

  }

  pay() {
    this.form.nativeElement.submit();
  }

  saveMsadetail(file, cId, uId, type, startdate, enddate, language, access_code) {
    const fd = new FormData();
    fd.append('merchant_id', file);
    fd.append('order_id', cId);
    fd.append('currency', uId);
    fd.append('amount', type);
    fd.append('redirect_url', startdate);
    fd.append('cancel_url', enddate);
    fd.append('language', language);
    fd.append('access_code', access_code);
    return fd;
  }
}
