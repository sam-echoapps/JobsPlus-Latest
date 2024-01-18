define(['ojs/ojcore',"knockout","jquery","appController","ojs/ojconverterutils-i18n", "ojs/ojarraydataprovider","ojs/ojpagingdataproviderview",'ojs/ojknockout-keyset', "ojs/ojresponsiveutils", "ojs/ojresponsiveknockoututils", "ojs/ojknockout", "ojs/ojlistitemlayout", "ojs/ojtrain",
        "ojs/ojlistview","ojs/ojradioset","ojs/ojlabelvalue","ojs/ojlabel" ,"ojs/ojselectcombobox","ojs/ojbutton" ,"ojs/ojprogress-bar", "ojs/ojdatetimepicker", 'ojs/ojtable', 'ojs/ojswitch', 'ojs/ojvalidationgroup','ojs/ojselector','ojs/ojtoolbar','ojs/ojfilepicker','ojs/ojcheckboxset', "ojs/ojavatar","ojs/ojactioncard","ojs/ojmenu","ojs/ojformlayout","ojs/ojpagingcontrol"], 
function (oj,ko,$, app, ojconverterutils_i18n_1, ArrayDataProvider, PagingDataProviderView,  ojknockout_keyset_1,ResponsiveUtils, ResponsiveKnockoutUtils, AsyncRegExpValidator) {
    
    class dasboardAdminfViewModel {
        constructor(context) {
            var self = this;
            var BaseURL = sessionStorage.getItem("BaseURL");
            self.totalStaff = ko.observable('');
            self.activeStaff = ko.observable('');
            self.inactiveStaff = ko.observable('');
            self.pendingStaff = ko.observable('');
            self.username = ko.observable('');
            self.CancelBehaviorOpt = ko.observable('icon'); 
            self.TotalStaffDet = ko.observableArray([]);
            self.ActiveStaffDet = ko.observableArray([]);
            self.InactiveStaffDet = ko.observableArray([]);
            self.PendingStaffDet = ko.observableArray([]);
            self.CustomTotalStaffDet = ko.observableArray([]);
            self.blob = ko.observable();
            self.fileName = ko.observable();
            self.start_date = ko.observable('');
            self.end_date = ko.observable('');
            self.groupValid = ko.observable();

            self.menuItems = [
                {
                    id: 'last-week',
                    label: 'Last Week',
                    icon: 'oj-ux-ico-save'
                },
                {
                    id: 'last-month',
                    label: 'Last Month',
                    icon: 'oj-ux-ico-download'
                },
                {
                    id: 'custom',
                    label: 'Custom',
                    icon: 'oj-ux-ico-print'
                }
            ];

            self.menuItemActive = [
                {
                    id: 'active-view',
                    label: 'View All',
                    icon: 'oj-ux-ico-save'
                },
            ];

            self.menuItemInactive = [
                {
                    id: 'inactive-view',
                    label: 'View All',
                    icon: 'oj-ux-ico-save'
                },
            ];

            self.menuItemPending = [
                {
                    id: 'pending-view',
                    label: 'View All',
                    icon: 'oj-ux-ico-save'
                },
            ];
            self.flag = ko.observable('0');

            self.connected = function () {
                if (sessionStorage.getItem("userName") == null) {
                    self.router.go({ path: 'signin' });
                }
                else {
                   app.onAppSuccess();
                   self.username(sessionStorage.getItem("userName"));
                   getTotalStaff();
                }
            };
            self.context = context;
            self.router = self.context.parentRouter;

            function getTotalStaff() {
                $("#mainView").hide();
                $("#loaderView").show();
                $.ajax({
                    url: BaseURL + "/jpDashboardCountGet",
                    type: 'GET',
                    dataType: 'json',
                    timeout: sessionStorage.getItem("timeInetrval"),
                    context: self,
                    error: function (xhr, textStatus, errorThrown) {
                        if(textStatus == 'timeout' || textStatus == 'error'){
                            document.querySelector('#TimeoutSup').open();
                        }
                    },
                    success: function (data) {
                        $("#mainView").show();
                        $("#loaderView").hide();
                        console.log(data)
                        self.totalStaff(data[0][0][0])
                        self.activeStaff(data[1][0][0])
                        self.inactiveStaff(data[2][0][0])
                        self.pendingStaff(data[3][0][0])
                }
                })
            }


            self.totalStaffPopup = function (event) {
                //self.TotalStaffDet([]);
                getTotalStaffList();
                let popup = document.getElementById("totalStaffPopup");
                popup.open();
            }
        
            self.closeTotalStaffPopup = function (event) {
                self.TotalStaffDet([]);
                let popup = document.getElementById("totalStaffPopup");
                popup.close();
                location.reload();
            }

            function getTotalStaffList(){
                $("#loaderViewPopup").show();
                $.ajax({
                    url: BaseURL+ "/jpTotalStaffGet",
                    type: 'GET',
                    dataType: 'json',
                    timeout: sessionStorage.getItem("timeInetrval"),
                    context: self,
                    error: function (xhr, textStatus, errorThrown) {
                        if(textStatus == 'timeout' || textStatus == 'error'){
                            document.querySelector('#TimeoutSup').open();
                        }
                    },
                    success: function (data) {
                        //self.TotalStaffDet([]);
                        console.log(data)
                        var csvContent = '';
                        var headers = ['SL.No', 'Name', 'Email','Country Code','Contact', 'Job Role', 'Status'];
                        csvContent += headers.join(',') + '\n';
                        $("#loaderViewPopup").hide();
                         for (var i = 0; i < data[0].length; i++) {
                            if(data[0][i][17] == "Deactive"){
                                data[0][i][17] = "Inactive"
                            }
                            self.TotalStaffDet.push({'no': i+1,'id': data[0][i][0],'name' : data[0][i][2] + " " + data[0][i][3], 'email': data[0][i][11],'contact': data[0][i][15] + data[0][i][12],'role': data[0][i][4],'status': data[0][i][17]  });
                            var rowData = [i+1, data[0][i][2] + " " +  data[0][i][3],  data[0][i][11],   data[0][i][15], data[0][i][12],  data[0][i][4],  data[0][i][17]] ;
                            csvContent += rowData.join(',') + '\n';
                    }
                    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                    var today = new Date();
                    var fileName = 'Registered_Users_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
                    self.blob(blob);
                    self.fileName(fileName);
                }
                })
            }

            self.menuItemActiveSelect = function (event) {
                //self.ActiveStaffDet([]);
                var target = event.target;
                var itemValue = target.value;
                console.log(itemValue)
                getActiveStaffList();
                let popup = document.getElementById("activeStaffPopup");
                popup.open();
            }

            self.activeStaffPopup = function (event) {
                //self.ActiveStaffDet([]);
                getActiveStaffList();
                let popup = document.getElementById("activeStaffPopup");
                popup.open();
            }
        
            self.closeActiveStaffPopup = function (event) {
                //self.ActiveStaffDet([]);
                let popup = document.getElementById("activeStaffPopup");
                popup.close();
                location.reload();
            }

            function getActiveStaffList(){
                $("#loaderActivePopup").show();
                $.ajax({
                    url: BaseURL + "/jpActiveStaffDashboardGet",
                    type: 'GET',
                    dataType: 'json',
                    timeout: sessionStorage.getItem("timeInetrval"),
                    context: self,
                    error: function (xhr, textStatus, errorThrown) {
                        if(textStatus == 'timeout' || textStatus == 'error'){
                            document.querySelector('#TimeoutSup').open();
                        }
                    },
                    success: function (data) {
                        //self.ActiveStaffDet([]);
                        $("#loaderActivePopup").hide();
                        var csvContent = '';
                        var headers = ['SL.No', 'Name', 'Email','Country Code','Contact', 'Job Role'];
                        csvContent += headers.join(',') + '\n';
                         for (var i = 0; i < data[0].length; i++) {
                            self.ActiveStaffDet.push({'no': i+1,'id': data[0][i][0],'name' : data[0][i][2] + " " + data[0][i][3], 'email': data[0][i][11],'contact': data[0][i][15] + data[0][i][12], 'role': data[0][i][4]  });
                            var rowData = [i+1, data[0][i][2] + " " +  data[0][i][3],  data[0][i][11],  data[0][i][15], data[0][i][12], data[0][i][4]] ;
                            csvContent += rowData.join(',') + '\n';
                    }
                    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                    var today = new Date();
                    var fileName = 'Active_Staff_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
                    self.blob(blob);
                    self.fileName(fileName);
                }
                })
            }
            
            self.menuItemInactiveSelect = function (event) {
                //self.InactiveStaffDet([]);
                var target = event.target;
                var itemValue = target.value;
                console.log(itemValue)
                getInactiveStaffList();
                let popup = document.getElementById("inactiveStaffPopup");
                popup.open();
            }

            self.inactiveStaffPopup = function (event) {
                //self.InactiveStaffDet([]);
                getInactiveStaffList();
                let popup = document.getElementById("inactiveStaffPopup");
                popup.open();
            }
        
            self.closeInactiveStaffPopup = function (event) {
                //self.InactiveStaffDet([]);
                let popup = document.getElementById("inactiveStaffPopup");
                popup.close();
                location.reload();
            }
            function getInactiveStaffList(){
                $("#loaderInactivePopup").show();
                $.ajax({
                    url: BaseURL + "/jpInactiveStaffDashboardGet",
                    type: 'GET',
                    dataType: 'json',
                    timeout: sessionStorage.getItem("timeInetrval"),
                    context: self,
                    error: function (xhr, textStatus, errorThrown) {
                        if(textStatus == 'timeout' || textStatus == 'error'){
                            document.querySelector('#TimeoutSup').open();
                        }
                    },
                    success: function (data) {
                        //self.InactiveStaffDet([]);
                        $("#loaderInactivePopup").hide();
                        var csvContent = '';
                        var headers = ['SL.No', 'Name', 'Email','Country Code','Contact', 'Job Role'];
                        csvContent += headers.join(',') + '\n';
                         for (var i = 0; i < data[0].length; i++) {
                            self.InactiveStaffDet.push({'no': i+1,'id': data[0][i][0],'name' : data[0][i][2] + " " + data[0][i][3], 'email': data[0][i][11],'contact': data[0][i][15] + data[0][i][12], 'role': data[0][i][4]  });
                            var rowData = [i+1, data[0][i][2] + " " +  data[0][i][3],  data[0][i][11],  data[0][i][15], data[0][i][12], data[0][i][4]];
                            csvContent += rowData.join(',') + '\n';
                    }
                    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                    var today = new Date();
                    var fileName = 'Inactive_Staff_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
                    self.blob(blob);
                    self.fileName(fileName);
                }
                })
            }

            self.menuItemPendingSelect = function (event) {
                var target = event.target;
                var itemValue = target.value;
                console.log(itemValue)
                getPendingStaffList();
                let popup = document.getElementById("pendingStaffPopup");
                popup.open();
                self.PendingStaffDet([]);
            }

            self.pendingStaffPopup = function (event) {
                //self.PendingStaffDet([]);
                getPendingStaffList();
                let popup = document.getElementById("pendingStaffPopup");
                popup.open();
            }
        
            self.closePendingStaffPopup = function (event) {
                //self.PendingStaffDet([]);
                let popup = document.getElementById("pendingStaffPopup");
                popup.close();
                location.reload();
            }
            function getPendingStaffList(){
                //self.PendingStaffDet([]);
                $("#loaderPendingPopup").show();
                $.ajax({
                    url: BaseURL + "/jpPendingStaffDashboardGet",
                    type: 'GET',
                    dataType: 'json',
                    timeout: sessionStorage.getItem("timeInetrval"),
                    context: self,
                    error: function (xhr, textStatus, errorThrown) {
                        if(textStatus == 'timeout' || textStatus == 'error'){
                            document.querySelector('#TimeoutSup').open();
                        }
                    },
                    success: function (data) {
                        //self.PendingStaffDet([]);
                        $("#loaderPendingPopup").hide();
                        var csvContent = '';
                        var headers = ['SL.No', 'Name', 'Email','Country Code','Contact', 'Job Role'];
                        csvContent += headers.join(',') + '\n';
                         for (var i = 0; i < data[0].length; i++) {
                            self.PendingStaffDet.push({'no': i+1,'id': data[0][i][0],'name' : data[0][i][2] + " " + data[0][i][3], 'email': data[0][i][11],'contact': data[0][i][15] + data[0][i][12], 'role': data[0][i][4]  });
                            var rowData = [i+1, data[0][i][2] + " " +  data[0][i][3],  data[0][i][11],  data[0][i][15], data[0][i][12], data[0][i][4]];
                            csvContent += rowData.join(',') + '\n';
                    }
                    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                    var today = new Date();
                    var fileName = 'Pending_Staff_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
                    self.blob(blob);
                    self.fileName(fileName);
                }
                })
            }

            self.downloadData = ()=>{
                if(self.blob() != undefined && self.fileName() != undefined){
                    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                        // For Internet Explorer
                        window.navigator.msSaveOrOpenBlob(self.blob(), self.fileName());
                    } else {
                        // For modern browsers
                        var link = document.createElement('a');
                        link.href = window.URL.createObjectURL(self.blob());
                        link.download = self.fileName();
                        link.style.display = 'none';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                }
            }

            self.goToProfile = function (event,data) {
                var clickedStaffId = data.data.id
                console.log(clickedStaffId)
                sessionStorage.setItem("staffId", clickedStaffId);
                self.router.go({path:'staffManagerView'})  
            }; 

            self.menuItemSelect = function (event) {
                self.TotalStaffDet([]);
                var target = event.target;
                var itemValue = target.value;
                console.log(itemValue)
                if(itemValue == 'Last Week'){
                    getLastWeekTotalStaffList();
                    let popup = document.getElementById("totalStaffPopup");
                    popup.open();
                }
                if(itemValue == 'Last Month'){
                    getLastMonthTotalStaffList();
                    let popup = document.getElementById("totalStaffPopup");
                    popup.open();
                }
                if(itemValue == 'Custom'){
                    //getTotalStaffList();
                    let popup = document.getElementById("customStaffPopup");
                    popup.open();
                    //self.CustomTotalStaffDet([]);
                    //refresh()
                }
            }
            function refresh(){
                self.CustomTotalStaffDet([]);
            }

            function getLastWeekTotalStaffList(){
                $("#loaderViewPopup").show();
                $.ajax({
                    url: BaseURL+ "/jpLastWeekTotalStaffGet",
                    type: 'GET',
                    dataType: 'json',
                    timeout: sessionStorage.getItem("timeInetrval"),
                    context: self,
                    error: function (xhr, textStatus, errorThrown) {
                        if(textStatus == 'timeout' || textStatus == 'error'){
                            document.querySelector('#TimeoutSup').open();
                        }
                    },
                    success: function (result) {
                        //self.TotalStaffDet([]);
                        console.log(result)
                        self.totalStaff(result[0][0])
                        self.activeStaff(result[1][0])
                        self.inactiveStaff(result[2][0])
                        self.pendingStaff(result[3][0])
                        var data = JSON.parse(result[4]);
                        //console.log(data)
                        var csvContent = '';
                        var headers = ['SL.No', 'Name', 'Email','Country Code','Contact', 'Job Role', 'Status'];
                        csvContent += headers.join(',') + '\n';
                        $("#loaderViewPopup").hide();
                         for (var i = 0; i < data.length; i++) {
                            if(data[i][17] == "Deactive"){
                                data[i][17] = "Inactive"
                            }
                            self.TotalStaffDet.push({'no': i+1,'id': data[i][0],'name' : data[i][2] + " " + data[i][3], 'email': data[i][11],'contact': data[i][15] + data[i][12],'role': data[i][4],'status': data[i][17]  });
                            var rowData = [i+1, data[i][2] + " " +  data[i][3],  data[i][11],   data[i][15], data[i][12],  data[i][4],  data[i][17]] ;
                            csvContent += rowData.join(',') + '\n';
                    }
                    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                    var today = new Date();
                    var fileName = 'Registered_Users_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
                    self.blob(blob);
                    self.fileName(fileName);
                }
                })
            }

            function getLastMonthTotalStaffList(){
                $("#loaderViewPopup").show();
                $.ajax({
                    url: BaseURL+ "/jpLastMonthTotalStaffGet",
                    type: 'GET',
                    dataType: 'json',
                    timeout: sessionStorage.getItem("timeInetrval"),
                    context: self,
                    error: function (xhr, textStatus, errorThrown) {
                        if(textStatus == 'timeout' || textStatus == 'error'){
                            document.querySelector('#TimeoutSup').open();
                        }
                    },
                    success: function (result) {
                        //self.TotalStaffDet([]);
                        //console.log(result)
                        self.totalStaff(result[0][0])
                        var data = JSON.parse(result[1]);
                        console.log(data)
                        var csvContent = '';
                        var headers = ['SL.No', 'Name', 'Email','Country Code','Contact', 'Job Role', 'Status'];
                        csvContent += headers.join(',') + '\n';
                        $("#loaderViewPopup").hide();
                         for (var i = 0; i < data.length; i++) {
                            if(data[i][17] == "Deactive"){
                                data[i][17] = "Inactive"
                            }
                            self.TotalStaffDet.push({'no': i+1,'id': data[i][0],'name' : data[i][2] + " " + data[i][3], 'email': data[i][11],'contact': data[i][15] + data[i][12],'role': data[i][4],'status': data[i][17]  });
                            var rowData = [i+1, data[i][2] + " " +  data[i][3],  data[i][11],   data[i][15], data[i][12],  data[i][4],  data[i][17]] ;
                            csvContent += rowData.join(',') + '\n';
                    }
                    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                    var today = new Date();
                    var fileName = 'Registered_Users_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
                    self.blob(blob);
                    self.fileName(fileName);
                }
                })
            }
            
            self.TotalStaffDateFilter = function (event,data) {
                self.flag('1');
                console.log(self.CustomTotalStaffDet())
                var validSec = self._checkValidationGroup("dateFilterTotalStaff");
                if (validSec) {
                    $("#customLoaderViewPopup").show();
                $.ajax({
                    url: BaseURL + "/jpTotalStaffDateFilter",
                    type: 'POST',
                    data: JSON.stringify({
                        start_date : self.start_date(),
                        end_date : self.end_date()
                    }),
                    dataType: 'json',
                    timeout: sessionStorage.getItem("timeInetrval"),
                    context: self,
                    error: function (xhr, textStatus, errorThrown) {
                        if(textStatus == 'timeout'){
                            document.querySelector('#loaderViewPopup').close();
                            document.querySelector('#Timeout').open();
                        }
                    },
                    success: function (result) {
                        var data = JSON.parse(result);
                        console.log(data)
                        $("#customLoaderViewPopup").hide();
                        var csvContent = '';
                        var headers = ['SL.No', 'Name', 'Email','Country Code','Contact', 'Job Role', 'Status'];
                        csvContent += headers.join(',') + '\n';
                        $("#customLoaderViewPopup").hide();
                         for (var i = 0; i < data.length; i++) {
                            if(data[i][17] == "Deactive"){
                                data[i][17] = "Inactive"
                            }
                            self.CustomTotalStaffDet.push({'no': i+1,'id': data[i][0],'name' : data[i][2] + " " + data[i][3], 'email': data[i][11],'contact': data[i][15] + data[i][12],'role': data[i][4],'status': data[i][17]  });
                            var rowData = [i+1, data[i][2] + " " +  data[i][3],  data[i][11],   data[i][15], data[i][12],  data[i][4],  data[i][17]] ;
                            csvContent += rowData.join(',') + '\n';
                    }

                    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                    var today = new Date();
                    var fileName = 'Registered_Users_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
                    self.blob(blob);
                    self.fileName(fileName);
                    }
                })  
                }
            }; 

            self.TotalStaffDateFilterClear = function (event,data) {
               //alert(self.flag())
               console.log(self.CustomTotalStaffDet())
               var validSec = self._checkValidationGroup("dateFilterTotalStaff");
               if (validSec) {
                   $("#customLoaderViewPopup").show();
               $.ajax({
                   url: BaseURL + "/jpTotalStaffDateFilter",
                   type: 'POST',
                   data: JSON.stringify({
                       start_date : self.start_date(),
                       end_date : self.end_date()
                   }),
                   dataType: 'json',
                   timeout: sessionStorage.getItem("timeInetrval"),
                   context: self,
                   error: function (xhr, textStatus, errorThrown) {
                       if(textStatus == 'timeout'){
                           document.querySelector('#loaderViewPopup').close();
                           document.querySelector('#Timeout').open();
                       }
                   },
                   success: function (result) {
                       var data = JSON.parse(result);
                       console.log(data)
                       $("#customLoaderViewPopup").hide();
                       var csvContent = '';
                       var headers = ['SL.No', 'Name', 'Email','Country Code','Contact', 'Job Role', 'Status'];
                       csvContent += headers.join(',') + '\n';
                       $("#customLoaderViewPopup").hide();
                       self.CustomTotalStaffDet([])
                        for (var i = 0; i < data.length; i++) {
                           if(data[i][17] == "Deactive"){
                               data[i][17] = "Inactive"
                           }
                           self.CustomTotalStaffDet.push({'no': i+1,'id': data[i][0],'name' : data[i][2] + " " + data[i][3], 'email': data[i][11],'contact': data[i][15] + data[i][12],'role': data[i][4],'status': data[i][17]  });
                           var rowData = [i+1, data[i][2] + " " +  data[i][3],  data[i][11],   data[i][15], data[i][12],  data[i][4],  data[i][17]] ;
                           csvContent += rowData.join(',') + '\n';
                   }

                   var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                   var today = new Date();
                   var fileName = 'Registered_Users_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
                   self.blob(blob);
                   self.fileName(fileName);
                   }
               })  
               }
           }; 

            self._checkValidationGroup = (value) => {
                var tracker = document.getElementById(value);
                if (tracker.valid === "valid") {
                    return true;
                }
                else {

                    tracker.showMessages();
                    tracker.focusOn("@firstInvalidShown");
                    return false;
                }
            };

            //self.dataProvider = new ArrayDataProvider(this.StaffDet, { keyAttributes: "id"});
            self.TotalStaffData = new PagingDataProviderView(new ArrayDataProvider(self.TotalStaffDet, {keyAttributes: 'id'}));   
            self.ActiveStaffData = new PagingDataProviderView(new ArrayDataProvider(self.ActiveStaffDet, {keyAttributes: 'id'}));   
            self.InactiveStaffData = new PagingDataProviderView(new ArrayDataProvider(self.InactiveStaffDet, {keyAttributes: 'id'}));   
            self.PendingStaffData = new PagingDataProviderView(new ArrayDataProvider(self.PendingStaffDet, {keyAttributes: 'id'}));   
            self.CustomTotalStaffData = new PagingDataProviderView(new ArrayDataProvider(self.CustomTotalStaffDet, {keyAttributes: 'id'}));   

        }
    }
    return  dasboardAdminfViewModel;
});