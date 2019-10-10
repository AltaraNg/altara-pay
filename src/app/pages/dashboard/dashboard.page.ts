import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { AlertService } from 'src/app/services/alert.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  user: User;
  isLinear = true;
  product: {
    name: string,
    type: string;
    plan: string,
    price: number,
    downpayment: number,
    repayment: number
  };
  saleTypes: any;
  salePlans: any;
  saleType: any;
  salePlan: any;
  salePlanPercent: any;

  productForm = new FormGroup({
    name: new FormControl(''),
    type: new FormControl(''),
    plan: new FormGroup({
      price: new FormControl(''),
      downpayment: new FormControl(''),
      repayment: new FormControl(''),
    })
  });

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;
  isUpdated: boolean = true;
  customerData: any;
  update: any;
  productData: any;
  productPrice: number;
  productName: any = '';
  dataToSave: any;
  amount: number;
  ref: number;
  remainder: any;
  repayLevel: any;
  order = {
    return: 0,
    p_reciept: '',
    p_date: '',
    cate_gory: 1,
    custp_id: '',
    product_sku: '',
    product_price: '',
    down_pay: '',
    sales_agent: '',
    product_name: '',
    product_gty: 1,
    sale_type: '',
    discount: '',
    repaymt: '',
    pay_mtd: 4,
    dep_to: 1,
    referrer_id: '',
  }
  repay = {
    repayid: '',
    date_payed: '',
    amount_payed: 0,
    period: '',
    nowdate: '',
    nextdate: '',
    pay_bank: 1,
    pay_mtd: 4
  }
  b_code: any;
  sub_acct: any;
  order_id: string;
  verifyData: any;
  lastReceipt: any
  constructor(private _formBuilder: FormBuilder,
    private menu: MenuController,
    private authService: AuthService,
    private alertService: AlertService,
    private platform: Platform,
    private storage: NativeStorage,
    private navCtrl: NavController
  ) {
    this.menu.enable(true);

  }

  ngOnInit() {

    this.saleTypes = [
      // { id: 1, name: "New -0%", percent: 0 },
      // { id: 2, name: "sala-promo -0%", percent: 0 },
      // { id: 3, name: "group5 -5%", percent: 5 },
      // { id: 4, name: "group10 -10%", percent: 10 },
      // { id: 5, name: "xmas-promo -0%", percent: 0 },
      // { id: 6, name: "Renewal -5%", percent: 5 },
      // { id: 7, name: "family-friend -5%", percent: 5 },
      { id: 8, name: "Direct Debit -5%", percent: 5 }
      // { id: 9, name: "Opening -10%", percent: 10 }
    ];
    this.salePlans = [{ id: 1, name: "6 month plan 0%", percent: 0 },
    { id: 2, name: "6 month plan 20%", percent: 20 },
    { id: 3, name: "6 month plan 40%", percent: 40 },
    { id: 4, name: "6 month plan 60%", percent: 60 },
    { id: 5, name: "6 month plan 80%", percent: 80 }
    ];

    this.b_code = [
      { id: 2, code: 'ACCT_z6a4tsvupmoo0hz' },
      { id: 4, code: 'ACCT_93q2vycqxrg4nau' },
      { id: 5, code: 'ACCT_ahye96qmminhs36' },
      { id: 6, code: 'ACCT_88vzjvjeskbfe39' },
      { id: 8, code: 'ACCT_8p45z039s2inwwe' },
      { id: 9, code: 'ACCT_88vzjvjeskbfe39' },
      { id: 11, code: 'ACCT_w3ola5amahnl7mc' },
      { id: 12, code: 'ACCT_fmntykscho1l47g' }
    ]



    this.sixthFormGroup = this._formBuilder.group({
      repaymentPrice: [''],
      totalPrice: [''],
      downPayment: [''],
    })

    this.firstFormGroup = this._formBuilder.group({
      customerId: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      email: ['', Validators.required],
      first_name: ['', Validators.required],
      middle_name: [''],
      last_name: ['', Validators.required],
      phoneNo: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      productSku: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      saleType: ['', Validators.required],
      salePlan: ['', Validators.required]
    });
    this.fifthFormGroup = this._formBuilder.group({
      makePayment: ['1', Validators.required],
      downPayment: [{ value: 0.00, disabled: true }, Validators.required],
      enterAmount: [0.00, Validators.required],
    });
  }


  ionViewWillEnter() {
    // this.authService.user().subscribe(
    //   user => {
    //     this.user = user;
    //   }
    // );
  }


  get radioValue() {
    return this.fifthFormGroup.get('makePayment').value;
  }


  checkId(stepper: MatStepper) {
    this.authService.comfirmId(this.firstFormGroup.value.customerId).subscribe(
      result => {
        console.log(result);
        this.customerData = result;
        if (this.customerData.checklist.length === 0) {
          this.alertService.presentToast("Invalid Customer ID");
        }
        else {
          console.log(this.customerData.checklist[0].email)
          this.secondFormGroup = this._formBuilder.group({
            email: [this.customerData.checklist[0].email, Validators.required],
            first_name: [this.customerData.checklist[0].first_name, Validators.required],
            middle_name: [this.customerData.checklist[0].middle_name],
            last_name: [this.customerData.checklist[0].last_name, Validators.required],
            phoneNo: [this.customerData.checklist[0].telephone, Validators.required]
          });

          stepper.next()
        }

      }
    );

  }
  // 130-0796-CHE-ELO-AP

  confirmData(stepper: MatStepper) {

    this.authService.updatesCustomerInfo(
      this.firstFormGroup.value.customerId,
      this.secondFormGroup.value.email,
      this.secondFormGroup.value.first_name,
      this.secondFormGroup.value.middle_name,
      this.secondFormGroup.value.last_name,
      this.secondFormGroup.value.phoneNo)
      .subscribe(
        result => {
          console.log(result);
          this.update = result;
          this.isUpdated = this.update.error;
          if (this.isUpdated == false) {
            // create customer in paystack
            this.alertService.presentToast("Customer Info Comfirmed .. Saving Data to Paystack");
            this.authService.createCustomer(this.firstFormGroup.value.customerId,
              this.secondFormGroup.value.email,
              this.secondFormGroup.value.first_name,
              this.secondFormGroup.value.last_name,
              this.secondFormGroup.value.phoneNo).subscribe(response => {
                console.log(response);
                this.dataToSave = response;
                if (this.dataToSave != {}) {
                  this.alertService.presentToast("Customer Data Saved to Paystack");
                  this.authService.paystackCustomer(this.firstFormGroup.value.customerId, this.dataToSave.data.customer_code).subscribe(res => {
                    // if (res) {
                    console.log(res);
                    // }
                  })
                  stepper.next();
                }
                else {
                  this.alertService.presentToast("Problem Saving Data to Paystack");
                }
              })
          }
          else {
            this.alertService.presentToast("Comfirmation Error");
          }
        })
  }

  checkProductSku(stepper: MatStepper) {
    this.authService.comfirmProduct(this.thirdFormGroup.value.productSku).subscribe(
      result => {
        console.log(result);
        this.productData = result;
        if (this.productData.users.length === 0) {
          this.alertService.presentToast("Product Not Available");
        }
        else {
          console.log(this.productData.users[0].product_name)
          this.productPrice = this.productData.users[0].pc_pprice
          // this.sixthFormGroup.get('productName').setValue(this.productData.users[0].product_name);
          this.productName = this.productData.users[0].product_name;
          this.platform.ready().then(() => {
            this.storage.setItem('branch_id', this.productData.users[0].store_name)
              .then(
                () => {
                  console.log('branch ID Stored');
                },
                error => console.error('Error storing item', error)
              );
          });
          stepper.next()
        }
      })
  }

  processBankcode() {
    this.authService.getBranchId().then(() => {
      console.log(this.authService.branch_id);
      this.b_code.forEach(element => {
        if (element.id == Number(this.authService.branch_id)) {
          this.sub_acct = element.code;
          console.log(this.sub_acct);
        }
      });
    })
  }


  processRecieptNo(stepper: MatStepper) {
    var re: any;
    this.authService.getBranchId().then(() => {
      this.authService.getLastreceipt().subscribe(
        result => {
          re = result;
          this.lastReceipt = re.id[0].id
          // this.lastReceipt = 'LSIW00022'
          console.log(this.lastReceipt);
          if (result) {
            this.pushauthCode(this.computeR(this.lastReceipt), this.verifyData.data.authorization.authorization_code, stepper)
          }
        })
    });
  }

  computeR(rec: any) {
    var nR: any;
    var nR;
    var prefix = rec.substring(0, 4);
    console.log(Number(rec.substring(4)) + 1)
    var r = Number(rec.substring(4)) + 1
    // challenge 
    if (prefix == 'APCH') {
      nR = prefix + '0000' + r
    }
    else if (r.toString().length == 2) {
      nR = prefix + '000' + r
    }
    else if (r.toString().length == 3) {
      nR = prefix + '00' + r
    }
    else if (r.toString().length == 4) {
      nR = prefix + '0' + r
    }
    else {
      nR = prefix + r
    }
    return nR
  }

  checkTypePlan(stepper: MatStepper) {
    console.log(this.thirdFormGroup.value)
    this.salePlans.forEach(element => {
      if (element.id == this.fourthFormGroup.value.salePlan) {
        this.salePlan = element.name;
        this.salePlanPercent = element.percent;
      }
    });
    this.saleTypes.forEach(element => {
      if (element.id = this.fourthFormGroup.value.saleType) {
        this.saleType = element.name;
      }
    });
    if (this.thirdFormGroup.value) {
      this.priceCal();
      stepper.next()
    }
    else {
      stepper.previous()
    }
  }
  makePayment(stepper: MatStepper) {
    console.log(this.fifthFormGroup.value)
    if (this.fifthFormGroup.value) {
      stepper.next()
    }
    else {
      stepper.previous()
    }
  }

  priceCal() {
    let dPrice, rPrice, afInt, pInt, aTax, upFront, rePay, mRepay, int;
    let mPrice = this.productPrice;
    let plan = this.salePlanPercent;
    let margin = 0.25;
    let totalP, downP, rPay;

    if (mPrice < 18000) {
      mPrice = Math.ceil((mPrice * margin) + Number(mPrice));

      int = (plan == 0) ? 3.3 : 3;

      dPrice = Math.ceil(((plan == 0) ? 0 : mPrice * (plan / 100)) / 100) * 100;

      rPrice = Math.ceil((mPrice - dPrice) / 100) * 100;

      afInt = Math.ceil(((rPrice * (int / 100)) * 12) / 100) * 100;

      pInt = Math.ceil((afInt + dPrice + rPrice) / 100) * 100;

      aTax = Math.ceil((((0.05 * pInt) + pInt)) / 100) * 100;

      upFront = Math.ceil(((plan == 0) ? 0 : aTax * (plan / 100)) / 100) * 100;

      rePay = Math.ceil((aTax - upFront) / 100) * 100;

      mRepay = Math.ceil((rePay / 12) / 100) * 100;
      console.log(upFront, rePay, mRepay)
      downP = upFront
      rPay = mRepay * 2
      totalP = (rPay * 6 + downP);
      this.sixthFormGroup = this._formBuilder.group({
        repaymentPrice: [rPay],
        totalPrice: [totalP],
        downPayment: [downP],
      })

    }
    else {
      mPrice = (mPrice * margin) + Number(mPrice);
      int = (plan == 0) ? 3.3 : 3;
      dPrice = (plan == 0) ? 0 : mPrice * (plan / 100);
      rPrice = mPrice - dPrice;
      afInt = (rPrice * (int / 100)) * 12;
      pInt = afInt + dPrice + rPrice;
      aTax = ((0.05 * pInt) + pInt);
      upFront = (plan == 0) ? 0 : aTax * (plan / 100);
      rePay = aTax - upFront;
      mRepay = (rePay / 12);

      console.log(upFront, rePay, mRepay)
      // totalP, downP,rPay;
      downP = Math.floor(upFront / 100) * 100
      rPay = (Math.floor(mRepay / 100) * 100) * 2
      totalP = (rPay * 6 + downP);
      this.sixthFormGroup = this._formBuilder.group({
        repaymentPrice: [rPay],
        totalPrice: [totalP],
        downPayment: [downP],
      })

    }


  }

  processAmount(stepper: MatStepper) {
    this.fifthFormGroup = this._formBuilder.group({
      makePayment: [this.fifthFormGroup.value.makePayment, Validators.required],
      downPayment: [{ value: this.sixthFormGroup.value.downPayment, disabled: true }, Validators.required],
      enterAmount: [this.fifthFormGroup.value.enterAmount, Validators.required],
    });
    stepper.next()
  }

  processPayment(stepper: MatStepper) {
    this.processBankcode();
    this.ref = Math.floor((Math.random() * 1000000000) + 1);
    console.log(this.fifthFormGroup.value.makePayment, this.fifthFormGroup.value.enterAmount, this.fifthFormGroup.value.downPayment)
    if (this.fifthFormGroup.value.makePayment == '2' && (this.fifthFormGroup.value.enterAmount <= this.sixthFormGroup.value.downPayment)) {
      this.alertService.presentToast(" Amount must be greater than Down Payment");
    }
    else {
      if (this.fifthFormGroup.value.makePayment == '2') {
        this.amount = Number(this.fifthFormGroup.value.enterAmount + '00')
      }
      else {
        this.amount = Number(this.sixthFormGroup.value.downPayment + '00');
      }
      stepper.next()
    }

  }

  paymentCancel(stepper: MatStepper) {
  }

  paymentDone($event, stepper: MatStepper) {
    this.authService.generateAuthKey(this.ref).subscribe(
      result => {
        console.log(result);
        this.verifyData = result;
        if (result) {
          this.processRecieptNo(stepper);
        }
      })
  }

  toFormData(obj: any) {
    var form_data = new FormData();
    for (var key in obj) {
      form_data.append(key, obj[key]);
    }
    return form_data;
  }

  pushauthCode(order_id: any, auth_code: any, stepper: MatStepper) {
    this.authService.logAuthcode(order_id, auth_code).subscribe(
      result => {
        if (result) {

          this.authService.getEpId().then(() => {
            console.log(this.authService.id);
            this.order.sales_agent = this.authService.id;
            this.pushOrder(stepper);
          });
        }
      })
  }

  pushOrder(stepper: MatStepper) {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    this.order.p_date = date;
    this.order.custp_id = this.firstFormGroup.value.customerId;
    this.order.p_reciept = this.computeR(this.lastReceipt);
    this.order.product_sku = this.thirdFormGroup.value.productSku;
    this.order.product_price = this.sixthFormGroup.value.totalPrice;

    if (this.amount == Number(this.sixthFormGroup.value.downPayment + '00')) {
      this.repayLevel = 'firstpayment';
    }
    else {
      this.remainder = this.amount - Number(this.sixthFormGroup.value.downPayment + '00')
      this.repayLevel = '1st';
    }
    this.order.down_pay = this.sixthFormGroup.value.downPayment;
    this.order.sale_type = this.fourthFormGroup.value.salePlan;
    this.order.discount = this.fourthFormGroup.value.saleType;
    this.order.repaymt = this.sixthFormGroup.value.repaymentPrice;
    this.order.referrer_id = this.firstFormGroup.value.customerId;;
    this.order.product_name = this.productName;
    console.log(this.order);
    let formData = this.toFormData(this.order);

    this.authService.postOrder(formData).subscribe(
      result => {
        if (result) {
          console.log(result);
          this.alertService.presentToast("Order Posted");
          this.pushRepayment(stepper);
        }
        else {
          this.alertService.presentToast("Payment Made but an Issue occured, Contact Support");
        }
      })
  }
  addDays(date: Date, days: number) {
    var result = new Date(date);
    result.setDate(date.getDate() + days);
    return result;
  }

  formatDate(date: Date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }

  pushRepayment(stepper: MatStepper) {
    this.repay.repayid = this.computeR(this.lastReceipt);
    this.repay.date_payed = this.order.p_date;
    this.repay.amount_payed = this.remainder / 100;
    this.repay.period = this.repayLevel;
    this.repay.nowdate = this.order.p_date;
    this.repay.nextdate = this.formatDate(this.addDays(new Date(this.order.p_date), 28));
    console.log(this.repay);
    let formData = this.toFormData(this.repay);

    this.authService.updateRepayment(formData).subscribe(
      result => {
        if (result) {
          console.log(result);
          this.alertService.presentToast("Repayment Posted");
          this.lastReceipt = '';
          stepper.reset();
          this.ngOnInit();
        }
      })
  }



  logout() {
    this.authService.logout();
    if (this.authService.isLoggedIn) {
      this.alertService.presentToast('Problem Logging Out');
    }
    else {
      this.navCtrl.navigateRoot('/login');
    }
  }


}
