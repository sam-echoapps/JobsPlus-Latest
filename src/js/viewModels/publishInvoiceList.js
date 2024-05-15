define(['ojs/ojcore',"knockout","jquery","appController","ojs/ojconverterutils-i18n", "ojs/ojarraydataprovider",'ojs/ojknockout-keyset', "ojs/ojresponsiveutils", "ojs/ojresponsiveknockoututils", "ojs/ojknockout", "ojs/ojlistitemlayout", "ojs/ojtrain",
        "ojs/ojlistview","ojs/ojradioset","ojs/ojlabelvalue","ojs/ojlabel" ,"ojs/ojselectcombobox","ojs/ojbutton" ,"ojs/ojprogress-bar", "ojs/ojdatetimepicker", 'ojs/ojtable', 'ojs/ojswitch', 'ojs/ojvalidationgroup','ojs/ojselector','ojs/ojtoolbar','ojs/ojfilepicker','ojs/ojcheckboxset', "ojs/ojavatar", "ojs/ojformlayout"], 
function (oj,ko,$, app, ojconverterutils_i18n_1, ArrayDataProvider,  ojknockout_keyset_1,ResponsiveUtils, ResponsiveKnockoutUtils, AsyncRegExpValidator) {
 "use strict";
    class PublishInvoiceViewModel {
        constructor(args) {
            var self = this

            self.record = ko.observable();
            self.router = args.parentRouter;
            var BaseURL = sessionStorage.getItem("BaseURL")
            self.CancelBehaviorOpt = ko.observable('icon'); 

            self.PublishInvoiceDet = ko.observableArray([]);
            self.clientNameCap = ko.observable(); 
            self.selectorSelectedItems = new ojknockout_keyset_1.ObservableKeySet();
            self.current_invoice_amount = ko.observable(0);
            self.due_amount = ko.observable(0);  
            self.outstanding_amount = ko.observable(0); 
            self.InvoiceList = ko.observableArray([]);
            self.invoice = ko.observable(); 
            self.received_amount = ko.observable(); 
            self.paid_amount = ko.observable(0); 
            self.received_date = ko.observable(); 
            self.updated_by = ko.observable(); 
            self.paid_invoices = ko.observable(); 
            self.previousTotal = ko.observable(0); 
            self.groupValid = ko.observable();
            self.groupDecision = ko.observable('invoice');
            self.oldBalance = ko.observable();
            self.totalAmount = ko.observable();
            self.advance_amount = ko.observable();
            self.value = ko.observable('No');

            self.connected = function () {
                if (sessionStorage.getItem("userName") == null) {
                    self.router.go({path : 'signin'});
                }
                else {
                    app.onAppSuccess();
                    getPublishInvoice()
                }
            }

            this.getBadgeClass = (status) => {
                switch (status) {
                    case "Pending":
                        return "oj-badge oj-badge-danger";
                    case "Paid":
                        return "oj-badge oj-badge-success";
                    default:
                        return "oj-badge";
                }
            };

            this.formatValues = [
                { id: "invoices", label: "Invoices" },
                { id: "receipt", label: "Receipt" },
            ]; 
            self.selectTab = ko.observable('invoices');  
            
            function getPublishInvoice(){
                var sum=0;
                let received=0;
                let oldBalance='Nil';
                let previousTotal='Nil';
                document.getElementById('loaderView').style.display='block';
                self.PublishInvoiceDet([]);
                self.InvoiceList([]);
                $.ajax({
                    url: BaseURL  + "/jpGetPublishInvoiceList",
                    type: 'POST',
                    data: JSON.stringify({
                        clientId : sessionStorage.getItem("clientId"),
                    }),
                    dataType: 'json',
                    timeout: sessionStorage.getItem("timeInetrval"),
                    context: self,
                    error: function (xhr, textStatus, errorThrown) {
                        if(textStatus == 'timeout' || textStatus == 'error'){
                            document.querySelector('#TimeoutSup').open();
                        }
                    },
                    success: function (result) {
                        document.getElementById('loaderView').style.display='none';
                        document.getElementById('mainView').style.display='block';
                        var data = JSON.parse(result[0]);
                        console.log(data)
                        self.clientNameCap(result[1][0][0].toUpperCase())
                        console.log(result[2])
                        var resultVal = JSON.parse(result[2]);
                        console.log(resultVal)
                        if(resultVal.length!=0){
                            received=resultVal[0][0]
                            oldBalance=resultVal[0][1]
                            previousTotal=resultVal[0][5]
                            self.totalAmount(resultVal[0][6])

                            if(resultVal[0][2]!=0){
                                var inputString = resultVal[0][2];
                                var values = inputString.split(',');
                                var resultString = [];
                                
                                for (var i = 0; i < values.length; i++) {
                                    var fixedValue = parseInt(values[i]);
                                    var uniqueIdentifier = "INV" + (8000 + fixedValue);
                                    resultString.push(uniqueIdentifier);
                                }               
                            self.paid_invoices(resultString.join(','))
                            }else{
                                self.paid_invoices('N/A')
                            }
                            self.updated_by(resultVal[0][3])
                            self.received_date(resultVal[0][4])
                        }else{
                            self.received_date('N/A')
                            self.updated_by('N/A')
                            self.paid_invoices('N/A')
                            self.totalAmount(0)
                        }   
                        if(data.length!=0){
                        for (var i = 0; i < data.length; i++) {
                            var utcDateString = data[i][7] + " UTC";
                            var utcDateObject = new Date(utcDateString);
                            var localYear = utcDateObject.getFullYear();
                            var localMonth = utcDateObject.getMonth() + 1; // Note: Month is zero-based, so we add 1
                            var localDay = utcDateObject.getDate();
                            var localHours = utcDateObject.getHours();
                            var localMinutes = utcDateObject.getMinutes();
                            var localSeconds = utcDateObject.getSeconds();
                            var formattedLocalDate = localYear + '-' + (localMonth < 10 ? '0' : '') + localMonth + '-' + (localDay < 10 ? '0' : '') + localDay +
                                ' ' + (localHours < 10 ? '0' : '') + localHours + ':' + (localMinutes < 10 ? '0' : '') + localMinutes + ':' + (localSeconds < 10 ? '0' : '') + localSeconds;
                            console.log(formattedLocalDate);
                            self.PublishInvoiceDet.push({'id': data[i][0],'serial_number': "INV"+(8000+data[i][0]),'start_date': data[i][1], 'end_date': data[i][2], 'grand_total': data[i][3], 'invoice_date': data[i][4], 'payment_due_date': data[i][5], 'client_pay_status': data[i][6], 'updated_at': formattedLocalDate});
                            self.InvoiceList.push({'value' : data[i][0], 'label' : "INV"+(8000+data[i][0])});
                            sum += parseFloat(data[i][3]);                            
                            self.current_invoice_amount(data[0][3])
                    }
                    self.paid_amount(received)
                    if(self.totalAmount()<0){
                        //alert(received)
                        self.value('Yes');
                        self.outstanding_amount(0)
                        // self.advance_amount((parseFloat(received)-parseFloat(previousTotal)))
                        self.advance_amount(-(parseFloat(self.totalAmount())))
                    }else{
                    if(oldBalance=='Nil'){
                        //alert('a')
                        self.outstanding_amount(sum-received)
                        self.previousTotal(parseFloat(sum))
                        self.due_amount(self.outstanding_amount()-self.current_invoice_amount())
                    }
                    // else if(oldBalance>0){
                    //     alert('b')

                    // self.outstanding_amount(parseFloat(oldBalance)+parseFloat(self.current_invoice_amount()))
                    // self.previousTotal(previousTotal)
                    // self.due_amount(self.outstanding_amount()-self.current_invoice_amount())

                    // }
                    else if(oldBalance>0){
                        // alert('b')
                        // alert(oldBalance)
                    self.outstanding_amount(self.totalAmount())
                    self.previousTotal(previousTotal)
                    self.due_amount(oldBalance)

                    }else if(oldBalance<0){
                       // alert('c')
                        //alert(self.due_amount())
                        if(self.due_amount() == undefined){
                            self.due_amount(0)
                        }
                        //alert(self.due_amount())
                        if (self.due_amount() == 0 && self.totalAmount()< self.current_invoice_amount()) {
                            //alert("jhj")
                            // let newValue = self.totalAmount()+oldBalance;
                            // alert(newValue)
                            self.previousTotal(previousTotal)
                            self.outstanding_amount(parseFloat(oldBalance)+parseFloat(self.totalAmount()))
                        }else{
                            //alert("ttt")

                        self.due_amount(0);
                        self.outstanding_amount(self.totalAmount())
                        self.previousTotal(previousTotal)
                        //self.outstanding_amount(parseFloat(self.previousTotal()-parseFloat(received)))
                        }
                    }
                else if(oldBalance==0){
                    //alert('d')
                    self.due_amount(0);
                    self.outstanding_amount(self.current_invoice_amount())
                    self.previousTotal(previousTotal)
                }
            }
               
                    // else if(oldBalance == self.received_amount()){
                    //     alert("h")
                    //     self.due_amount(oldBalance-self.received_amount())
                    //     // self.outstanding_amount(parseFloat(self.current_invoice_amount())+parseFloat(received))
                    //     self.outstanding_amount(parseFloat(self.current_invoice_amount()))
                    //     //self.previousTotal(parseFloat(self.outstanding_amount())+parseFloat(received))
                    // }
                    
                    //self.due_amount(self.outstanding_amount()-self.current_invoice_amount())
                    
                    }else{
                        if(self.totalAmount()<0){
                            //alert("hgg")
                            self.value('Yes');
                            self.outstanding_amount(0)
                            self.advance_amount(-(parseFloat(self.totalAmount())+parseFloat(self.current_invoice_amount())))
                        }else{
                            //alert("hj")
                        }

                        document.getElementById('amountSection').style.display='none';
                    }
                    // if (self.due_amount() == 0) {
                    //         self.due_amount(0);
                    // }else{
                    //     self.due_amount(self.outstanding_amount()-self.current_invoice_amount())
                    // }
                    // if(self.previousTotal() == undefined){
                    //     self.previousTotal(self.outstanding_amount())
                    // }
                    // if (self.due_amount() < 0) {
                    //     alert('4');
                    //     alert(self.previousTotal())
                    //     self.due_amount(0);
                    //    self.outstanding_amount(self.previousTotal() - received);
                    // } else if (self.due_amount() == received) {
                    //     alert('2');
                    //     self.due_amount(0);
                    //     //self.outstanding_amount(self.current_invoice_amount());
                    // } else if (self.due_amount() > received && received != 0) {
                    //     alert('3');
                    //     alert(self.due_amount())
                    //     //self.due_amount(self.due_amount() - received);
                    //     //self.outstanding_amount(self.outstanding_amount() - received);
                    //    self.outstanding_amount(self.due_amount());
                    // } else if (self.due_amount() == 0) {
                    //     alert('1');
                    //     self.due_amount(0);
                    //     //self.outstanding_amount(self.current_invoice_amount() - received);
                    // }
                    // self.oldBalance(oldBalance)
                    
                }
                })
                
               
            }
            self.dataProvider = new ArrayDataProvider(this.PublishInvoiceDet, { keyAttributes: "id"});
            self.dataProvider1 = new ArrayDataProvider(this.InvoiceList, { keyAttributes: "value"});

            self.viewPublishInvoice  = function (event,data) {
                var clickedRowId = data.data.id
                console.log(clickedRowId)
                sessionStorage.setItem("invoiceId", data.data.id);
                sessionStorage.setItem("startDate", data.data.start_date);
                sessionStorage.setItem("endDate", data.data.end_date);
                self.router.go({path:'viewPublishInvoice'})
            }

            self.ConfirmDeleteInvoice = function (event,data) {
                var clickedRowId = data.data.id
                sessionStorage.setItem("invoiceRowId", clickedRowId);
                console.log(clickedRowId)
                if(clickedRowId !=undefined){
                    document.querySelector('#openConfirmDeleteInvoice').open();  
                }          
             }

            self.deleteInvoice  = function (event,data) {
                document.querySelector('#openDeleteProgress').close();
                     $.ajax({
                        url: BaseURL + "/jpDeleteInvoice",
                        type: 'POST',
                        data: JSON.stringify({
                           rowId : sessionStorage.getItem("invoiceRowId")
                        }),
                        dataType: 'json',
                        timeout: sessionStorage.getItem("timeInetrval"),
                        context: self,
                        error: function (xhr, textStatus, errorThrown) {
                            if(textStatus == 'timeout' || textStatus == 'error'){
                                document.querySelector('#TimeoutSup').open();
                            }
                        },
                        success: function (data) {
                            document.querySelector('#openDeleteProgress').close();
                            console.log(data)
                            location.reload();
                    }
                    })          
               
            }


            self.invoiceAmountReceived = function (event,data) {
                var validSec1 = self._checkValidationGroup("receivedSec");
                var previousBalance;
                var balanceAmount;
                
                if(self.totalAmount()==0){
                    self.totalAmount(self.outstanding_amount())
                }
                if(self.groupDecision()=='due'){
                    self.invoice('0')
                }
                if(self.due_amount()==self.received_amount()){
                    //alert('a')
                    balanceAmount =  (parseFloat(self.due_amount()-parseFloat(self.received_amount())));
                    previousBalance = (parseFloat(self.current_invoice_amount()+parseFloat(self.oldBalance())));
                }else if(self.due_amount()<self.received_amount()){
                    //alert('b')
                    // balanceAmount =  (parseFloat(self.due_amount()-parseFloat(self.received_amount())));
                    // previousBalance = (parseFloat(self.current_invoice_amount()+parseFloat(self.oldBalance())))
                    balanceAmount = (parseFloat(self.outstanding_amount())-(parseFloat(self.received_amount()))); 
                    previousBalance = (parseFloat(self.totalAmount())-parseFloat(self.received_amount()));;
                }else if(self.due_amount()>self.received_amount()){
                    //alert('c')
                    // balanceAmount = (parseFloat(self.due_amount()-parseFloat(self.received_amount()))); 
                    // previousBalance = (parseFloat(self.totalAmount())-parseFloat(self.received_amount()));
                    balanceAmount =  (parseFloat(self.due_amount()-parseFloat(self.received_amount())));
                    previousBalance = (parseFloat(self.outstanding_amount()-parseFloat(self.received_amount())));
                }
                // alert(balanceAmount)
                // alert(previousBalance)
                // alert(self.outstanding_amount())

                // if(self.due_amount()==0 && self.oldBalance()>0){
                //     alert("1111")
                //   previousBalance = self.current_invoice_amount() - self.oldBalance();
                // }else if(self.due_amount()==0 && self.oldBalance()<=0){
                //     alert("2222")
                //     previousBalance = (parseFloat(self.current_invoice_amount()+parseFloat(self.oldBalance())));
                //   }else{
                //     alert("3333")
                //     previousBalance = self.previousTotal()
                // }
                // alert(previousBalance)
                if (validSec1) {
                    $.ajax({
                    url: BaseURL + "/jpInvoiceAmountReceived",
                    type: 'POST',
                    data: JSON.stringify({
                        clientId : sessionStorage.getItem("clientId"),
                        invoice_id : self.invoice(),
                        received_amount : self.received_amount(),
                        balance_amount : balanceAmount,
                        created_by : sessionStorage.getItem("userName"),
                        previousTotal : self.outstanding_amount(),
                        totalAmount : previousBalance,
                    }),
                    dataType: 'json',
                    timeout: sessionStorage.getItem("timeInetrval"),
                    context: self,
                    error: function (xhr, textStatus, errorThrown) {
                        if(textStatus == 'timeout'){
                            document.querySelector('#openInvoiceSaveProgress').close();
                            document.querySelector('#Timeout').open();
                        }
                    },
                    success: function (data) {
                        console.log(data)
                        // document.querySelector('#openInvoiceSaveProgress').close();
                        // var lastUpdatedId = data[0][0]
                        // sessionStorage.setItem("invoiceId",data[0][0])
                        // //getInvoiceDetails(lastUpdatedId)
                        location.reload();
                    }
                })
            }
            }

            self._checkValidationGroup = (value) => {
                ////console.log(value)
                var tracker = document.getElementById(value);
                ////console.log(tracker.valid)
                if (tracker.valid === "valid") {
                    return true;
                }
                else {

                    tracker.showMessages();
                    tracker.focusOn("@firstInvalidShown");
                    return false;
                }
            };

            self.downloadReceipt = function (event,data) {
                document.title = self.received_date()
                var printContents = document.getElementById('receipt').innerHTML;
                document.body.innerHTML = "<html><head><title></title></head><body>" + printContents + "</body>";
                window.print(); 
                location.reload()
            }
                
            
            
        }
        
    }
    return PublishInvoiceViewModel;
});