define(['ojs/ojcore',"knockout","jquery","appController","ojs/ojconverterutils-i18n", "ojs/ojarraydataprovider","ojs/ojpagingdataproviderview",'ojs/ojknockout-keyset', "ojs/ojresponsiveutils", "ojs/ojresponsiveknockoututils", "ojs/ojknockout", "ojs/ojlistitemlayout", "ojs/ojtrain",
        "ojs/ojlistview","ojs/ojradioset","ojs/ojlabelvalue","ojs/ojlabel" ,"ojs/ojselectcombobox","ojs/ojbutton" ,"ojs/ojprogress-bar", "ojs/ojdatetimepicker", 'ojs/ojtable', 'ojs/ojswitch', 'ojs/ojvalidationgroup','ojs/ojselector','ojs/ojtoolbar','ojs/ojfilepicker','ojs/ojcheckboxset', "ojs/ojavatar","ojs/ojactioncard","ojs/ojmenu","ojs/ojformlayout","ojs/ojpagingcontrol","ojs/ojchart"], 
function (oj,ko,$, app, ojconverterutils_i18n_1, ArrayDataProvider, PagingDataProviderView,  ojknockout_keyset_1,ResponsiveUtils, ResponsiveKnockoutUtils, AsyncRegExpValidator) {
    
    class dasboardAdminfViewModel {
        constructor(context) {
            var self = this;
            var BaseURL = sessionStorage.getItem("BaseURL");
            self.allocatedStaff = ko.observable('');
            self.totalShiftPost = ko.observable('');
            self.confirmedShiftPost = ko.observable('');
            self.completedShiftPost = ko.observable('');
            self.PostShiftDet = ko.observableArray([]);
            self.CustomPostShiftDet = ko.observableArray([]);
            self.customShiftCount = ko.observable('0');
            self.ConfirmedShiftDet = ko.observableArray([]);
            self.CustomConfirmedShiftDet = ko.observableArray([]);
            self.CompletedShiftDet = ko.observableArray([]);

            self.customStaffCount = ko.observable('0');
            self.activeStaff = ko.observable('');
            self.inactiveStaff = ko.observable('');
            self.pendingStaff = ko.observable('');
            self.username = ko.observable('');
            self.fullname = ko.observable('');
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

            self.menuItemsConfirmed = [
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
                    id: 'custom',
                    label: 'Custom',
                    icon: 'oj-ux-ico-print'
                }
            ];

            self.menuItemPost = [
                {
                    id: 'post-shift',
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


            var routerLength = context.parentRouter._routes.length;
            if(routerLength!=18){
                location.reload();
            }      

            self.connected = function () {
                if (sessionStorage.getItem("userName") == null) {
                    self.router.go({ path: 'signin' });
                }
                else {
                   app.onAppSuccess();
                   self.username(sessionStorage.getItem("userName"));
                   self.fullname(sessionStorage.getItem("fullName"));
                   getShiftInfo();
                }
            };
            self.context = context;
            self.router = self.context.parentRouter;

            function getShiftInfo() {
                $.ajax({
                    url: BaseURL  + "/jpDashboardClientShiftInfo",
                    type: 'POST',
                    data: JSON.stringify({
                        clientId : sessionStorage.getItem("clientId")
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
                        console.log(data)
                        self.totalShiftPost(data[0])
                        self.confirmedShiftPost(data[1])
                        self.allocatedStaff(data[2])
                        self.completedShiftPost(data[3])
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

            self.menuItemPostShift = function (event) {
                //self.ActiveStaffDet([]);
                var target = event.target;
                var itemValue = target.value;
                console.log(itemValue)
                getActiveStaffList();
                let popup = document.getElementById("activeStaffPopup");
                popup.open();
            }

            self.postShiftPopup = function (event) {
                //self.ActiveStaffDet([]);
                getPostShiftList();
                let popup = document.getElementById("postShiftPopup");
                popup.open();
            }
        
            self.closePostShiftPopup = function (event) {
                //self.ActiveStaffDet([]);
                let popup = document.getElementById("postShiftPopup");
                popup.close();
                location.reload();
            }

            function getPostShiftList(){
                $("#loaderPostShiftPopup").show();
                $.ajax({
                    url: BaseURL  + "/jpPostShiftDashboardGet",
                    type: 'POST',
                    data: JSON.stringify({
                        clientId : sessionStorage.getItem("clientId")
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
                        console.log(data)
                        var data = JSON.parse(data[0]);
                        console.log(data)
                        $("#loaderPostShiftPopup").hide();
                         for (var i = 0; i < data.length; i++) {
                            self.PostShiftDet.push({'no': i+1, 'shift_name' : data[i][1], 'shift_date': data[i][4],'start_time': data[i][5], 'end_time': data[i][6], 'status': data[i][15]  });
                    }
                }
                })
            }
            
            self.menuItemConfirmedSelect = function (event) {
                self.TotalStaffDet([]);
                var target = event.target;
                var itemValue = target.value;
                console.log(itemValue)
                if(itemValue == 'this-week'){
                    getThisWeekConfirmedPostShift();
                    let popup = document.getElementById("confirmedShiftPopup");
                    popup.open();
                }
                if(itemValue == 'this-month'){
                    getThisMonthConfirmedPostShift();
                    let popup = document.getElementById("confirmedShiftPopup");
                    popup.open();
                }
                if(itemValue == 'custom'){
                    let popup = document.getElementById("customConfirmedShiftPopup");
                    popup.open();
                }
            }

            self.confirmedShiftPopup = function (event) {
                //self.InactiveStaffDet([]);
                getConfirmedShiftList();
                let popup = document.getElementById("confirmedShiftPopup");
                popup.open();
            }
        
            self.closeInactiveStaffPopup = function (event) {
                //self.InactiveStaffDet([]);
                let popup = document.getElementById("inactiveStaffPopup");
                popup.close();
                location.reload();
            }
            function getConfirmedShiftList(){
                $("#loaderPostShiftPopup").show();
                $.ajax({
                    url: BaseURL  + "/jpConfirmedShiftDashboardGet",
                    type: 'POST',
                    data: JSON.stringify({
                        clientId : sessionStorage.getItem("clientId")
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
                        console.log(data)
                        var data = JSON.parse(data[0]);
                        console.log(data)
                        $("#loaderPostShiftPopup").hide();
                         for (var i = 0; i < data.length; i++) {
                            self.ConfirmedShiftDet.push({'no': i+1, 'shift_name' : data[i][1], 'shift_date': data[i][4],'start_time': data[i][5], 'end_time': data[i][6], 'status': data[i][15]  });
                    }
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
                self.PostShiftDet([]);
                var target = event.target;
                var itemValue = target.value;
                console.log(itemValue)
                if(itemValue == 'this-week'){
                    getThisWeekTotalPostShift();
                    let popup = document.getElementById("postShiftPopup");
                    popup.open();
                }
                if(itemValue == 'this-month'){
                    getThisMonthTotalPostShift();
                    let popup = document.getElementById("postShiftPopup");
                    popup.open();
                }
                if(itemValue == 'last-week'){
                    getLastWeekTotalPostShift();
                    let popup = document.getElementById("postShiftPopup");
                    popup.open();
                }
                if(itemValue == 'last-month'){
                    getLastMonthTotalPostShift();
                    let popup = document.getElementById("postShiftPopup");
                    popup.open();
                }
                if(itemValue == 'custom'){
                    //getTotalStaffList();
                    let popup = document.getElementById("customPostShiftPopup");
                    popup.open();
                    //self.CustomTotalStaffDet([]);
                    //refresh()
                }
            }

            self.menuItemSelectCompleted = function (event) {
                self.CompletedShiftDet([]);
                var target = event.target;
                var itemValue = target.value;
                console.log(itemValue)
                if(itemValue == 'this-week'){
                    getThisWeekCompletedShift();
                    let popup = document.getElementById("postShiftPopup");
                    popup.open();
                }
                if(itemValue == 'this-month'){
                    getThisMonthTotalPostShift();
                    let popup = document.getElementById("postShiftPopup");
                    popup.open();
                }
                if(itemValue == 'last-week'){
                    getLastWeekTotalPostShift();
                    let popup = document.getElementById("postShiftPopup");
                    popup.open();
                }
                if(itemValue == 'last-month'){
                    getLastMonthTotalPostShift();
                    let popup = document.getElementById("postShiftPopup");
                    popup.open();
                }
                if(itemValue == 'custom'){
                    //getTotalStaffList();
                    let popup = document.getElementById("customPostShiftPopup");
                    popup.open();
                    //self.CustomTotalStaffDet([]);
                    //refresh()
                }
            }
         
            
            self.TotalPostShiftDateFilter = function (event,data) {
                self.flag('1');
                console.log(self.CustomPostShiftDet())
                var validSec = self._checkValidationGroup("dateFilterTotalPostShift");
                if (validSec) {
                    $("#customLoaderViewPopup").show();
                $.ajax({
                    url: BaseURL + "/jpCustomTotalPostShiftGet",
                    type: 'POST',
                    data: JSON.stringify({
                        clientId : sessionStorage.getItem("clientId"),
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
                    success: function (data) {
                        console.log(data)
                        self.customShiftCount(data[0])
                        var data = JSON.parse(data[1]);
                        console.log(data)
                        $("#customLoaderViewPopup").hide();
                         for (var i = 0; i < data.length; i++) {
                            self.CustomPostShiftDet.push({'no': i+1, 'shift_name' : data[i][1], 'shift_date': data[i][4],'start_time': data[i][5], 'end_time': data[i][6], 'status': data[i][15]  });
                    }
                }
                })  
                }
            }; 

            self.TotalPostShiftDateFilterClear = function (event,data) {
               //alert(self.flag())
               console.log(self.CustomPostShiftDet())
               var validSec = self._checkValidationGroup("dateFilterTotalPostShift");
               if(validSec == false){
                self.CustomPostShiftDet([])
               }
               if (validSec) {
                self.CustomPostShiftDet([])
                $("#customLoaderViewPopup").show();
                $.ajax({
                    url: BaseURL + "/jpCustomTotalPostShiftGet",
                    type: 'POST',
                    data: JSON.stringify({
                        clientId : sessionStorage.getItem("clientId"),
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
                   success: function (data) {
                    console.log(data)
                    self.customShiftCount(data[0])
                    var data = JSON.parse(data[1]);
                    console.log(data)
                    $("#customLoaderViewPopup").hide();
                     for (var i = 0; i < data.length; i++) {
                        self.CustomPostShiftDet.push({'no': i+1, 'shift_name' : data[i][1], 'shift_date': data[i][4],'start_time': data[i][5], 'end_time': data[i][6], 'status': data[i][15]  });
                    }
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

            function getThisWeekTotalPostShift(){
                $("#loaderViewPopup").show();
                $.ajax({
                    url: BaseURL  + "/jpThisWeekTotalPostShiftGet",
                    type: 'POST',
                    data: JSON.stringify({
                        clientId : sessionStorage.getItem("clientId")
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
                        console.log(data)
                        self.totalShiftPost(data[0])
                        var data = JSON.parse(data[1]);
                        console.log(data)
                        $("#loaderPostShiftPopup").hide();
                         for (var i = 0; i < data.length; i++) {
                            self.PostShiftDet.push({'no': i+1, 'shift_name' : data[i][1], 'shift_date': data[i][4],'start_time': data[i][5], 'end_time': data[i][6], 'status': data[i][15]  });
                    }
                }
                })
            }

            function getThisMonthTotalPostShift(){
                $("#loaderViewPopup").show();
                $.ajax({
                    url: BaseURL  + "/jpThisMonthTotalPostShiftGet",
                    type: 'POST',
                    data: JSON.stringify({
                        clientId : sessionStorage.getItem("clientId")
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
                        console.log(data)
                        self.totalShiftPost(data[0])
                        var data = JSON.parse(data[1]);
                        console.log(data)
                        $("#loaderPostShiftPopup").hide();
                         for (var i = 0; i < data.length; i++) {
                            self.PostShiftDet.push({'no': i+1, 'shift_name' : data[i][1], 'shift_date': data[i][4],'start_time': data[i][5], 'end_time': data[i][6], 'status': data[i][15]  });
                    }
                }
                })
            }

            function getLastWeekTotalPostShift(){
                $("#loaderViewPopup").show();
                $.ajax({
                    url: BaseURL  + "/jpLastWeekTotalPostShiftGet",
                    type: 'POST',
                    data: JSON.stringify({
                        clientId : sessionStorage.getItem("clientId")
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
                        console.log(data)
                        self.totalShiftPost(data[0])
                        var data = JSON.parse(data[1]);
                        console.log(data)
                        $("#loaderPostShiftPopup").hide();
                         for (var i = 0; i < data.length; i++) {
                            self.PostShiftDet.push({'no': i+1, 'shift_name' : data[i][1], 'shift_date': data[i][4],'start_time': data[i][5], 'end_time': data[i][6], 'status': data[i][15]  });
                    }
                }
                })
            }

            function getLastMonthTotalPostShift(){
                $("#loaderViewPopup").show();
                $.ajax({
                    url: BaseURL  + "/jpLastMonthTotalPostShiftGet",
                    type: 'POST',
                    data: JSON.stringify({
                        clientId : sessionStorage.getItem("clientId")
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
                        console.log(data)
                        self.totalShiftPost(data[0])
                        var data = JSON.parse(data[1]);
                        console.log(data)
                        $("#loaderPostShiftPopup").hide();
                         for (var i = 0; i < data.length; i++) {
                            self.PostShiftDet.push({'no': i+1, 'shift_name' : data[i][1], 'shift_date': data[i][4],'start_time': data[i][5], 'end_time': data[i][6], 'status': data[i][15]  });
                    }
                }
                })
            }

            function getThisWeekConfirmedPostShift(){
                $("#loaderConfirmedPopup").show();
                $.ajax({
                    url: BaseURL  + "/jpThisWeekConfirmedPostShiftGet",
                    type: 'POST',
                    data: JSON.stringify({
                        clientId : sessionStorage.getItem("clientId")
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
                        console.log(data)
                        self.confirmedShiftPost(data[0])
                        var data = JSON.parse(data[1]);
                        console.log(data)
                        $("#loaderConfirmedPopup").hide();
                         for (var i = 0; i < data.length; i++) {
                            self.ConfirmedShiftDet.push({'no': i+1, 'shift_name' : data[i][1], 'shift_date': data[i][4],'start_time': data[i][5], 'end_time': data[i][6], 'status': data[i][15]  });
                    }
                }
                })
            }

            function getThisMonthConfirmedPostShift(){
                $("#loaderConfirmedPopup").show();
                $.ajax({
                    url: BaseURL  + "/jpThisMonthConfirmedShiftGet",
                    type: 'POST',
                    data: JSON.stringify({
                        clientId : sessionStorage.getItem("clientId")
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
                        console.log(data)
                        self.confirmedShiftPost(data[0])
                        var data = JSON.parse(data[1]);
                        console.log(data)
                        $("#loaderConfirmedPopup").hide();
                         for (var i = 0; i < data.length; i++) {
                            self.ConfirmedShiftDet.push({'no': i+1, 'shift_name' : data[i][1], 'shift_date': data[i][4],'start_time': data[i][5], 'end_time': data[i][6], 'status': data[i][15]  });
                    }
                }
                })
            }
    
            self.TotalConfirmedShiftDateFilter = function (event,data) {
                self.flag('1');
                console.log(self.CustomConfirmedShiftDet())
                var validSec = self._checkValidationGroup("dateFilterTotalConfirmedShift");
                if (validSec) {
                    $("#customLoaderViewPopup").show();
                $.ajax({
                    url: BaseURL + "/jpCustomConfirmedShiftGet",
                    type: 'POST',
                    data: JSON.stringify({
                        clientId : sessionStorage.getItem("clientId"),
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
                    success: function (data) {
                        console.log(data)
                        self.confirmedShiftPost(data[0])
                        var data = JSON.parse(data[1]);
                        console.log(data)
                        $("#customLoaderViewPopup").hide();
                         for (var i = 0; i < data.length; i++) {
                            self.CustomConfirmedShiftDet.push({'no': i+1, 'shift_name' : data[i][1], 'shift_date': data[i][4],'start_time': data[i][5], 'end_time': data[i][6], 'status': data[i][15]  });
                    }
                }
                })  
                }
            }; 

            self.TotalConfirmedShiftDateFilterClear = function (event,data) {
               //alert(self.flag())
               console.log(self.CustomConfirmedShiftDet())
               var validSec = self._checkValidationGroup("dateFilterTotalConfirmedShift");
               if(validSec == false){
                self.CustomConfirmedShiftDet([])
               }
               if (validSec) {
                self.CustomConfirmedShiftDet([])
                $("#customLoaderViewPopup").show();
                $.ajax({
                    url: BaseURL + "/jpCustomConfirmedShiftGet",
                    type: 'POST',
                    data: JSON.stringify({
                        clientId : sessionStorage.getItem("clientId"),
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
                   success: function (data) {
                    console.log(data)
                    self.confirmedShiftPost(data[0])
                    var data = JSON.parse(data[1]);
                    console.log(data)
                    $("#customLoaderViewPopup").hide();
                     for (var i = 0; i < data.length; i++) {
                        self.CustomConfirmedShiftDet.push({'no': i+1, 'shift_name' : data[i][1], 'shift_date': data[i][4],'start_time': data[i][5], 'end_time': data[i][6], 'status': data[i][15]  });
                    }
                   }
               })  
               }
           }; 

           function getThisWeekCompletedShift(){
            $("#loaderViewPopup").show();
            $.ajax({
                url: BaseURL  + "/jpThisWeekTotalPostShiftGet",
                type: 'POST',
                data: JSON.stringify({
                    clientId : sessionStorage.getItem("clientId")
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
                    console.log(data)
                    self.totalShiftPost(data[0])
                    var data = JSON.parse(data[1]);
                    console.log(data)
                    $("#loaderPostShiftPopup").hide();
                     for (var i = 0; i < data.length; i++) {
                        self.PostShiftDet.push({'no': i+1, 'shift_name' : data[i][1], 'shift_date': data[i][4],'start_time': data[i][5], 'end_time': data[i][6], 'status': data[i][15]  });
                }
            }
            })
        }
        //self.dataProvider = new ArrayDataProvider(this.StaffDet, { keyAttributes: "id"});
        self.PostShiftData = new PagingDataProviderView(new ArrayDataProvider(self.PostShiftDet, {keyAttributes: 'id'}));   
        self.CustomPostShiftData = new PagingDataProviderView(new ArrayDataProvider(self.CustomPostShiftDet, {keyAttributes: 'id'}));   
        self.ConfirmedShiftData = new PagingDataProviderView(new ArrayDataProvider(self.ConfirmedShiftDet, {keyAttributes: 'id'}));   
        self.CustomConfirmedShiftData = new PagingDataProviderView(new ArrayDataProvider(self.CustomConfirmedShiftDet, {keyAttributes: 'id'}));   
        self.CompletedShiftData = new PagingDataProviderView(new ArrayDataProvider(self.CompletedShiftDet, {keyAttributes: 'id'}));   

        self.TotalStaffData = new PagingDataProviderView(new ArrayDataProvider(self.TotalStaffDet, {keyAttributes: 'id'}));   
        self.InactiveStaffData = new PagingDataProviderView(new ArrayDataProvider(self.InactiveStaffDet, {keyAttributes: 'id'}));   
        self.PendingStaffData = new PagingDataProviderView(new ArrayDataProvider(self.PendingStaffDet, {keyAttributes: 'id'}));   
        self.CustomTotalStaffData = new PagingDataProviderView(new ArrayDataProvider(self.CustomTotalStaffDet, {keyAttributes: 'id'}));   
              

        }
    }
    return  dasboardAdminfViewModel;
});