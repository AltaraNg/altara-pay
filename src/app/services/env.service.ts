import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  // API_URL = 'http://localhost/AltaraCredit/altara_api/api.php?action=';
  API_URL = 'https://altara-api.herokuapp.com/api.php?action=';
  
  PAYSTACK_CUSTOMER_API= 'https://api.paystack.co/customer';
  PAYSTACK_CUSTOMER_VERIFY='https://api.paystack.co/transaction/verify/';
  
  constructor() { }
}
