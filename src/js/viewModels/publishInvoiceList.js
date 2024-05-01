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
            self.current_invoice_amount = ko.observable();
            self.due_amount = ko.observable();  
            self.outstanding_amount = ko.observable(); 
            self.InvoiceList = ko.observableArray([]);
            self.invoice = ko.observable(); 
            self.received_amount = ko.observable(); 


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
                    self.outstanding_amount(sum)
                    self.due_amount(parseFloat(self.outstanding_amount()-self.current_invoice_amount()).toFixed(2))
                    }else{
                        document.getElementById('amountSection').style.display='none';
                    }
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
            
            
        }
        
    }
    return PublishInvoiceViewModel;
});