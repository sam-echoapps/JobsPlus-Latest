define(['ojs/ojcore',"knockout","jquery","appController","ojs/ojconverterutils-i18n", "ojs/ojarraydataprovider","ojs/ojpagingdataproviderview",'ojs/ojknockout-keyset', "ojs/ojresponsiveutils", "ojs/ojresponsiveknockoututils", "ojs/ojknockout", "ojs/ojlistitemlayout", "ojs/ojtrain",
        "ojs/ojlistview","ojs/ojradioset","ojs/ojlabelvalue","ojs/ojlabel" ,"ojs/ojselectcombobox","ojs/ojbutton" ,"ojs/ojprogress-bar", "ojs/ojdatetimepicker", 'ojs/ojtable', 'ojs/ojswitch', 'ojs/ojvalidationgroup','ojs/ojselector','ojs/ojtoolbar','ojs/ojfilepicker','ojs/ojcheckboxset', "ojs/ojavatar","ojs/ojactioncard","ojs/ojmenu","ojs/ojformlayout","ojs/ojpagingcontrol","ojs/ojchart"], 
function (oj,ko,$, app, ojconverterutils_i18n_1, ArrayDataProvider, PagingDataProviderView,  ojknockout_keyset_1,ResponsiveUtils, ResponsiveKnockoutUtils, AsyncRegExpValidator) {
    
    class dasboardAdminfViewModel {
        constructor(context) {
            var self = this;
            var BaseURL = sessionStorage.getItem("BaseURL");
            self.totalStaff = ko.observable('');
            self.customStaffCount = ko.observable('0');
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
            self.totalShifts = ko.observable('0');
            self.TotalShiftDet = ko.observableArray([]);
            self.CustomTotalShiftDet = ko.observableArray([]);
            self.totalTimesheet= ko.observable('0');
            self.customTimesheetCount= ko.observable('0');
            self.StaffWork= ko.observable('');
            self.ClientWork= ko.observable('');
            self.blob1 = ko.observable();
            self.fileName1 = ko.observable();
            self.blobCustom = ko.observable();
            self.fileNameCustom = ko.observable();

            self.menuItems = [
                {
                    id: 'this-week',
                    label: 'This Week',
                    icon: 'oj-ux-ico-save'
                },
                {
                    id: 'this-month',
                    label: 'This Month',
                    icon: 'oj-ux-ico-save'
                },
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

            var totalShifts;
            var customShifts;
            self.stackValue = ko.observable();
            self.orientationValue = ko.observable();
            /* chart data */
            var pieSeries;
            
            var pieGroups;
            self.pieSeriesValue = ko.observableArray();
            self.pieGroupsValue = ko.observableArray();

            self.chartFlag = ko.observable('0');
            self.customShiftCount = ko.observable('0');
            self.view = ko.observable('All');
            self.ThisWeekShiftDet = ko.observableArray();
            self.LastWeekShiftDet = ko.observableArray();
            self.LastMonthShiftDet = ko.observableArray();
            self.ThisMonthShiftDet = ko.observableArray();
            this.formatValues = [
                { id: "list", label: "List" },
                { id: "chart", label: "Chart" },
            ]; 
            self.viewOption = ko.observable('list');  
            self.customPieSeriesValue = ko.observableArray();
            var totalTimesheet;

            var timesheetPieSeries;
            
            var timesheetPieGroups;
            self.timesheetPieSeriesValue = ko.observableArray();
            self.timesheetPieGroupsValue = ko.observableArray();
            self.viewTimesheet = ko.observable('All');
            self.ThisWeekTimesheetDet = ko.observableArray();
            self.TotalTimesheetDet = ko.observableArray();
            self.ThisMonthTimesheetDet = ko.observableArray();
            self.LastWeekTimesheetDet = ko.observableArray();
            self.LastMonthTimesheetDet = ko.observableArray();
            self.TimesheetFlag = ko.observable('0');
            self.CustomTotalTimesheetDet = ko.observableArray();
            var timesheetCustomPieSeries;
            var timesheetCustomPieGroups;
            self.timesheetCustomPieSeriesValue = ko.observableArray();
            self.timesheetCustomPieGroupsValue = ko.observableArray();

            var totalInvoice;
            var invoicePieSeries;
            var invoicePieGroups;
            self.invoicePieSeriesValue = ko.observableArray();
            self.invoicePieGroupsValue = ko.observableArray();
            self.totalInvoice= ko.observable('0');
            self.viewInvoice = ko.observable('All');
            self.TotalInvoiceDet = ko.observableArray();
            self.ThisWeekInvoiceDet = ko.observableArray();
            self.ThisMonthInvoiceDet = ko.observableArray();
            self.LastWeekInvoiceDet = ko.observableArray();
            self.LastMonthInvoiceDet = ko.observableArray();
            self.InvoiceFlag = ko.observable('0');
            self.CustomTotalInvoiceDet = ko.observableArray();
            var invoiceCustomPieSeries;
            var invoiceCustomPieGroups;
            self.invoiceCustomPieSeriesValue = ko.observableArray();
            self.invoiceCustomPieGroupsValue = ko.observableArray();
            self.customInvoiceCount= ko.observable('0');

            self.StaffWorkHoursDet = ko.observableArray();
            self.ClientShiftHoursDet = ko.observableArray();

            self.StaffWorkFlag = ko.observable('0');
            self.ClientWorkFlag = ko.observable('0');
            self.StaffReminderDet = ko.observableArray();

            self.connected = function () {
                if (sessionStorage.getItem("userName") == null) {
                    self.router.go({ path: 'signin' });
                }
                else {
                   app.onAppSuccess();
                   self.username(sessionStorage.getItem("userName"));
                   getTotalStaff();
                   getShiftChart();
                   getTimesheetChart();
                   getInvoiceChart(); 
                   getStaffWorkHours();  
                   getClientTotalShiftHours();  
                   getStaffFileReminder();  
                }
            };
            self.context = context;
            self.router = self.context.parentRouter;


            function getTotalStaff() {
                $("#staffView").hide();
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
                        $("#staffView").show();
                        $("#loaderView").hide();
                        console.log(data)
                        self.totalStaff(data[0][0][0])
                        self.activeStaff(data[1][0][0])
                        self.inactiveStaff(data[2][0][0])
                        self.pendingStaff(data[3][0][0])
                }
                })
            }

            function getShiftChart() {
                 $("#chartView").hide();
                // $("#loaderView").show();
                
                /*Chart Properties*/

                $.ajax({
                    url: BaseURL + "/jpDashboardShiftInfoGet",
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
                        $("#chartView").show();
                        $("#loaderView").hide();
                        console.log(data)
                        totalShifts = data[0][0] + data[1][0] + data [2][0] + data [3][0]
                        self.totalShifts(totalShifts)
                        self.stackValue('off');
                        self.orientationValue('vertical');
                        /* chart data */
                        pieSeries = [
                        {name : "Pending", items : [data[0][0], totalShifts], color: "#ffcc00"},
                        {name : "Confirmed", items : [data[1][0], totalShifts], color: "#3366cc"},
                        {name : "Completed", items : [data[2][0], totalShifts],color: "#33cc33"},
                        {name : "Incompleted", items : [data[3][0], totalShifts],color: "#FF0000"},
                        ];
                        
                        pieGroups = ["Average Salary", "Max Salary"];
                        self.pieSeriesValue(pieSeries);
                        self.pieGroupsValue(pieGroups);
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

            self.downloadData1 = ()=>{
                if(self.blob1() != undefined && self.fileName1() != undefined){
                    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                        // For Internet Explorer
                        window.navigator.msSaveOrOpenBlob(self.blob1(), self.fileName1());
                    } else {
                        // For modern browsers
                        var link = document.createElement('a');
                        link.href = window.URL.createObjectURL(self.blob1());
                        link.download = self.fileName1();
                        link.style.display = 'none';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                }
            }

            self.downloadDataCustom = ()=>{
                if(self.blobCustom() != undefined && self.fileNameCustom() != undefined){
                    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                        // For Internet Explorer
                        window.navigator.msSaveOrOpenBlob(self.blobCustom(), self.fileNameCustom());
                    } else {
                        // For modern browsers
                        var link = document.createElement('a');
                        link.href = window.URL.createObjectURL(self.blobCustom());
                        link.download = self.fileNameCustom();
                        link.style.display = 'none';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                }
            }


            self.goToProfilePending = function (event,data) {
                console.log(data.item.data.id)
                var clickedStaffId = data.item.data.id
                console.log(clickedStaffId)
                sessionStorage.setItem("staffId", clickedStaffId);
                self.router.go({path:'staffView'})  
            }; 

            self.goToProfileActive = function (event,data) {
                console.log(data.item.data.id)
                var clickedStaffId = data.item.data.id
                console.log(clickedStaffId)
                sessionStorage.setItem("staffId", clickedStaffId);
                self.router.go({path:'staffManagerView'})  
            }; 

            self.menuItemSelect = function (event) {
                self.TotalStaffDet([]);
                var target = event.target;
                var itemValue = target.value;
                console.log(itemValue)
                if(itemValue == 'This Week'){
                    getThisWeekTotalStaffList();
                    let popup = document.getElementById("totalStaffPopup");
                    popup.open();
                }
                if(itemValue == 'This Month'){
                    getThisMonthTotalStaffList();
                    let popup = document.getElementById("totalStaffPopup");
                    popup.open();
                }
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
                        var data = JSON.parse(result[0]);
                        self.customStaffCount(result[1][0])
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
               if(validSec == false){
                self.CustomTotalStaffDet([])
               }
               if (validSec) {
                self.CustomTotalStaffDet([])
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
                       var data = JSON.parse(result[0]);
                       self.customStaffCount(result[1][0])
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

            function getThisWeekTotalStaffList(){
                $("#loaderViewPopup").show();
                $.ajax({
                    url: BaseURL+ "/jpThisWeekTotalStaffGet",
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
                        var data = JSON.parse(result[1]);
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

            function getThisMonthTotalStaffList(){
                $("#loaderViewPopup").show();
                $.ajax({
                    url: BaseURL+ "/jpThisMonthTotalStaffGet",
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
                        var data = JSON.parse(result[1]);
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

            this.threeDValue = ko.observable("off");
            /* chart data */
           /*  this.dataProvider = new ArrayDataProvider(JSON.parse(data), {
                keyAttributes: "id",
            }); */

            self.chartMenuItemSelect = function (event) {
                var target = event.target;
                var itemValue = target.value;
                console.log(itemValue)
                if(itemValue == 'this-week'){
                    self.view('this-week')
                    getThisWeekShift();
                }
                if(itemValue == 'this-month'){
                    self.view('this-month')
                    getThisMonthShift();
                }
                if(itemValue == 'last-week'){
                    self.view('last-week')
                    getLastWeekShift();
                }
                if(itemValue == 'last-month'){
                    self.view('last-month')
                    getLastMonthShift();
                }
                if(itemValue == 'custom'){
                    self.view('')
                    //getTotalStaffList();
                    let popup = document.getElementById("customShiftPopup");
                    popup.open();
                }
            }

            function getThisWeekShift() {
                //$("#chartView").hide();
               $.ajax({
                   url: BaseURL + "/jpThisWeekDashboardShiftInfoGet",
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
                       $("#chartView").show();
                       $("#loaderView").hide();
                       console.log(data)
                       totalShifts = data[0][0] + data[1][0] + data [2][0] + data [3][0]
                       self.totalShifts(totalShifts)
                       self.stackValue('off');
                       self.orientationValue('vertical');
                       /* chart data */
                       pieSeries = [
                        {name : "Pending", items : [data[0][0], totalShifts], color: "#ffcc00"},
                        {name : "Confirmed", items : [data[1][0], totalShifts], color: "#3366cc"},
                        {name : "Completed", items : [data[2][0], totalShifts],color: "#33cc33"},
                        {name : "Incompleted", items : [data[3][0], totalShifts],color: "#FF0000"},
                       ];
                       
                       pieGroups = ["Average Salary", "Max Salary"];
                       self.pieSeriesValue(pieSeries);
                       self.pieGroupsValue(pieGroups);
                       
                       $("#customLoaderViewPopup").hide();
                    var datas = JSON.parse(data[4]);
                    console.log(data)
                    var csvContent = '';
                    var headers = ['SL.No', 'Client Name', 'Shift Name','Shift Date','Shift Time','Status'];
                    csvContent += headers.join(',') + '\n';
                     for (var i = 0; i < datas.length; i++) {
                        self.ThisWeekShiftDet.push({'no': i+1,'id': datas[i][0],'client_name' : datas[i][1],'shift_name' : datas[i][2],'shift_date' : datas[i][3], 'shift_time': datas[i][4] + " - " + datas[i][5], 'status': datas[i][6]  });
                        var rowData = [i+1, datas[i][1],  datas[i][2],  datas[i][3], datas[i][4] + "-"  + datas[i][5], datas[i][6]];
                        csvContent += rowData.join(',') + '\n';
                }
                var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                var today = new Date();
                var fileName = 'Total_Shifts_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
                self.blob(blob);
                self.fileName(fileName);
               }
               })
           }

           function getThisMonthShift() {
            //$("#chartView").hide();
           $.ajax({
               url: BaseURL + "/jpThisMonthDashboardShiftInfoGet",
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
                   $("#chartView").show();
                   $("#loaderView").hide();
                   console.log(data)
                   totalShifts = data[0][0] + data[1][0] + data [2][0] + data [3][0]
                   self.totalShifts(totalShifts)
                   self.stackValue('off');
                   self.orientationValue('vertical');
                   /* chart data */
                   pieSeries = [
                    {name : "Pending", items : [data[0][0], totalShifts], color: "#ffcc00"},
                    {name : "Confirmed", items : [data[1][0], totalShifts], color: "#3366cc"},
                    {name : "Completed", items : [data[2][0], totalShifts],color: "#33cc33"},
                    {name : "Incompleted", items : [data[3][0], totalShifts],color: "#FF0000"},
                   ];
                   
                   pieGroups = ["Average Salary", "Max Salary"];
                   self.pieSeriesValue(pieSeries);
                   self.pieGroupsValue(pieGroups);

                   $("#customLoaderViewPopup").hide();
                    var datas = JSON.parse(data[4]);
                    console.log(data)
                    var csvContent = '';
                    var headers = ['SL.No', 'Client Name', 'Shift Name','Shift Date','Shift Time','Status'];
                    csvContent += headers.join(',') + '\n';
                     for (var i = 0; i < datas.length; i++) {
                        self.ThisMonthShiftDet.push({'no': i+1,'id': datas[i][0],'client_name' : datas[i][1],'shift_name' : datas[i][2],'shift_date' : datas[i][3], 'shift_time': datas[i][4] + " - " + datas[i][5], 'status': datas[i][6]  });
                        var rowData = [i+1, datas[i][1],  datas[i][2],  datas[i][3], datas[i][4] + "-"  + datas[i][5], datas[i][6]];
                        csvContent += rowData.join(',') + '\n';
                }
                var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                var today = new Date();
                var fileName = 'Total_Shifts_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
                self.blob(blob);
                self.fileName(fileName);
           }
           })
       }

                function getLastWeekShift() {
                    //$("#chartView").hide();
                $.ajax({
                    url: BaseURL + "/jpLastWeekDashboardShiftInfoGet",
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
                        $("#chartView").show();
                        $("#loaderView").hide();
                        console.log(data)
                        totalShifts = data[0][0] + data[1][0] + data [2][0] + data [3][0]
                        self.totalShifts(totalShifts)
                        self.stackValue('off');
                        self.orientationValue('vertical');
                        /* chart data */
                        pieSeries = [
                            {name : "Pending", items : [data[0][0], totalShifts], color: "#ffcc00"},
                            {name : "Confirmed", items : [data[1][0], totalShifts], color: "#3366cc"},
                            {name : "Completed", items : [data[2][0], totalShifts],color: "#33cc33"},
                            {name : "Incompleted", items : [data[3][0], totalShifts],color: "#FF0000"},
                        ];
                        
                        pieGroups = ["Average Salary", "Max Salary"];
                        self.pieSeriesValue(pieSeries);
                        self.pieGroupsValue(pieGroups);

                        $("#customLoaderViewPopup").hide();
                        var datas = JSON.parse(data[4]);
                        console.log(data)
                        var csvContent = '';
                        var headers = ['SL.No', 'Client Name', 'Shift Name','Shift Date','Shift Time','Status'];
                        csvContent += headers.join(',') + '\n';
                         for (var i = 0; i < datas.length; i++) {
                            self.LastWeekShiftDet.push({'no': i+1,'id': datas[i][0],'client_name' : datas[i][1],'shift_name' : datas[i][2],'shift_date' : datas[i][3], 'shift_time': datas[i][4] + " - " + datas[i][5], 'status': datas[i][6]  });
                            var rowData = [i+1, datas[i][1],  datas[i][2],  datas[i][3], datas[i][4] + "-"  + datas[i][5], datas[i][6]];
                            csvContent += rowData.join(',') + '\n';
                    }
                    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                    var today = new Date();
                    var fileName = 'Total_Shifts_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
                    self.blob(blob);
                    self.fileName(fileName);
                }
                })
            }

            function getLastMonthShift() {
                //$("#chartView").hide();
            $.ajax({
                url: BaseURL + "/jpLastMonthDashboardShiftInfoGet",
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
                    $("#chartView").show();
                    $("#loaderView").hide();
                    console.log(data)
                    totalShifts = data[0][0] + data[1][0] + data [2][0] + data [3][0]
                    self.totalShifts(totalShifts)
                    self.stackValue('off');
                    self.orientationValue('vertical');
                    /* chart data */
                    pieSeries = [
                        {name : "Pending", items : [data[0][0], totalShifts], color: "#ffcc00"},
                        {name : "Confirmed", items : [data[1][0], totalShifts], color: "#3366cc"},
                        {name : "Completed", items : [data[2][0], totalShifts],color: "#33cc33"},
                        {name : "Incompleted", items : [data[3][0], totalShifts],color: "#FF0000"},
                    ];
                    
                    pieGroups = ["Average Salary", "Max Salary"];
                    self.pieSeriesValue(pieSeries);
                    self.pieGroupsValue(pieGroups);

                    $("#customLoaderViewPopup").hide();
                    var datas = JSON.parse(data[4]);
                    console.log(data)
                    var csvContent = '';
                    var headers = ['SL.No', 'Client Name', 'Shift Name','Shift Date','Shift Time','Status'];
                    csvContent += headers.join(',') + '\n';
                     for (var i = 0; i < datas.length; i++) {
                        self.LastMonthShiftDet.push({'no': i+1,'id': datas[i][0],'client_name' : datas[i][1],'shift_name' : datas[i][2],'shift_date' : datas[i][3], 'shift_time': datas[i][4] + " - " + datas[i][5], 'status': datas[i][6]  });
                        var rowData = [i+1, datas[i][1],  datas[i][2],  datas[i][3], datas[i][4] + "-"  + datas[i][5], datas[i][6]];
                        csvContent += rowData.join(',') + '\n';
                }
                var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                var today = new Date();
                var fileName = 'Total_Shifts_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
                self.blob(blob);
                self.fileName(fileName);
            }
            })
        }

        self.TotalShiftPopup = function (event) {
            getTotalShiftList();
            let popup = document.getElementById("TotalShiftPopup");
            popup.open();
        }

        function getTotalShiftList(){
            //self.TotalShiftDet([]);
            $("#shiftLoaderViewPopup").show();
            $.ajax({
                url: BaseURL + "/jpDashboardTotalShiftListGet",
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
                    //self.TotalShiftDet([]);
                    $("#shiftLoaderViewPopup").hide();
                    var data = JSON.parse(result[0]);
                    console.log(data)
                    var csvContent = '';
                    var headers = ['SL.No', 'Client Name', 'Shift Name','Shift Date','Shift Time','Status'];
                    csvContent += headers.join(',') + '\n';
                     for (var i = 0; i < data.length; i++) {
                        self.TotalShiftDet.push({'no': i+1,'id': data[i][0],'client_name' : data[i][1],'shift_name' : data[i][2],'shift_date' : data[i][3], 'shift_time': data[i][4] + " - " + data[i][5], 'status': data[i][6]  });
                        var rowData = [i+1, data[i][1],  data[i][2],  data[i][3], data[i][4] + "-"  + data[i][5], data[i][6]];
                        csvContent += rowData.join(',') + '\n';
                }
                var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                var today = new Date();
                var fileName = 'Total_Shifts_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
                self.blob(blob);
                self.fileName(fileName);
            }
            })
        }

        self.TotalShiftDateFilter = function (event,data) {
            self.chartFlag('1');
            var validSec = self._checkValidationGroup("dateFilterTotalShift");
            if (validSec) {
                $("#customLoaderViewPopup").show();
            $.ajax({
                url: BaseURL + "/jpDashboardTotalShiftDateFilter",
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
                    $("#customLoaderViewPopup").hide();
                    var data = JSON.parse(result[0]);
                    console.log(data)
                    self.customShiftCount(result[1][0])
                    var csvContent = '';
                    var headers = ['SL.No', 'Client Name', 'Shift Name','Shift Date','Shift Time','Status'];
                    csvContent += headers.join(',') + '\n';
                     for (var i = 0; i < data.length; i++) {
                        self.CustomTotalShiftDet.push({'no': i+1,'id': data[i][0],'client_name' : data[i][1],'shift_name' : data[i][2],'shift_date' : data[i][3], 'shift_time': data[i][4] + " - " + data[i][5], 'status': data[i][6]  });
                        var rowData = [i+1, data[i][1],  data[i][2],  data[i][3], data[i][4] + "-"  + data[i][5], data[i][6]];
                        csvContent += rowData.join(',') + '\n';
                }
                var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                var today = new Date();
                var fileName = 'Total_Shifts_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
                self.blob(blob);
                self.fileName(fileName);

                $("#chartView").show();
                $("#loaderView").hide();
                customShifts = result[2][0] + result[3][0] + result [4][0] + result [5][0]
                self.totalShifts(customShifts)
                self.stackValue('off');
                self.orientationValue('vertical');
                /* chart data */
                pieSeries = [
                    {name : "Pending", items : [result[2][0], customShifts], color: "#ffcc00"},
                    {name : "Confirmed", items : [result[3][0], customShifts], color: "#3366cc"},
                    {name : "Completed", items : [result[4][0], customShifts],color: "#33cc33"},
                    {name : "Incompleted", items : [result[5][0], customShifts],color: "#FF0000"},
                ];
                
                pieGroups = ["Average Salary", "Max Salary"];
                self.customPieSeriesValue(pieSeries);
                self.pieGroupsValue(pieGroups);
                }
            })  
            }
        }; 

        self.TotalShiftDateFilterClear = function (event,data) {
            console.log(self.CustomTotalShiftDet())
            var validSec = self._checkValidationGroup("dateFilterTotalStaff");
            if(validSec == false){
             self.CustomTotalShiftDet([])
            }
            if (validSec) {
             self.CustomTotalShiftDet([])
             $("#customLoaderViewPopup").show();
            $.ajax({
                url: BaseURL + "/jpDashboardTotalShiftDateFilter",
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
                $("#customLoaderViewPopup").hide();
                var data = JSON.parse(result[0]);
                console.log(data)
                self.customShiftCount(result[1][0])
                var csvContent = '';
                var headers = ['SL.No', 'Client Name', 'Shift Name','Shift Date','Shift Time','Status'];
                csvContent += headers.join(',') + '\n';
                self.CustomTotalShiftDet([])
                 for (var i = 0; i < data.length; i++) {
                    self.CustomTotalShiftDet.push({'no': i+1,'id': data[i][0],'client_name' : data[i][1],'shift_name' : data[i][2],'shift_date' : data[i][3], 'shift_time': data[i][4] + " - " + data[i][5], 'status': data[i][6]  });
                    var rowData = [i+1, data[i][1],  data[i][2],  data[i][3], data[i][4] + "-"  + data[i][5], data[i][6]];
                    csvContent += rowData.join(',') + '\n';
            }
            var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            var today = new Date();
            var fileName = 'Total_Shifts_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
            self.blob(blob);
            self.fileName(fileName);

            $("#chartView").show();
            $("#loaderView").hide();
            customShifts = result[2][0] + result[3][0] + result [4][0] + result [5][0]
            self.totalShifts(customShifts)
            self.stackValue('off');
            self.orientationValue('vertical');
            /* chart data */
            pieSeries = [
                {name : "Pending", items : [result[2][0], customShifts], color: "#ffcc00"},
                {name : "Confirmed", items : [result[3][0], customShifts], color: "#3366cc"},
                {name : "Completed", items : [result[4][0], customShifts],color: "#33cc33"},
                {name : "Incompleted", items : [result[5][0], customShifts],color: "#FF0000"},
            ];
            
            pieGroups = ["Average Salary", "Max Salary"];
            self.customPieSeriesValue(pieSeries);
            self.pieGroupsValue(pieGroups);
                }
            })  
            }
        }; 

        
        self.closeTotalShiftPopup = function (event) {
            self.CustomTotalShiftDet([]);
            let popup = document.getElementById("customShiftPopup");
            popup.close();
            location.reload();
        }

        self.ThisWeekShiftPopup = function (event) {
            let popup = document.getElementById("ThisWeekShiftPopup");
            popup.open();
        }

        self.LastWeekShiftPopup = function (event) {
            let popup = document.getElementById("LastWeekShiftPopup");
            popup.open();
        }

        self.LastMonthShiftPopup = function (event) {
            let popup = document.getElementById("LastMonthShiftPopup");
            popup.open();
        }

        self.ThisMonthShiftPopup = function (event) {
            let popup = document.getElementById("ThisMonthShiftPopup");
            popup.open();
        }

        
        function getTimesheetChart() {
            $("#chartView").hide();
           // $("#loaderView").show();
           
           /*Chart Properties*/

           $.ajax({
               url: BaseURL + "/jpDashboardTimesheetInfoGet",
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
                   $("#chartView").show();
                   $("#loaderView").hide();
                   console.log(data)
                   totalTimesheet = data[0][0] 
                   self.totalTimesheet(totalTimesheet)
                   self.stackValue('off');
                   self.orientationValue('vertical');
                   /* chart data */
                   timesheetPieSeries = [
                   {name : "Pending", items : [data[1][0], totalTimesheet], color: "#ffcc00"},
                   {name : "Submitted", items : [data[2][0], totalTimesheet], color: "#3366cc"},
                   {name : "Approved", items : [data[3][0], totalTimesheet],color: "#33cc33"}
                   ];
                   
                   timesheetPieGroups = ["Average Salary", "Max Salary"];
                   self.timesheetPieSeriesValue(timesheetPieSeries);
                   self.timesheetPieGroupsValue(timesheetPieGroups);
           }
           })
       }

       self.chartTimesheetMenuItemSelect = function (event) {
        var target = event.target;
        var itemValue = target.value;
        console.log(itemValue)
        if(itemValue == 'this-week'){
            self.viewTimesheet('this-week')
            getThisWeekTimesheet();
        }
        if(itemValue == 'this-month'){
            self.viewTimesheet('this-month')
            getThisMonthTimesheet();
        }
        if(itemValue == 'last-week'){
            self.viewTimesheet('last-week')
            getLastWeekTimesheet();
        }
        if(itemValue == 'last-month'){
            self.viewTimesheet('last-month')
            getLastMonthTimesheet();
        }
        if(itemValue == 'custom'){
            self.viewTimesheet('')
            let popup = document.getElementById("customTimesheetPopup");
            popup.open();
        }
    }

    
    self.TotalTimesheetPopup = function (event) {
       getTotalTimesheetList();
        let popup = document.getElementById("TotalTimesheetPopup");
        popup.open();
    }

    function getTotalTimesheetList() {
        //$("#chartView").hide();
       $.ajax({
           url: BaseURL + "/jpDashboardTotalTimesheetListGet",
           type: 'GET',
           dataType: 'json',
           timeout: sessionStorage.getItem("timeInetrval"),
           context: self,
           error: function (xhr, textStatus, errorThrown) {
               if(textStatus == 'timeout' || textStatus == 'error'){
                   document.querySelector('#TimeoutSup').open();
               }
           },
           success: function (resultTotalTimesheet) {
               $("#chartView").show();
               $("#loaderView").hide();

               $("#customLoaderViewPopup").hide();
                var dataTotalTimesheet = JSON.parse(resultTotalTimesheet[0]);
                console.log(dataTotalTimesheet)
                var csvContent = '';
                var headers = ['SL.No', 'Client Name', 'Shift Name','Shift Date','Shift Time','Staff Name','Status'];
                var status;
                csvContent += headers.join(',') + '\n';
                 for (var i = 0; i < dataTotalTimesheet.length; i++) {
                    if(dataTotalTimesheet[i][25] == null){
                        status = 'Pending';
                    }else{
                        status = dataTotalTimesheet[i][25];
                    }
                    if(dataTotalTimesheet[i][21] == null){
                        dataTotalTimesheet[i][21] = 'N/A';
                    }
                    if(dataTotalTimesheet[i][22] == null){
                        dataTotalTimesheet[i][22] = 'N/A';
                    }
                    self.TotalTimesheetDet.push({'no': i+1,'id': dataTotalTimesheet[i][0],'client_name' : dataTotalTimesheet[i][3],'shift_name' : dataTotalTimesheet[i][4],'shift_date' : dataTotalTimesheet[i][5], 'shift_time': dataTotalTimesheet[i][21] + " - " + dataTotalTimesheet[i][22],'staff_name' : dataTotalTimesheet[i][8], 'status': status  });
                    var rowData = [i+1, dataTotalTimesheet[i][3],  dataTotalTimesheet[i][4],  dataTotalTimesheet[i][5], dataTotalTimesheet[i][21] + "-"  + dataTotalTimesheet[i][22], dataTotalTimesheet[i][8], status];
                    csvContent += rowData.join(',') + '\n';
            }
            var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            var today = new Date();
            var fileName = 'Total_Timesheets_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
            self.blob(blob);
            self.fileName(fileName);
       }
       })
   }

   self.ThisWeekTimesheetPopup = function (event) {
    let popup = document.getElementById("ThisWeekTimesheetPopup");
    popup.open();
}

    function getThisWeekTimesheet() {
        //$("#chartView").hide();
       $.ajax({
           url: BaseURL + "/jpThisWeekDashboardTimesheetInfoGet",
           type: 'GET',
           dataType: 'json',
           timeout: sessionStorage.getItem("timeInetrval"),
           context: self,
           error: function (xhr, textStatus, errorThrown) {
               if(textStatus == 'timeout' || textStatus == 'error'){
                   document.querySelector('#TimeoutSup').open();
               }
           },
           success: function (resultThisWeek) {
               $("#chartView").show();
               $("#loaderView").hide();
               console.log(resultThisWeek)
               totalTimesheet = resultThisWeek[0][0] 
               self.totalTimesheet(totalTimesheet)
               self.stackValue('off');
               self.orientationValue('vertical');
               /* chart data */
               timesheetPieSeries = [
                {name : "Pending", items : [resultThisWeek[1][0], totalTimesheet], color: "#ffcc00"},
                {name : "Submitted", items : [resultThisWeek[2][0], totalTimesheet], color: "#3366cc"},
                {name : "Approved", items : [resultThisWeek[3][0], totalTimesheet],color: "#33cc33"}
                ];
                
                timesheetPieGroups = ["Average Salary", "Max Salary"];
                self.timesheetPieSeriesValue(timesheetPieSeries);
                self.timesheetPieGroupsValue(timesheetPieGroups);

               $("#customLoaderViewPopup").hide();
                var dataThisWeek = JSON.parse(resultThisWeek[4]);
                console.log(dataThisWeek)
                var csvContent = '';
                var headers = ['SL.No', 'Client Name', 'Shift Name','Shift Date','Shift Time','Staff Name','Status'];
                var status;
                csvContent += headers.join(',') + '\n';
                 for (var i = 0; i < dataThisWeek.length; i++) {
                    if(dataThisWeek[i][25] == null){
                        status = 'Pending';
                    }else{
                        status = dataThisWeek[i][25];
                    }
                    if(dataThisWeek[i][21] == null){
                        dataThisWeek[i][21] = 'N/A';
                    }
                    if(dataThisWeek[i][22] == null){
                        dataThisWeek[i][22] = 'N/A';
                    }
                    self.ThisWeekTimesheetDet.push({'no': i+1,'id': dataThisWeek[i][0],'client_name' : dataThisWeek[i][3],'shift_name' : dataThisWeek[i][4],'shift_date' : dataThisWeek[i][5], 'shift_time': dataThisWeek[i][21] + " - " + dataThisWeek[i][22],'staff_name' : dataThisWeek[i][8], 'status': status  });
                    var rowData = [i+1, dataThisWeek[i][3],  dataThisWeek[i][4],  dataThisWeek[i][5], dataThisWeek[i][21] + "-"  + dataThisWeek[i][22], dataThisWeek[i][8], status];
                    csvContent += rowData.join(',') + '\n';
            }
            var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            var today = new Date();
            var fileName = 'Total_Timesheets_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
            self.blob(blob);
            self.fileName(fileName);
       }
       })
   }


   self.ThisMonthTimesheetPopup = function (event) {
    let popup = document.getElementById("ThisMonthTimesheetPopup");
    popup.open();
}

    function getThisMonthTimesheet() {
        //$("#chartView").hide();
       $.ajax({
           url: BaseURL + "/jpThisMonthDashboardTimesheetInfoGet",
           type: 'GET',
           dataType: 'json',
           timeout: sessionStorage.getItem("timeInetrval"),
           context: self,
           error: function (xhr, textStatus, errorThrown) {
               if(textStatus == 'timeout' || textStatus == 'error'){
                   document.querySelector('#TimeoutSup').open();
               }
           },
           success: function (resultThisMonth) {
               $("#chartView").show();
               $("#loaderView").hide();
               console.log(resultThisMonth)
               totalTimesheet = resultThisMonth[0][0] 
               self.totalTimesheet(totalTimesheet)
               self.stackValue('off');
               self.orientationValue('vertical');
               /* chart data */
               timesheetPieSeries = [
                {name : "Pending", items : [resultThisMonth[1][0], totalTimesheet], color: "#ffcc00"},
                {name : "Submitted", items : [resultThisMonth[2][0], totalTimesheet], color: "#3366cc"},
                {name : "Approved", items : [resultThisMonth[3][0], totalTimesheet],color: "#33cc33"}
                ];
                
                timesheetPieGroups = ["Average Salary", "Max Salary"];
                self.timesheetPieSeriesValue(timesheetPieSeries);
                self.timesheetPieGroupsValue(timesheetPieGroups);

               $("#customLoaderViewPopup").hide();
                var dataThisMonth = JSON.parse(resultThisMonth[4]);
                console.log(dataThisMonth)
                var csvContent = '';
                var headers = ['SL.No', 'Client Name', 'Shift Name','Shift Date','Shift Time','Staff Name','Status'];
                var status;
                csvContent += headers.join(',') + '\n';
                 for (var i = 0; i < dataThisMonth.length; i++) {
                    if(dataThisMonth[i][25] == null){
                        status = 'Pending';
                    }else{
                        status = dataThisMonth[i][25];
                    }
                    if(dataThisMonth[i][21] == null){
                        dataThisMonth[i][21] = 'N/A';
                    }
                    if(dataThisMonth[i][22] == null){
                        dataThisMonth[i][22] = 'N/A';
                    }
                    self.ThisMonthTimesheetDet.push({'no': i+1,'id': dataThisMonth[i][0],'client_name' : dataThisMonth[i][3],'shift_name' : dataThisMonth[i][4],'shift_date' : dataThisMonth[i][5], 'shift_time': dataThisMonth[i][21] + " - " + dataThisMonth[i][22],'staff_name' : dataThisMonth[i][8], 'status': status  });
                    var rowData = [i+1, dataThisMonth[i][3],  dataThisMonth[i][4],  dataThisMonth[i][5], dataThisMonth[i][21] + "-"  + dataThisMonth[i][22], dataThisMonth[i][8], status];
                    csvContent += rowData.join(',') + '\n';
            }
            var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            var today = new Date();
            var fileName = 'This_Month_Timesheets_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
            self.blob(blob);
            self.fileName(fileName);
       }
       })
   }

   self.LastWeekTimesheetPopup = function (event) {
    let popup = document.getElementById("LastWeekTimesheetPopup");
    popup.open();
}

    function getLastWeekTimesheet() {
        //$("#chartView").hide();
       $.ajax({
           url: BaseURL + "/jpLastWeekDashboardTimesheetInfoGet",
           type: 'GET',
           dataType: 'json',
           timeout: sessionStorage.getItem("timeInetrval"),
           context: self,
           error: function (xhr, textStatus, errorThrown) {
               if(textStatus == 'timeout' || textStatus == 'error'){
                   document.querySelector('#TimeoutSup').open();
               }
           },
           success: function (resultLastWeek) {
               $("#chartView").show();
               $("#loaderView").hide();
               console.log(resultLastWeek)
               totalTimesheet = resultLastWeek[0][0] 
               self.totalTimesheet(totalTimesheet)
               self.stackValue('off');
               self.orientationValue('vertical');
               /* chart data */
               timesheetPieSeries = [
                {name : "Pending", items : [resultLastWeek[1][0], totalTimesheet], color: "#ffcc00"},
                {name : "Submitted", items : [resultLastWeek[2][0], totalTimesheet], color: "#3366cc"},
                {name : "Approved", items : [resultLastWeek[3][0], totalTimesheet],color: "#33cc33"}
                ];
                
                timesheetPieGroups = ["Average Salary", "Max Salary"];
                self.timesheetPieSeriesValue(timesheetPieSeries);
                self.timesheetPieGroupsValue(timesheetPieGroups);

               $("#customLoaderViewPopup").hide();
                var dataLastWeek = JSON.parse(resultLastWeek[4]);
                console.log(dataLastWeek)
                var csvContent = '';
                var headers = ['SL.No', 'Client Name', 'Shift Name','Shift Date','Shift Time','Staff Name','Status'];
                var status;
                csvContent += headers.join(',') + '\n';
                 for (var i = 0; i < dataLastWeek.length; i++) {
                    if(dataLastWeek[i][25] == null){
                        status = 'Pending';
                    }else{
                        status = dataLastWeek[i][25];
                    }
                    if(dataLastWeek[i][21] == null){
                        dataLastWeek[i][21] = 'N/A';
                    }
                    if(dataLastWeek[i][22] == null){
                        dataLastWeek[i][22] = 'N/A';
                    }
                    self.LastWeekTimesheetDet.push({'no': i+1,'id': dataLastWeek[i][0],'client_name' : dataLastWeek[i][3],'shift_name' : dataLastWeek[i][4],'shift_date' : dataLastWeek[i][5], 'shift_time': dataLastWeek[i][21] + " - " + dataLastWeek[i][22],'staff_name' : dataLastWeek[i][8], 'status': status  });
                    var rowData = [i+1, dataLastWeek[i][3],  dataLastWeek[i][4],  dataLastWeek[i][5], dataLastWeek[i][21] + "-"  + dataLastWeek[i][22], dataLastWeek[i][8], status];
                    csvContent += rowData.join(',') + '\n';
            }
            var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            var today = new Date();
            var fileName = 'This_Month_Timesheets_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
            self.blob(blob);
            self.fileName(fileName);
       }
       })
   }

   self.LastMonthTimesheetPopup = function (event) {
    let popup = document.getElementById("LastMonthTimesheetPopup");
    popup.open();
}

    function getLastMonthTimesheet() {
        //$("#chartView").hide();
       $.ajax({
           url: BaseURL + "/jpLastMonthDashboardTimesheetInfoGet",
           type: 'GET',
           dataType: 'json',
           timeout: sessionStorage.getItem("timeInetrval"),
           context: self,
           error: function (xhr, textStatus, errorThrown) {
               if(textStatus == 'timeout' || textStatus == 'error'){
                   document.querySelector('#TimeoutSup').open();
               }
           },
           success: function (resultLastMonth) {
               $("#chartView").show();
               $("#loaderView").hide();
               console.log(resultLastMonth)
               totalTimesheet = resultLastMonth[0][0] 
               self.totalTimesheet(totalTimesheet)
               self.stackValue('off');
               self.orientationValue('vertical');
               /* chart data */
               timesheetPieSeries = [
                {name : "Pending", items : [resultLastMonth[1][0], totalTimesheet], color: "#ffcc00"},
                {name : "Submitted", items : [resultLastMonth[2][0], totalTimesheet], color: "#3366cc"},
                {name : "Approved", items : [resultLastMonth[3][0], totalTimesheet],color: "#33cc33"}
                ];
                
                timesheetPieGroups = ["Average Salary", "Max Salary"];
                self.timesheetPieSeriesValue(timesheetPieSeries);
                self.timesheetPieGroupsValue(timesheetPieGroups);

               $("#customLoaderViewPopup").hide();
                var dataLastMonth = JSON.parse(resultLastMonth[4]);
                console.log(dataLastMonth)
                var csvContent = '';
                var headers = ['SL.No', 'Client Name', 'Shift Name','Shift Date','Shift Time','Staff Name','Status'];
                var status;
                csvContent += headers.join(',') + '\n';
                 for (var i = 0; i < dataLastMonth.length; i++) {
                    if(dataLastMonth[i][25] == null){
                        status = 'Pending';
                    }else{
                        status = dataLastMonth[i][25];
                    }
                    if(dataLastMonth[i][21] == null){
                        dataLastMonth[i][21] = 'N/A';
                    }
                    if(dataLastMonth[i][22] == null){
                        dataLastMonth[i][22] = 'N/A';
                    }
                    self.LastMonthTimesheetDet.push({'no': i+1,'id': dataLastMonth[i][0],'client_name' : dataLastMonth[i][3],'shift_name' : dataLastMonth[i][4],'shift_date' : dataLastMonth[i][5], 'shift_time': dataLastMonth[i][21] + " - " + dataLastMonth[i][22],'staff_name' : dataLastMonth[i][8], 'status': status  });
                    var rowData = [i+1, dataLastMonth[i][3],  dataLastMonth[i][4],  dataLastMonth[i][5], dataLastMonth[i][21] + "-"  + dataLastMonth[i][22], dataLastMonth[i][8], status];
                    csvContent += rowData.join(',') + '\n';
            }
            var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            var today = new Date();
            var fileName = 'This_Month_Timesheets_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
            self.blob(blob);
            self.fileName(fileName);
       }
       })
   }
        self.TotalTimesheetDateFilter = function (event,data) {
            self.TimesheetFlag('1');
            var validSec = self._checkValidationGroup("dateFilterTotalTimesheet");
            if (validSec) {
                $("#customLoaderViewPopup").show();
            $.ajax({
                url: BaseURL + "/jpDashboardTotalTimesheetDateFilter",
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
                success: function (resultCustom) {
                    $("#customLoaderViewPopup").hide();
                var dataCustom = JSON.parse(resultCustom[4]);
                console.log(dataCustom)
                var csvContent = '';
                var headers = ['SL.No', 'Client Name', 'Shift Name','Shift Date','Shift Time','Staff Name','Status'];
                var status;
                csvContent += headers.join(',') + '\n';
                 for (var i = 0; i < dataCustom.length; i++) {
                    if(dataCustom[i][25] == null){
                        status = 'Pending';
                    }else{
                        status = dataCustom[i][25];
                    }
                    if(dataCustom[i][21] == null){
                        dataCustom[i][21] = 'N/A';
                    }
                    if(dataCustom[i][22] == null){
                        dataCustom[i][22] = 'N/A';
                    }
                    self.CustomTotalTimesheetDet.push({'no': i+1,'id': dataCustom[i][0],'client_name' : dataCustom[i][3],'shift_name' : dataCustom[i][4],'shift_date' : dataCustom[i][5], 'shift_time': dataCustom[i][21] + " - " + dataCustom[i][22],'staff_name' : dataCustom[i][8], 'status': status  });
                    var rowData = [i+1, dataCustom[i][3],  dataCustom[i][4],  dataCustom[i][5], dataCustom[i][21] + "-"  + dataCustom[i][22], dataCustom[i][8], status];
                    csvContent += rowData.join(',') + '\n';
            }
            var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            var today = new Date();
            var fileName = 'Total_Timesheets_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
            self.blob(blob);
            self.fileName(fileName);

            $("#chartView").show();
            $("#loaderView").hide();
            console.log(resultCustom)
            totalTimesheet = resultCustom[0][0] 
            self.customTimesheetCount(totalTimesheet)
            self.stackValue('off');
            self.orientationValue('vertical');
            /* chart data */
            timesheetCustomPieSeries = [
             {name : "Pending", items : [resultCustom[1][0], totalTimesheet], color: "#ffcc00"},
             {name : "Submitted", items : [resultCustom[2][0], totalTimesheet], color: "#3366cc"},
             {name : "Approved", items : [resultCustom[3][0], totalTimesheet],color: "#33cc33"}
             ];
             
             timesheetCustomPieGroups = ["Average Salary", "Max Salary"];
             self.timesheetCustomPieSeriesValue(timesheetCustomPieSeries);
             self.timesheetCustomPieGroupsValue(timesheetCustomPieGroups);
                }
            })  
            }
        }; 
       
        self.TotalTimesheetDateFilterClear = function (event,data) {
            console.log(self.CustomTotalTimesheetDet())
            var validSec = self._checkValidationGroup("dateFilterTotalStaff");
            if(validSec == false){
             self.CustomTotalTimesheetDet([])
            }
            if (validSec) {
             self.CustomTotalTimesheetDet([])
             $("#customLoaderViewPopup").show();
            $.ajax({
                url: BaseURL + "/jpDashboardTotalTimesheetDateFilter",
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
                success: function (resultCustom) {
                    $("#customLoaderViewPopup").hide();
                    var dataCustom = JSON.parse(resultCustom[4]);
                    console.log(dataCustom)
                    var csvContent = '';
                    var headers = ['SL.No', 'Client Name', 'Shift Name','Shift Date','Shift Time','Staff Name','Status'];
                    var status;
                    self.CustomTotalTimesheetDet([])
                    csvContent += headers.join(',') + '\n';
                     for (var i = 0; i < dataCustom.length; i++) {
                        if(dataCustom[i][25] == null){
                            status = 'Pending';
                        }else{
                            status = dataCustom[i][25];
                        }
                        if(dataCustom[i][21] == null){
                            dataCustom[i][21] = 'N/A';
                        }
                        if(dataCustom[i][22] == null){
                            dataCustom[i][22] = 'N/A';
                        }
                        self.CustomTotalTimesheetDet.push({'no': i+1,'id': dataCustom[i][0],'client_name' : dataCustom[i][3],'shift_name' : dataCustom[i][4],'shift_date' : dataCustom[i][5], 'shift_time': dataCustom[i][21] + " - " + dataCustom[i][22],'staff_name' : dataCustom[i][8], 'status': status  });
                        var rowData = [i+1, dataCustom[i][3],  dataCustom[i][4],  dataCustom[i][5], dataCustom[i][21] + "-"  + dataCustom[i][22], dataCustom[i][8], status];
                        csvContent += rowData.join(',') + '\n';
                }
                var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                var today = new Date();
                var fileName = 'Total_Timesheets_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
                self.blob(blob);
                self.fileName(fileName);
    
                $("#chartView").show();
                $("#loaderView").hide();
                console.log(resultCustom)
                totalTimesheet = resultCustom[0][0] 
                self.customTimesheetCount(totalTimesheet)
                self.stackValue('off');
                self.orientationValue('vertical');
                /* chart data */
                timesheetCustomPieSeries = [
                 {name : "Pending", items : [resultCustom[1][0], totalTimesheet], color: "#ffcc00"},
                 {name : "Submitted", items : [resultCustom[2][0], totalTimesheet], color: "#3366cc"},
                 {name : "Approved", items : [resultCustom[3][0], totalTimesheet],color: "#33cc33"}
                 ];
                 
                 timesheetCustomPieGroups = ["Average Salary", "Max Salary"];
                 self.timesheetCustomPieSeriesValue(timesheetCustomPieSeries);
                 self.timesheetCustomPieGroupsValue(timesheetCustomPieGroups);
                    }
            })  
            }
        }; 


        self.chartInvoiceMenuItemSelect = function (event) {
            var target = event.target;
            var itemValue = target.value;
            console.log(itemValue)
            if(itemValue == 'this-week'){
                self.viewInvoice('this-week')
                getThisWeekInvoice();
            }
            if(itemValue == 'this-month'){
                self.viewInvoice('this-month')
                getThisMonthInvoice();
            }
            if(itemValue == 'last-week'){
                self.viewInvoice('last-week')
                getLastWeekInvoice();
            }
            if(itemValue == 'last-month'){
                self.viewInvoice('last-month')
                getLastMonthInvoice();
            }
            if(itemValue == 'custom'){
                self.viewInvoice('')
                let popup = document.getElementById("customInvoicePopup");
                popup.open();
            }
        }
    

        function getInvoiceChart() {
            $("#chartView").hide();
           // $("#loaderView").show();
           
           /*Chart Properties*/

           $.ajax({
               url: BaseURL + "/jpDashboardInvoiceInfoGet",
               type: 'GET',
               dataType: 'json',
               timeout: sessionStorage.getItem("timeInetrval"),
               context: self,
               error: function (xhr, textStatus, errorThrown) {
                   if(textStatus == 'timeout' || textStatus == 'error'){
                       document.querySelector('#TimeoutSup').open();
                   }
               },
               success: function (dataInvoice) {
                   $("#chartView").show();
                   $("#loaderView").hide();
                   console.log(dataInvoice)
                   //totalInvoice = dataInvoice[0][0] 
                   totalInvoice = dataInvoice[1][0] + dataInvoice[2][0] + dataInvoice[3][0]; 
                   self.totalInvoice(totalInvoice)
                   self.stackValue('off');
                   self.orientationValue('vertical');
                   /* chart data */
                   invoicePieSeries = [
                   {name : "Unpublished", items : [dataInvoice[1][0], totalInvoice], color: "#ffcc00"},
                   {name : "Published", items : [dataInvoice[2][0], totalInvoice], color: "#3366cc"},
                   {name : "Paid", items : [dataInvoice[3][0], totalInvoice],color: "#33cc33"}
                   ];
                   
                   invoicePieGroups = ["Average Salary", "Max Salary"];
                   self.invoicePieSeriesValue(invoicePieSeries);
                   self.invoicePieGroupsValue(invoicePieGroups);
           }
           })
       }

            self.TotalInvoicePopup = function (event) {
                getTotalInvoiceList();
                let popup = document.getElementById("TotalInvoicePopup");
                popup.open();
            }
        
            function getTotalInvoiceList() {
                //$("#chartView").hide();
                $.ajax({
                    url: BaseURL + "/jpDashboardTotalInvoiceListGet",
                    type: 'GET',
                    dataType: 'json',
                    timeout: sessionStorage.getItem("timeInetrval"),
                    context: self,
                    error: function (xhr, textStatus, errorThrown) {
                        if(textStatus == 'timeout' || textStatus == 'error'){
                            document.querySelector('#TimeoutSup').open();
                        }
                    },
                    success: function (resultTotalInvoice) {
                        $("#chartView").show();
                        $("#loaderView").hide();
        
                        $("#customLoaderViewPopup").hide();
                        var dataTotalInvoice = JSON.parse(resultTotalInvoice[0]);
                        console.log(dataTotalInvoice)
                        var csvContent = '';
                        var headers = ['SL.No', 'Client Name', 'Timesheet Date','Invoice Date','Due date','Grand Total','Status'];
                        var status;
                        csvContent += headers.join(',') + '\n';
                        for (var i = 0; i < dataTotalInvoice.length; i++) {
                            self.TotalInvoiceDet.push({'no': i+1,'id': dataTotalInvoice[i][0],'client_name' : dataTotalInvoice[i][1],'timesheet_date' : dataTotalInvoice[i][2] + " - " + dataTotalInvoice[i][3],'invoice_date' : dataTotalInvoice[i][4],'due_date' : dataTotalInvoice[i][5], 'grand_total' : dataTotalInvoice[i][6], 'status': dataTotalInvoice[i][7]  });
                            var rowData = [i+1, dataTotalInvoice[i][1], dataTotalInvoice[i][2] + "-"  + dataTotalInvoice[i][3], dataTotalInvoice[i][4], dataTotalInvoice[i][5], dataTotalInvoice[i][6], dataTotalInvoice[i][7]];
                            csvContent += rowData.join(',') + '\n';
                    }
                    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                    var today = new Date();
                    var fileName = 'Total_Invoice_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
                    self.blob(blob);
                    self.fileName(fileName);
                }
                })
            }

            self.ThisWeekInvoicePopup = function (event) {
                let popup = document.getElementById("ThisWeekInvoicePopup");
                popup.open();
            }
            
                function getThisWeekInvoice() {
                    //$("#chartView").hide();
                   $.ajax({
                       url: BaseURL + "/jpThisWeekDashboardInvoiceInfoGet",
                       type: 'GET',
                       dataType: 'json',
                       timeout: sessionStorage.getItem("timeInetrval"),
                       context: self,
                       error: function (xhr, textStatus, errorThrown) {
                           if(textStatus == 'timeout' || textStatus == 'error'){
                               document.querySelector('#TimeoutSup').open();
                           }
                       },
                       success: function (resultThisWeek) {
                        $("#chartView").show();
                        $("#loaderView").hide();
                        console.log(resultThisWeek)
                        //totalInvoice = dataInvoice[0][0] 
                        totalInvoice = resultThisWeek[1][0] + resultThisWeek[2][0] + resultThisWeek[3][0]; 
                        self.totalInvoice(totalInvoice)
                        self.stackValue('off');
                        self.orientationValue('vertical');
                        /* chart data */
                        invoicePieSeries = [
                        {name : "Unpublished", items : [resultThisWeek[1][0], totalInvoice], color: "#ffcc00"},
                        {name : "Published", items : [resultThisWeek[2][0], totalInvoice], color: "#3366cc"},
                        {name : "Paid", items : [resultThisWeek[3][0], totalInvoice],color: "#33cc33"}
                        ];
                        
                        invoicePieGroups = ["Average Salary", "Max Salary"];
                        self.invoicePieSeriesValue(invoicePieSeries);
                        self.invoicePieGroupsValue(invoicePieGroups);
            
                        $("#customLoaderViewPopup").hide();
                        var dataThisWeekInvoice = JSON.parse(resultThisWeek[4]);
                        console.log(dataThisWeekInvoice)
                        var csvContent = '';
                        var headers = ['SL.No', 'Client Name', 'Timesheet Date','Invoice Date','Due date','Grand Total','Status'];
                        var status;
                        csvContent += headers.join(',') + '\n';
                        for (var i = 0; i < dataThisWeekInvoice.length; i++) {
                            self.ThisWeekInvoiceDet.push({'no': i+1,'id': dataThisWeekInvoice[i][0],'client_name' : dataThisWeekInvoice[i][1],'timesheet_date' : dataThisWeekInvoice[i][2] + " - " + dataThisWeekInvoice[i][3],'invoice_date' : dataThisWeekInvoice[i][4],'due_date' : dataThisWeekInvoice[i][5], 'grand_total' : dataThisWeekInvoice[i][6], 'status': dataThisWeekInvoice[i][7]  });
                            var rowData = [i+1, dataThisWeekInvoice[i][1], dataThisWeekInvoice[i][2] + "-"  + dataThisWeekInvoice[i][3], dataThisWeekInvoice[i][4], dataThisWeekInvoice[i][5], dataThisWeekInvoice[i][6], dataThisWeekInvoice[i][7]];
                            csvContent += rowData.join(',') + '\n';
                    }
                    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                    var today = new Date();
                    var fileName = 'This_Week_Invoice_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
                    self.blob(blob);
                    self.fileName(fileName);
                   }
                   })
               }

               self.ThisMonthInvoicePopup = function (event) {
                let popup = document.getElementById("ThisMonthInvoicePopup");
                popup.open();
            }
            
                function getThisMonthInvoice() {
                    //$("#chartView").hide();
                   $.ajax({
                       url: BaseURL + "/jpThisMonthDashboardInvoiceInfoGet",
                       type: 'GET',
                       dataType: 'json',
                       timeout: sessionStorage.getItem("timeInetrval"),
                       context: self,
                       error: function (xhr, textStatus, errorThrown) {
                           if(textStatus == 'timeout' || textStatus == 'error'){
                               document.querySelector('#TimeoutSup').open();
                           }
                       },
                       success: function (resultThisMonth) {
                        $("#chartView").show();
                        $("#loaderView").hide();
                        console.log(resultThisMonth)
                        //totalInvoice = dataInvoice[0][0] 
                        totalInvoice = resultThisMonth[1][0] + resultThisMonth[2][0] + resultThisMonth[3][0]; 
                        self.totalInvoice(totalInvoice)
                        self.stackValue('off');
                        self.orientationValue('vertical');
                        /* chart data */
                        invoicePieSeries = [
                        {name : "Unpublished", items : [resultThisMonth[1][0], totalInvoice], color: "#ffcc00"},
                        {name : "Published", items : [resultThisMonth[2][0], totalInvoice], color: "#3366cc"},
                        {name : "Paid", items : [resultThisMonth[3][0], totalInvoice],color: "#33cc33"}
                        ];
                        
                        invoicePieGroups = ["Average Salary", "Max Salary"];
                        self.invoicePieSeriesValue(invoicePieSeries);
                        self.invoicePieGroupsValue(invoicePieGroups);
            
                        $("#customLoaderViewPopup").hide();
                        var dataThisMonthInvoice = JSON.parse(resultThisMonth[4]);
                        console.log(dataThisMonthInvoice)
                        var csvContent = '';
                        var headers = ['SL.No', 'Client Name', 'Timesheet Date','Invoice Date','Due date','Grand Total','Status'];
                        var status;
                        csvContent += headers.join(',') + '\n';
                        for (var i = 0; i < dataThisMonthInvoice.length; i++) {
                            self.ThisMonthInvoiceDet.push({'no': i+1,'id': dataThisMonthInvoice[i][0],'client_name' : dataThisMonthInvoice[i][1],'timesheet_date' : dataThisMonthInvoice[i][2] + " - " + dataThisMonthInvoice[i][3],'invoice_date' : dataThisMonthInvoice[i][4],'due_date' : dataThisMonthInvoice[i][5], 'grand_total' : dataThisMonthInvoice[i][6], 'status': dataThisMonthInvoice[i][7]  });
                            var rowData = [i+1, dataThisMonthInvoice[i][1], dataThisMonthInvoice[i][2] + "-"  + dataThisMonthInvoice[i][3], dataThisMonthInvoice[i][4], dataThisMonthInvoice[i][5], dataThisMonthInvoice[i][6], dataThisMonthInvoice[i][7]];
                            csvContent += rowData.join(',') + '\n';
                    }
                    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                    var today = new Date();
                    var fileName = 'This_Month_Invoice_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
                    self.blob(blob);
                    self.fileName(fileName);
                   }
                   })
               }

               self.LastWeekInvoicePopup = function (event) {
                let popup = document.getElementById("LastWeekInvoicePopup");
                popup.open();
            }
            
                function getLastWeekInvoice() {
                    //$("#chartView").hide();
                   $.ajax({
                       url: BaseURL + "/jpLastWeekDashboardInvoiceInfoGet",
                       type: 'GET',
                       dataType: 'json',
                       timeout: sessionStorage.getItem("timeInetrval"),
                       context: self,
                       error: function (xhr, textStatus, errorThrown) {
                           if(textStatus == 'timeout' || textStatus == 'error'){
                               document.querySelector('#TimeoutSup').open();
                           }
                       },
                       success: function (resultLastWeek) {
                        $("#chartView").show();
                        $("#loaderView").hide();
                        console.log(resultLastWeek)
                        //totalInvoice = dataInvoice[0][0] 
                        totalInvoice = resultLastWeek[1][0] + resultLastWeek[2][0] + resultLastWeek[3][0]; 
                        self.totalInvoice(totalInvoice)
                        self.stackValue('off');
                        self.orientationValue('vertical');
                        /* chart data */
                        invoicePieSeries = [
                        {name : "Unpublished", items : [resultLastWeek[1][0], totalInvoice], color: "#ffcc00"},
                        {name : "Published", items : [resultLastWeek[2][0], totalInvoice], color: "#3366cc"},
                        {name : "Paid", items : [resultLastWeek[3][0], totalInvoice],color: "#33cc33"}
                        ];
                        
                        invoicePieGroups = ["Average Salary", "Max Salary"];
                        self.invoicePieSeriesValue(invoicePieSeries);
                        self.invoicePieGroupsValue(invoicePieGroups);
            
                        $("#customLoaderViewPopup").hide();
                        var dataLastWeekInvoice = JSON.parse(resultLastWeek[4]);
                        console.log(dataLastWeekInvoice)
                        var csvContent = '';
                        var headers = ['SL.No', 'Client Name', 'Timesheet Date','Invoice Date','Due date','Grand Total','Status'];
                        var status;
                        csvContent += headers.join(',') + '\n';
                        for (var i = 0; i < dataLastWeekInvoice.length; i++) {
                            self.LastWeekInvoiceDet.push({'no': i+1,'id': dataLastWeekInvoice[i][0],'client_name' : dataLastWeekInvoice[i][1],'timesheet_date' : dataLastWeekInvoice[i][2] + " - " + dataLastWeekInvoice[i][3],'invoice_date' : dataLastWeekInvoice[i][4],'due_date' : dataLastWeekInvoice[i][5], 'grand_total' : dataLastWeekInvoice[i][6], 'status': dataLastWeekInvoice[i][7]  });
                            var rowData = [i+1, dataLastWeekInvoice[i][1], dataLastWeekInvoice[i][2] + "-"  + dataLastWeekInvoice[i][3], dataLastWeekInvoice[i][4], dataLastWeekInvoice[i][5], dataLastWeekInvoice[i][6], dataLastWeekInvoice[i][7]];
                            csvContent += rowData.join(',') + '\n';
                    }
                    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                    var today = new Date();
                    var fileName = 'Last_Week_Invoice_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
                    self.blob(blob);
                    self.fileName(fileName);
                   }
                   })
               }


               self.LastMonthInvoicePopup = function (event) {
                let popup = document.getElementById("LastMonthInvoicePopup");
                popup.open();
            }
            
                function getLastMonthInvoice() {
                    //$("#chartView").hide();
                   $.ajax({
                       url: BaseURL + "/jpLastMonthDashboardInvoiceInfoGet",
                       type: 'GET',
                       dataType: 'json',
                       timeout: sessionStorage.getItem("timeInetrval"),
                       context: self,
                       error: function (xhr, textStatus, errorThrown) {
                           if(textStatus == 'timeout' || textStatus == 'error'){
                               document.querySelector('#TimeoutSup').open();
                           }
                       },
                       success: function (resultLastMonth) {
                        $("#chartView").show();
                        $("#loaderView").hide();
                        console.log(resultLastMonth)
                        //totalInvoice = dataInvoice[0][0] 
                        totalInvoice = resultLastMonth[1][0] + resultLastMonth[2][0] + resultLastMonth[3][0]; 
                        self.totalInvoice(totalInvoice)
                        self.stackValue('off');
                        self.orientationValue('vertical');
                        /* chart data */
                        invoicePieSeries = [
                        {name : "Unpublished", items : [resultLastMonth[1][0], totalInvoice], color: "#ffcc00"},
                        {name : "Published", items : [resultLastMonth[2][0], totalInvoice], color: "#3366cc"},
                        {name : "Paid", items : [resultLastMonth[3][0], totalInvoice],color: "#33cc33"}
                        ];
                        
                        invoicePieGroups = ["Average Salary", "Max Salary"];
                        self.invoicePieSeriesValue(invoicePieSeries);
                        self.invoicePieGroupsValue(invoicePieGroups);
            
                        $("#customLoaderViewPopup").hide();
                        var dataLastMonthInvoice = JSON.parse(resultLastMonth[4]);
                        console.log(dataLastWeekInvoice)
                        var csvContent = '';
                        var headers = ['SL.No', 'Client Name', 'Timesheet Date','Invoice Date','Due date','Grand Total','Status'];
                        var status;
                        csvContent += headers.join(',') + '\n';
                        for (var i = 0; i < dataLastMonthInvoice.length; i++) {
                            self.LastMonthInvoiceDet.push({'no': i+1,'id': dataLastMonthInvoice[i][0],'client_name' : dataLastMonthInvoice[i][1],'timesheet_date' : dataLastMonthInvoice[i][2] + " - " + dataLastMonthInvoice[i][3],'invoice_date' : dataLastMonthInvoice[i][4],'due_date' : dataLastMonthInvoice[i][5], 'grand_total' : dataLastMonthInvoice[i][6], 'status': dataLastMonthInvoice[i][7]  });
                            var rowData = [i+1, dataLastMonthInvoice[i][1], dataLastMonthInvoice[i][2] + "-"  + dataLastMonthInvoice[i][3], dataLastMonthInvoice[i][4], dataLastMonthInvoice[i][5], dataLastMonthInvoice[i][6], dataLastMonthInvoice[i][7]];
                            csvContent += rowData.join(',') + '\n';
                    }
                    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                    var today = new Date();
                    var fileName = 'Last_Month_Invoice_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
                    self.blob(blob);
                    self.fileName(fileName);
                   }
                   })
               }

               self.TotalInvoiceDateFilter = function (event,data) {
                self.InvoiceFlag('1');
                var validSec = self._checkValidationGroup("dateFilterTotalInvoice");
                if (validSec) {
                    $("#customLoaderViewPopup").show();
                $.ajax({
                    url: BaseURL + "/jpDashboardTotalInvoiceDateFilter",
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
                    success: function (resultCustom) {
                        $("#chartView").show();
                        $("#loaderView").hide();
                        console.log(resultCustom)
                        //totalInvoice = dataInvoice[0][0] 
                        totalInvoice = resultCustom[1][0] + resultCustom[2][0] + resultCustom[3][0]; 
                        self.customInvoiceCount(totalInvoice)
                        self.stackValue('off');
                        self.orientationValue('vertical');
                        /* chart data */
                        invoiceCustomPieSeries = [
                        {name : "Unpublished", items : [resultCustom[1][0], totalInvoice], color: "#ffcc00"},
                        {name : "Published", items : [resultCustom[2][0], totalInvoice], color: "#3366cc"},
                        {name : "Paid", items : [resultCustom[3][0], totalInvoice],color: "#33cc33"}
                        ];
                        
                        invoiceCustomPieGroups = ["Average Salary", "Max Salary"];
                        self.invoiceCustomPieSeriesValue(invoiceCustomPieSeries);
                        self.invoiceCustomPieGroupsValue(invoiceCustomPieGroups);
            
                        $("#customLoaderViewPopup").hide();
                        var dataCustomInvoice = JSON.parse(resultCustom[4]);
                        console.log(dataCustomInvoice)
                        var csvContent = '';
                        var headers = ['SL.No', 'Client Name', 'Timesheet Date','Invoice Date','Due date','Grand Total','Status'];
                        var status;
                        csvContent += headers.join(',') + '\n';
                        for (var i = 0; i < dataCustomInvoice.length; i++) {
                            self.CustomTotalInvoiceDet.push({'no': i+1,'id': dataCustomInvoice[i][0],'client_name' : dataCustomInvoice[i][1],'timesheet_date' : dataCustomInvoice[i][2] + " - " + dataCustomInvoice[i][3],'invoice_date' : dataCustomInvoice[i][4],'due_date' : dataCustomInvoice[i][5], 'grand_total' : dataCustomInvoice[i][6], 'status': dataCustomInvoice[i][7]  });
                            var rowData = [i+1, dataCustomInvoice[i][1], dataCustomInvoice[i][2] + "-"  + dataCustomInvoice[i][3], dataCustomInvoice[i][4], dataCustomInvoice[i][5], dataCustomInvoice[i][6], dataCustomInvoice[i][7]];
                            csvContent += rowData.join(',') + '\n';
                    }
                    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                    var today = new Date();
                    var fileName = 'Total_Invoice_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
                    self.blob(blob);
                    self.fileName(fileName);
                    }
                })  
                }
            }; 
           
            self.TotalInvoiceDateFilterClear = function (event,data) {
                console.log(self.CustomTotalInvoiceDet())
                var validSec = self._checkValidationGroup("dateFilterTotalStaff");
                if(validSec == false){
                 self.CustomTotalInvoiceDet([])
                }
                if (validSec) {
                 self.CustomTotalInvoiceDet([])
                 $("#customLoaderViewPopup").show();
                $.ajax({
                    url: BaseURL + "/jpDashboardTotalInvoiceDateFilter",
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
                    success: function (resultCustom) {
                        $("#chartView").show();
                        $("#loaderView").hide();
                        console.log(resultCustom)
                        //totalInvoice = dataInvoice[0][0] 
                        totalInvoice = resultCustom[1][0] + resultCustom[2][0] + resultCustom[3][0]; 
                        self.customInvoiceCount(totalInvoice)
                        self.stackValue('off');
                        self.orientationValue('vertical');
                        /* chart data */
                        invoiceCustomPieSeries = [
                        {name : "Unpublished", items : [resultCustom[1][0], totalInvoice], color: "#ffcc00"},
                        {name : "Published", items : [resultCustom[2][0], totalInvoice], color: "#3366cc"},
                        {name : "Paid", items : [resultCustom[3][0], totalInvoice],color: "#33cc33"}
                        ];
                        
                        invoiceCustomPieGroups = ["Average Salary", "Max Salary"];
                        self.invoiceCustomPieSeriesValue(invoiceCustomPieSeries);
                        self.invoiceCustomPieGroupsValue(invoiceCustomPieGroups);
            
                        $("#customLoaderViewPopup").hide();
                        var dataCustomInvoice = JSON.parse(resultCustom[4]);
                        console.log(dataCustomInvoice)
                        var csvContent = '';
                        var headers = ['SL.No', 'Client Name', 'Timesheet Date','Invoice Date','Due date','Grand Total','Status'];
                        var status;
                        self.CustomTotalInvoiceDet([])
                        csvContent += headers.join(',') + '\n';
                        for (var i = 0; i < dataCustomInvoice.length; i++) {
                            self.CustomTotalInvoiceDet.push({'no': i+1,'id': dataCustomInvoice[i][0],'client_name' : dataCustomInvoice[i][1],'timesheet_date' : dataCustomInvoice[i][2] + " - " + dataCustomInvoice[i][3],'invoice_date' : dataCustomInvoice[i][4],'due_date' : dataCustomInvoice[i][5], 'grand_total' : dataCustomInvoice[i][6], 'status': dataCustomInvoice[i][7]  });
                            var rowData = [i+1, dataCustomInvoice[i][1], dataCustomInvoice[i][2] + "-"  + dataCustomInvoice[i][3], dataCustomInvoice[i][4], dataCustomInvoice[i][5], dataCustomInvoice[i][6], dataCustomInvoice[i][7]];
                            csvContent += rowData.join(',') + '\n';
                    }
                    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                    var today = new Date();
                    var fileName = 'Total_Invoice_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
                    self.blob(blob);
                    self.fileName(fileName);
                    }
                })  
                }
            }; 
    
            function getStaffWorkHours() {
                $("#workView").hide();
               // $("#loaderView").show();
               
               /*Chart Properties*/
    
               $.ajax({
                   url: BaseURL + "/jpDashboardTotalStaffWorkHoursGet",
                   type: 'GET',
                   dataType: 'json',
                   timeout: sessionStorage.getItem("timeInetrval"),
                   context: self,
                   error: function (xhr, textStatus, errorThrown) {
                       if(textStatus == 'timeout' || textStatus == 'error'){
                           document.querySelector('#TimeoutSup').open();
                       }
                   },
                   success: function (dataStaffWork) {
                       $("#workView").show();
                       $("#loaderView").hide();
                       console.log(dataStaffWork)
                       $("#customLoaderViewPopup").hide();
                        var dataStaffHours = JSON.parse(dataStaffWork[0]);
                        console.log(dataStaffHours)
                        var csvContent = '';
                        var headers = ['SL.No', 'Staff Name', 'Job Role','Total hours'];
                        csvContent += headers.join(',') + '\n';
                        for (var i = 0; i < dataStaffHours.length; i++) {
                            self.StaffWorkHoursDet.push({'no': i+1, 'staff_name': dataStaffHours[i][0] + " " + dataStaffHours[i][1], 'job_role': dataStaffHours[i][2], 'total_hours': dataStaffHours[i][3]  });
                            var rowData = [i+1, dataStaffHours[i][0] + " " + dataStaffHours[i][1], dataStaffHours[i][2], dataStaffHours[i][3]];
                            csvContent += rowData.join(',') + '\n';
                    }
                    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                    var today = new Date();
                    var fileName = 'Staff_Work_Total_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
                    self.blob(blob);
                    self.fileName(fileName);
               }
               })
           }

           function getClientTotalShiftHours() {
            $("#workView").hide();
           // $("#loaderView").show();
           
           /*Chart Properties*/

           $.ajax({
               url: BaseURL + "/jpDashboardClientTotalShiftHoursGet",
               type: 'GET',
               dataType: 'json',
               timeout: sessionStorage.getItem("timeInetrval"),
               context: self,
               error: function (xhr, textStatus, errorThrown) {
                   if(textStatus == 'timeout' || textStatus == 'error'){
                       document.querySelector('#TimeoutSup').open();
                   }
               },
               success: function (dataClientShift) {
                   $("#workView").show();
                   $("#loaderView").hide();
                   console.log(dataClientShift)
                   $("#customLoaderViewPopup").hide();
                    var dataClientHours = JSON.parse(dataClientShift[0]);
                    console.log(dataClientHours)
                    var csvContent = '';
                    var headers = ['SL.No', 'Client Name', 'Total Hours'];
                    csvContent += headers.join(',') + '\n';
                    for (var i = 0; i < dataClientHours.length; i++) {
                        self.ClientShiftHoursDet.push({'no': i+1, 'client_name': dataClientHours[i][0], 'total_hours': dataClientHours[i][1]  });
                        var rowData = [i+1, dataClientHours[i][0], dataClientHours[i][1]];
                        csvContent += rowData.join(',') + '\n';
                }
                var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                var today = new Date();
                var fileName = 'Total_Client_Hours_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
                self.blob1(blob);
                self.fileName1(fileName);
           }
           })
       }

       self.menuItemSelectStaffHour = function (event) {
        self.StaffWorkHoursDet([]);
        var target = event.target;
        var itemValue = target.value;
        console.log(itemValue)
        if(itemValue == 'This Week'){
            self.StaffWork('')
            getThisWeekStaffWorkInfo();
        }
        if(itemValue == 'This Month'){
            self.StaffWork('')
            getThisMonthStaffWorkInfo();
        }
        if(itemValue == 'Last Week'){
            self.StaffWork('')
            getLastWeekStaffWorkInfo();
        }
        if(itemValue == 'Last Month'){
            self.StaffWork('')
            getLastMonthStaffWorkInfo();
        }
        if(itemValue == 'Custom'){
            self.start_date('')
            self.end_date('')
            self.StaffWork('Custom')
        }
    }

                function getThisWeekStaffWorkInfo() {
                    $("#workView").hide();
                // $("#loaderView").show();
                
                /*Chart Properties*/

                $.ajax({
                    url: BaseURL + "/jpDashboardThisWeekStaffWorkHoursGet",
                    type: 'GET',
                    dataType: 'json',
                    timeout: sessionStorage.getItem("timeInetrval"),
                    context: self,
                    error: function (xhr, textStatus, errorThrown) {
                        if(textStatus == 'timeout' || textStatus == 'error'){
                            document.querySelector('#TimeoutSup').open();
                        }
                    },
                    success: function (dataStaffWork) {
                        $("#workView").show();
                        $("#loaderView").hide();
                        console.log(dataStaffWork)
                        $("#customLoaderViewPopup").hide();
                            var dataStaffHours = JSON.parse(dataStaffWork[0]);
                            console.log(dataStaffHours)
                            var csvContent = '';
                            var headers = ['SL.No', 'Staff Name', 'Job Role','Total Hours'];
                            csvContent += headers.join(',') + '\n';
                            for (var i = 0; i < dataStaffHours.length; i++) {
                                self.StaffWorkHoursDet.push({'no': i+1, 'staff_name': dataStaffHours[i][0] + " " + dataStaffHours[i][1], 'job_role': dataStaffHours[i][2], 'total_hours': dataStaffHours[i][3]  });
                                var rowData = [i+1, dataStaffHours[i][0] + " " + dataStaffHours[i][1], dataStaffHours[i][2], dataStaffHours[i][3] ];
                                csvContent += rowData.join(',') + '\n';
                        }
                        var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                        var today = new Date();
                        var fileName = 'Staff_Work_This_Week_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
                        self.blob(blob);
                        self.fileName(fileName);
                }
                })
            }


            function getThisMonthStaffWorkInfo() {
                $("#workView").hide();
            // $("#loaderView").show();
            
            /*Chart Properties*/

            $.ajax({
                url: BaseURL + "/jpDashboardThisMonthStaffWorkHoursGet",
                type: 'GET',
                dataType: 'json',
                timeout: sessionStorage.getItem("timeInetrval"),
                context: self,
                error: function (xhr, textStatus, errorThrown) {
                    if(textStatus == 'timeout' || textStatus == 'error'){
                        document.querySelector('#TimeoutSup').open();
                    }
                },
                success: function (dataStaffWork) {
                    $("#workView").show();
                    $("#loaderView").hide();
                    console.log(dataStaffWork)
                    $("#customLoaderViewPopup").hide();
                        var dataStaffHours = JSON.parse(dataStaffWork[0]);
                        console.log(dataStaffHours)
                        var csvContent = '';
                        var headers = ['SL.No', 'Staff Name', 'Job Role','Total Hours'];
                        csvContent += headers.join(',') + '\n';
                        for (var i = 0; i < dataStaffHours.length; i++) {
                            self.StaffWorkHoursDet.push({'no': i+1, 'staff_name': dataStaffHours[i][0] + " " + dataStaffHours[i][1], 'job_role': dataStaffHours[i][2], 'total_hours': dataStaffHours[i][3]  });
                            var rowData = [i+1, dataStaffHours[i][0] + " " + dataStaffHours[i][1], dataStaffHours[i][2], dataStaffHours[i][3] ];
                            csvContent += rowData.join(',') + '\n';
                    }
                    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                    var today = new Date();
                    var fileName = 'Staff_Work_This_Month_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
                    self.blob(blob);
                    self.fileName(fileName);
            }
            })
        }

                    function getLastWeekStaffWorkInfo() {
                        $("#workView").hide();
                    // $("#loaderView").show();
                    
                    /*Chart Properties*/

                    $.ajax({
                        url: BaseURL + "/jpDashboardLastWeekStaffWorkHoursGet",
                        type: 'GET',
                        dataType: 'json',
                        timeout: sessionStorage.getItem("timeInetrval"),
                        context: self,
                        error: function (xhr, textStatus, errorThrown) {
                            if(textStatus == 'timeout' || textStatus == 'error'){
                                document.querySelector('#TimeoutSup').open();
                            }
                        },
                        success: function (dataStaffWork) {
                            $("#workView").show();
                            $("#loaderView").hide();
                            console.log(dataStaffWork)
                            $("#customLoaderViewPopup").hide();
                                var dataStaffHours = JSON.parse(dataStaffWork[0]);
                                console.log(dataStaffHours)
                                var csvContent = '';
                                var headers = ['SL.No', 'Staff Name', 'Job Role','Total Hours'];
                                csvContent += headers.join(',') + '\n';
                                for (var i = 0; i < dataStaffHours.length; i++) {
                                    self.StaffWorkHoursDet.push({'no': i+1, 'staff_name': dataStaffHours[i][0] + " " + dataStaffHours[i][1], 'job_role': dataStaffHours[i][2], 'total_hours': dataStaffHours[i][3]  });
                                    var rowData = [i+1, dataStaffHours[i][0] + " " + dataStaffHours[i][1], dataStaffHours[i][2], dataStaffHours[i][3] ];
                                    csvContent += rowData.join(',') + '\n';
                            }
                            var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                            var today = new Date();
                            var fileName = 'Staff_Work_Last_Week_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
                            self.blob(blob);
                            self.fileName(fileName);
                    }
                    })
                }


                function getLastMonthStaffWorkInfo() {
                    $("#workView").hide();
                // $("#loaderView").show();
                
                /*Chart Properties*/

                $.ajax({
                    url: BaseURL + "/jpDashboardLastMonthStaffWorkHoursGet",
                    type: 'GET',
                    dataType: 'json',
                    timeout: sessionStorage.getItem("timeInetrval"),
                    context: self,
                    error: function (xhr, textStatus, errorThrown) {
                        if(textStatus == 'timeout' || textStatus == 'error'){
                            document.querySelector('#TimeoutSup').open();
                        }
                    },
                    success: function (dataStaffWork) {
                        $("#workView").show();
                        $("#loaderView").hide();
                        console.log(dataStaffWork)
                        $("#customLoaderViewPopup").hide();
                            var dataStaffHours = JSON.parse(dataStaffWork[0]);
                            console.log(dataStaffHours)
                            var csvContent = '';
                            var headers = ['SL.No', 'Staff Name', 'Job Role','Total Hours'];
                            csvContent += headers.join(',') + '\n';
                            for (var i = 0; i < dataStaffHours.length; i++) {
                                self.StaffWorkHoursDet.push({'no': i+1, 'staff_name': dataStaffHours[i][0] + " " + dataStaffHours[i][1], 'job_role': dataStaffHours[i][2], 'total_hours': dataStaffHours[i][3]  });
                                var rowData = [i+1, dataStaffHours[i][0] + " " + dataStaffHours[i][1], dataStaffHours[i][2], dataStaffHours[i][3] ];
                                csvContent += rowData.join(',') + '\n';
                        }
                        var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                        var today = new Date();
                        var fileName = 'Staff_Work_Last_Month_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
                        self.blob(blob);
                        self.fileName(fileName);
                }
                })
            }

            self.getStaffWorkFilterInfo = function (event,data) {                
            $("#workView").hide();
            // $("#loaderView").show();
            
            /*Chart Properties*/
            var validSec = self._checkValidationGroup("dateFilterStaffWorkHour");
            if (validSec) {
            $.ajax({
                url: BaseURL + "/jpDashboardStaffWorkHoursGetFilter",
                type: 'POST',
                data: JSON.stringify({
                    start_date : self.start_date(),
                    end_date : self.end_date()
                }),
                timeout: sessionStorage.getItem("timeInetrval"),
                context: self,
                error: function (xhr, textStatus, errorThrown) {
                    if(textStatus == 'timeout' || textStatus == 'error'){
                        document.querySelector('#TimeoutSup').open();
                    }
                },
                success: function (dataStaffWorkFilter) {
                    $("#workView").show();
                    $("#loaderView").hide();
                    console.log(dataStaffWorkFilter)
                    $("#customLoaderViewPopup").hide();
                        var dataStaffHoursFilter = JSON.parse(dataStaffWorkFilter[0]);
                        console.log(dataStaffHoursFilter)
                        var csvContent = '';
                        var headers = ['SL.No', 'Staff Name', 'Job Role','Total Hours'];
                        csvContent += headers.join(',') + '\n';
                        for (var i = 0; i < dataStaffHoursFilter.length; i++) {
                            self.StaffWorkHoursDet.push({'no': i+1, 'staff_name': dataStaffHoursFilter[i][0] + " " + dataStaffHoursFilter[i][1], 'job_role': dataStaffHoursFilter[i][2], 'total_hours': dataStaffHoursFilter[i][3]  });
                            var rowData = [i+1, dataStaffHoursFilter[i][0] + " " + dataStaffHoursFilter[i][1], dataStaffHoursFilter[i][2], dataStaffHoursFilter[i][3] ];
                            csvContent += rowData.join(',') + '\n';
                    }
                    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                    var today = new Date();
                    var fileName = 'Staff_Work_Custom_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
                    self.blobCustom(blob);
                    self.fileNameCustom(fileName);
            }
            })
        }
        }

        self.getStaffWorkFilterInfo = function (event,data) {
            self.StaffWorkFlag('1');
            console.log(self.CustomTotalStaffDet())
            var validSec = self._checkValidationGroup("dateFilterStaffWorkHour");
            if (validSec) {
                $("#customLoaderViewPopup").show();
            $.ajax({
                url: BaseURL + "/jpDashboardStaffWorkHoursGetFilter",
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
                success: function (dataStaffWorkFilter) {
                    $("#workView").show();
                    $("#loaderView").hide();
                    console.log(dataStaffWorkFilter)
                    $("#customLoaderViewPopup").hide();
                        var dataStaffHoursFilter = JSON.parse(dataStaffWorkFilter[0]);
                        console.log(dataStaffHoursFilter)
                        var csvContent = '';
                        var headers = ['SL.No', 'Staff Name', 'Job Role','Total Hours'];
                        csvContent += headers.join(',') + '\n';
                        for (var i = 0; i < dataStaffHoursFilter.length; i++) {
                            self.StaffWorkHoursDet.push({'no': i+1, 'staff_name': dataStaffHoursFilter[i][0] + " " + dataStaffHoursFilter[i][1], 'job_role': dataStaffHoursFilter[i][2], 'total_hours': dataStaffHoursFilter[i][3]  });
                            var rowData = [i+1, dataStaffHoursFilter[i][0] + " " + dataStaffHoursFilter[i][1], dataStaffHoursFilter[i][2], dataStaffHoursFilter[i][3] ];
                            csvContent += rowData.join(',') + '\n';
                    }
                    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                    var today = new Date();
                    var fileName = 'Staff_Work_Custom_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
                    self.blobCustom(blob);
                    self.fileNameCustom(fileName);
                }
            })  
            }
        }; 

        self.getStaffWorkFilterInfoClear = function (event,data) {
           //alert(self.flag())
           console.log(self.CustomTotalStaffDet())
           var validSec = self._checkValidationGroup("dateFilterStaffWorkHour");
           if(validSec == false){
            self.StaffWorkHoursDet([])
           }
           if (validSec) {
            self.StaffWorkHoursDet([])
            $("#customLoaderViewPopup").show();
           $.ajax({
               url: BaseURL + "/jpDashboardStaffWorkHoursGetFilter",
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
               success: function (dataStaffWorkFilter) {
                   self.StaffWorkHoursDet([])
                   $("#workView").show();
                    $("#loaderView").hide();
                    console.log(dataStaffWorkFilter)
                    $("#customLoaderViewPopup").hide();
                        var dataStaffHoursFilter = JSON.parse(dataStaffWorkFilter[0]);
                        console.log(dataStaffHoursFilter)
                        var csvContent = '';
                        var headers = ['SL.No', 'Staff Name', 'Job Role','Total Hours'];
                        csvContent += headers.join(',') + '\n';
                        for (var i = 0; i < dataStaffHoursFilter.length; i++) {
                            self.StaffWorkHoursDet.push({'no': i+1, 'staff_name': dataStaffHoursFilter[i][0] + " " + dataStaffHoursFilter[i][1], 'job_role': dataStaffHoursFilter[i][2], 'total_hours': dataStaffHoursFilter[i][3]  });
                            var rowData = [i+1, dataStaffHoursFilter[i][0] + " " + dataStaffHoursFilter[i][1], dataStaffHoursFilter[i][2], dataStaffHoursFilter[i][3] ];
                            csvContent += rowData.join(',') + '\n';
                    }
                    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                    var today = new Date();
                    var fileName = 'Staff_Work_Custom_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
                    self.blobCustom(blob);
                    self.fileNameCustom(fileName);
               }
           })  
           }
       }; 

       self.menuItemSelectClientHour = function (event) {
        self.ClientShiftHoursDet([]);
        var target = event.target;
        var itemValue = target.value;
        console.log(itemValue)
        if(itemValue == 'This Week'){
            self.ClientWork('')
            getThisWeekClientWorkInfo();
        }
        if(itemValue == 'This Month'){
            self.ClientWork('')
            getThisMonthClientWorkInfo();
        }
        if(itemValue == 'Last Week'){
            self.ClientWork('')
            getLastWeekClientWorkInfo();
        }
        if(itemValue == 'Last Month'){
            self.ClientWork('')
            getLastMonthClientWorkInfo();
        }
        if(itemValue == 'Custom'){
            self.start_date('')
            self.end_date('')
            self.ClientWork('Custom')
        }
    }

                    function getThisWeekClientWorkInfo() {
                        $("#workView").hide();
                    // $("#loaderView").show();
                    
                    /*Chart Properties*/

                    $.ajax({
                        url: BaseURL + "/jpDashboardThisWeekClientWorkHoursGet",
                        type: 'GET',
                        dataType: 'json',
                        timeout: sessionStorage.getItem("timeInetrval"),
                        context: self,
                        error: function (xhr, textStatus, errorThrown) {
                            if(textStatus == 'timeout' || textStatus == 'error'){
                                document.querySelector('#TimeoutSup').open();
                            }
                        },
                        success: function (dataClientShift) {
                            $("#workView").show();
                            $("#loaderView").hide();
                            console.log(dataClientShift)
                            $("#customLoaderViewPopup").hide();
                            var dataClientHours = JSON.parse(dataClientShift[0]);
                            console.log(dataClientHours)
                            var csvContent = '';
                            var headers = ['SL.No', 'Client Name', 'Total Hours'];
                            csvContent += headers.join(',') + '\n';
                            for (var i = 0; i < dataClientHours.length; i++) {
                                self.ClientShiftHoursDet.push({'no': i+1, 'client_name': dataClientHours[i][0], 'total_hours': dataClientHours[i][1]  });
                                var rowData = [i+1, dataClientHours[i][0], dataClientHours[i][1]];
                                csvContent += rowData.join(',') + '\n';
                        }
                        var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                        var today = new Date();
                        var fileName = 'This_Week_Client_Hours_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
                        self.blob1(blob);
                        self.fileName1(fileName);
                    }
                    })
                }

                function getThisMonthClientWorkInfo() {
                    $("#workView").hide();
                // $("#loaderView").show();
                
                /*Chart Properties*/

                $.ajax({
                    url: BaseURL + "/jpDashboardThisMonthClientWorkHoursGet",
                    type: 'GET',
                    dataType: 'json',
                    timeout: sessionStorage.getItem("timeInetrval"),
                    context: self,
                    error: function (xhr, textStatus, errorThrown) {
                        if(textStatus == 'timeout' || textStatus == 'error'){
                            document.querySelector('#TimeoutSup').open();
                        }
                    },
                    success: function (dataClientShift) {
                        $("#workView").show();
                        $("#loaderView").hide();
                        console.log(dataClientShift)
                        $("#customLoaderViewPopup").hide();
                        var dataClientHours = JSON.parse(dataClientShift[0]);
                        console.log(dataClientHours)
                        var csvContent = '';
                        var headers = ['SL.No', 'Client Name', 'Total Hours'];
                        csvContent += headers.join(',') + '\n';
                        for (var i = 0; i < dataClientHours.length; i++) {
                            self.ClientShiftHoursDet.push({'no': i+1, 'client_name': dataClientHours[i][0], 'total_hours': dataClientHours[i][1]  });
                            var rowData = [i+1, dataClientHours[i][0], dataClientHours[i][1]];
                            csvContent += rowData.join(',') + '\n';
                    }
                    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                    var today = new Date();
                    var fileName = 'This_Month_Client_Hours_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
                    self.blob1(blob);
                    self.fileName1(fileName);
                }
                })
            }

            function getLastWeekClientWorkInfo() {
                $("#workView").hide();
            // $("#loaderView").show();
            
            /*Chart Properties*/

            $.ajax({
                url: BaseURL + "/jpDashboardLastWeekClientWorkHoursGet",
                type: 'GET',
                dataType: 'json',
                timeout: sessionStorage.getItem("timeInetrval"),
                context: self,
                error: function (xhr, textStatus, errorThrown) {
                    if(textStatus == 'timeout' || textStatus == 'error'){
                        document.querySelector('#TimeoutSup').open();
                    }
                },
                success: function (dataClientShift) {
                    $("#workView").show();
                    $("#loaderView").hide();
                    console.log(dataClientShift)
                    $("#customLoaderViewPopup").hide();
                    var dataClientHours = JSON.parse(dataClientShift[0]);
                    console.log(dataClientHours)
                    var csvContent = '';
                    var headers = ['SL.No', 'Client Name', 'Total Hours'];
                    csvContent += headers.join(',') + '\n';
                    for (var i = 0; i < dataClientHours.length; i++) {
                        self.ClientShiftHoursDet.push({'no': i+1, 'client_name': dataClientHours[i][0], 'total_hours': dataClientHours[i][1]  });
                        var rowData = [i+1, dataClientHours[i][0], dataClientHours[i][1]];
                        csvContent += rowData.join(',') + '\n';
                }
                var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                var today = new Date();
                var fileName = 'Last_Week_Client_Hours_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
                self.blob1(blob);
                self.fileName1(fileName);
            }
            })
        }

        function getLastMonthClientWorkInfo() {
            $("#workView").hide();
        // $("#loaderView").show();
        
        /*Chart Properties*/

        $.ajax({
            url: BaseURL + "/jpDashboardLastMonthClientWorkHoursGet",
            type: 'GET',
            dataType: 'json',
            timeout: sessionStorage.getItem("timeInetrval"),
            context: self,
            error: function (xhr, textStatus, errorThrown) {
                if(textStatus == 'timeout' || textStatus == 'error'){
                    document.querySelector('#TimeoutSup').open();
                }
            },
            success: function (dataClientShift) {
                $("#workView").show();
                $("#loaderView").hide();
                console.log(dataClientShift)
                $("#customLoaderViewPopup").hide();
                var dataClientHours = JSON.parse(dataClientShift[0]);
                console.log(dataClientHours)
                var csvContent = '';
                var headers = ['SL.No', 'Client Name', 'Total Hours'];
                csvContent += headers.join(',') + '\n';
                for (var i = 0; i < dataClientHours.length; i++) {
                    self.ClientShiftHoursDet.push({'no': i+1, 'client_name': dataClientHours[i][0], 'total_hours': dataClientHours[i][1]  });
                    var rowData = [i+1, dataClientHours[i][0], dataClientHours[i][1]];
                    csvContent += rowData.join(',') + '\n';
            }
            var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            var today = new Date();
            var fileName = 'Last_Month_Client_Hours_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
            self.blob1(blob);
            self.fileName1(fileName);
        }
        })
    }

    self.getClientWorkFilterInfo = function (event,data) {
        self.ClientWorkFlag('1');
        console.log(self.ClientShiftHoursDet())
        var validSec = self._checkValidationGroup("dateFilterClientWorkHour");
        if (validSec) {
            $("#customLoaderViewPopup").show();
        $.ajax({
            url: BaseURL + "/jpDashboardClientWorkHoursGetFilter",
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
            success: function (dataClientShift) {
                $("#workView").show();
                $("#loaderView").hide();
                console.log(dataClientShift)
                $("#customLoaderViewPopup").hide();
                var dataClientHours = JSON.parse(dataClientShift[0]);
                console.log(dataClientHours)
                var csvContent = '';
                var headers = ['SL.No', 'Client Name', 'Total Hours'];
                csvContent += headers.join(',') + '\n';
                for (var i = 0; i < dataClientHours.length; i++) {
                    self.ClientShiftHoursDet.push({'no': i+1, 'client_name': dataClientHours[i][0], 'total_hours': dataClientHours[i][1]  });
                    var rowData = [i+1, dataClientHours[i][0], dataClientHours[i][1]];
                    csvContent += rowData.join(',') + '\n';
            }
            var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            var today = new Date();
            var fileName = 'Custom_Client_Hours_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
            self.blobCustom(blob);
            self.fileNameCustom(fileName);
            }
        })  
        }
    }; 

    self.getClientWorkFilterInfoClear = function (event,data) {
       //alert(self.flag())
       console.log(self.ClientShiftHoursDet())
       var validSec = self._checkValidationGroup("dateFilterClientWorkHour");
       if(validSec == false){
        self.ClientShiftHoursDet([])
       }
       if (validSec) {
        self.ClientShiftHoursDet([])
        $("#customLoaderViewPopup").show();
       $.ajax({
           url: BaseURL + "/jpDashboardClientWorkHoursGetFilter",
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
           success: function (dataClientShift) {
               self.ClientShiftHoursDet([])
               $("#workView").show();
               $("#loaderView").hide();
               console.log(dataClientShift)
               $("#customLoaderViewPopup").hide();
               var dataClientHours = JSON.parse(dataClientShift[0]);
               console.log(dataClientHours)
               var csvContent = '';
               var headers = ['SL.No', 'Client Name', 'Total Hours'];
               csvContent += headers.join(',') + '\n';
               for (var i = 0; i < dataClientHours.length; i++) {
                   self.ClientShiftHoursDet.push({'no': i+1, 'client_name': dataClientHours[i][0], 'total_hours': dataClientHours[i][1]  });
                   var rowData = [i+1, dataClientHours[i][0], dataClientHours[i][1]];
                   csvContent += rowData.join(',') + '\n';
           }
           var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
           var today = new Date();
           var fileName = 'Custom_Client_Hours_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
           self.blobCustom(blob);
           self.fileNameCustom(fileName);
           }
       })  
       }
   }; 

   function getStaffFileReminder() {
    $("#ReminderView").hide();
   // $("#loaderView").show();
   
   /*Chart Properties*/

   $.ajax({
       url: BaseURL + "/jpDashboardStaffFileReminder",
       type: 'GET',
       dataType: 'json',
       timeout: sessionStorage.getItem("timeInetrval"),
       context: self,
       error: function (xhr, textStatus, errorThrown) {
           if(textStatus == 'timeout' || textStatus == 'error'){
               document.querySelector('#TimeoutSup').open();
           }
       },
       success: function (dataStaffReminder) {
           $("#ReminderView").show();
           $("#loaderView").hide();
           $("#customLoaderViewPopup").hide();
            var StaffReminder = JSON.parse(dataStaffReminder[0]);
            console.log(StaffReminder)
        //     var csvContent = '';
        //     var headers = ['SL.No', 'Client Name', 'Total Hours'];
        //     csvContent += headers.join(',') + '\n';
            for (var i = 0; i < StaffReminder.length; i++) {
                self.StaffReminderDet.push({'no': i+1,'id': StaffReminder[i][0],'name' : StaffReminder[i][2] + " " + StaffReminder[i][3], 'email': StaffReminder[i][5],'contact': StaffReminder[i][6],'role': StaffReminder[i][4],'file': StaffReminder[i][7],'expiry_date': StaffReminder[i][8]  });
                // var rowData = [i+1, dataClientHours[i][0], dataClientHours[i][1]];
                // csvContent += rowData.join(',') + '\n';
        }
        // var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        // var today = new Date();
        // var fileName = 'Total_Client_Hours_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
        // self.blob1(blob);
        // self.fileName1(fileName);
   }
   })
}

        //self.dataProvider = new ArrayDataProvider(this.StaffDet, { keyAttributes: "id"});
        self.TotalStaffData = new PagingDataProviderView(new ArrayDataProvider(self.TotalStaffDet, {keyAttributes: 'id'}));   
        self.ActiveStaffData = new PagingDataProviderView(new ArrayDataProvider(self.ActiveStaffDet, {keyAttributes: 'id'}));   
        self.InactiveStaffData = new PagingDataProviderView(new ArrayDataProvider(self.InactiveStaffDet, {keyAttributes: 'id'}));   
        self.PendingStaffData = new PagingDataProviderView(new ArrayDataProvider(self.PendingStaffDet, {keyAttributes: 'id'}));   
        self.CustomTotalStaffData = new PagingDataProviderView(new ArrayDataProvider(self.CustomTotalStaffDet, {keyAttributes: 'id'}));   
       
        self.TotalShiftData = new PagingDataProviderView(new ArrayDataProvider(self.TotalShiftDet, {keyAttributes: 'id'}));   
        self.CustomTotalShiftData = new PagingDataProviderView(new ArrayDataProvider(self.CustomTotalShiftDet, {keyAttributes: 'id'}));  
        self.ThisWeekShiftData = new PagingDataProviderView(new ArrayDataProvider(self.ThisWeekShiftDet, {keyAttributes: 'id'}));  
        self.LastWeekShiftData = new PagingDataProviderView(new ArrayDataProvider(self.LastWeekShiftDet, {keyAttributes: 'id'}));    
        self.LastMonthShiftData = new PagingDataProviderView(new ArrayDataProvider(self.LastMonthShiftDet, {keyAttributes: 'id'}));    
        self.ThisMonthShiftData = new PagingDataProviderView(new ArrayDataProvider(self.ThisMonthShiftDet, {keyAttributes: 'id'})); 

        self.TotalTimesheetData = new PagingDataProviderView(new ArrayDataProvider(self.TotalTimesheetDet, {keyAttributes: 'id'}));    
        self.ThisWeekTimesheetData = new PagingDataProviderView(new ArrayDataProvider(self.ThisWeekTimesheetDet, {keyAttributes: 'id'}));    
        self.ThisMonthTimesheetData = new PagingDataProviderView(new ArrayDataProvider(self.ThisMonthTimesheetDet, {keyAttributes: 'id'})); 
        self.LastWeekTimesheetData = new PagingDataProviderView(new ArrayDataProvider(self.LastWeekTimesheetDet, {keyAttributes: 'id'})); 
        self.LastMonthTimesheetData = new PagingDataProviderView(new ArrayDataProvider(self.LastMonthTimesheetDet, {keyAttributes: 'id'}));       
        self.CustomTotalTimesheetData = new PagingDataProviderView(new ArrayDataProvider(self.CustomTotalTimesheetDet, {keyAttributes: 'id'}));       

        self.TotalInvoiceData = new PagingDataProviderView(new ArrayDataProvider(self.TotalInvoiceDet, {keyAttributes: 'id'}));    
        self.ThisWeekInvoiceData = new PagingDataProviderView(new ArrayDataProvider(self.ThisWeekInvoiceDet, {keyAttributes: 'id'}));    
        self.ThisMonthInvoiceData = new PagingDataProviderView(new ArrayDataProvider(self.ThisMonthInvoiceDet, {keyAttributes: 'id'}));    
        self.LastWeekInvoiceData = new PagingDataProviderView(new ArrayDataProvider(self.LastWeekInvoiceDet, {keyAttributes: 'id'}));    
        self.LastMonthInvoiceData = new PagingDataProviderView(new ArrayDataProvider(self.LastMonthInvoiceDet, {keyAttributes: 'id'}));    
        self.CustomTotalInvoiceData = new PagingDataProviderView(new ArrayDataProvider(self.CustomTotalInvoiceDet, {keyAttributes: 'id'}));     
        
        self.StaffWorkHoursData = new PagingDataProviderView(new ArrayDataProvider(self.StaffWorkHoursDet, {keyAttributes: 'id'}));       
        self.ClientShiftHoursData = new PagingDataProviderView(new ArrayDataProvider(self.ClientShiftHoursDet, {keyAttributes: 'id'}));       
        self.StaffReminderData = new PagingDataProviderView(new ArrayDataProvider(self.StaffReminderDet, {keyAttributes: 'id'}));       

        }
    }
    return  dasboardAdminfViewModel;
});