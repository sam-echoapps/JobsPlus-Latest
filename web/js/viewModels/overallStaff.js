define(['ojs/ojcore',"knockout","jquery","appController","ojs/ojconverterutils-i18n", "ojs/ojarraydataprovider","ojs/ojpagingdataproviderview",'ojs/ojknockout-keyset', "ojs/ojresponsiveutils", "ojs/ojresponsiveknockoututils", "ojs/ojknockout", "ojs/ojlistitemlayout", "ojs/ojtrain",
        "ojs/ojlistview","ojs/ojradioset","ojs/ojlabelvalue","ojs/ojlabel" ,"ojs/ojselectcombobox","ojs/ojbutton" ,"ojs/ojprogress-bar", "ojs/ojdatetimepicker", 'ojs/ojtable', 'ojs/ojswitch', 'ojs/ojvalidationgroup','ojs/ojselector','ojs/ojtoolbar','ojs/ojfilepicker','ojs/ojcheckboxset', "ojs/ojavatar","ojs/ojactioncard","ojs/ojmenu","ojs/ojformlayout","ojs/ojpagingcontrol","ojs/ojchart"], 
function (oj,ko,$, app, ojconverterutils_i18n_1, ArrayDataProvider, PagingDataProviderView,  ojknockout_keyset_1,ResponsiveUtils, ResponsiveKnockoutUtils, AsyncRegExpValidator) {
    
    class overallStafffViewModel {
        constructor(context) {
            var self = this;
            var BaseURL = sessionStorage.getItem("BaseURL");
            self.allocatedShift = ko.observable('');
            self.totalShiftPost = ko.observable('');
            self.confirmedShiftPost = ko.observable('');
            self.completedShiftPost = ko.observable('');
            self.PostShiftDet = ko.observableArray([]);
            self.CustomPostShiftDet = ko.observableArray([]);
            self.customShiftCount = ko.observable('0');
            self.ConfirmedShiftDet = ko.observableArray([]);
            self.CustomConfirmedShiftDet = ko.observableArray([]);
            self.CompletedShiftDet = ko.observableArray([]);
            self.CustomCompletedShiftDet = ko.observableArray([]);
            self.customCompletedShiftPost = ko.observable(0);
            self.StaffShiftDet = ko.observableArray([]);
            self.AllocatedStaffDet = ko.observableArray([]);

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
            self.StaffReminderDet = ko.observableArray();
            self.blobReminder = ko.observable();
            self.fileNameReminder = ko.observable();
            self.currentDate = ko.observable();
            self.StaffWork= ko.observable('');
            self.StaffWorkHoursDet = ko.observableArray();
            self.StaffWorkFlag = ko.observable('0');


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

            self.menuItemAllocate = [
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


            self.name = ko.observable();
            self.jobRoleStaff = ko.observable();
            self.gender = ko.observable();
            self.profilePhoto = ko.observable();
            self.dbsNumber = ko.observable();
            self.dbsExpiryDate = ko.observable();  
            self.movingFile_expiry_date = ko.observable();
            self.safeguarding_expiry_date = ko.observable();
            self.health_expiry_date = ko.observable();
            self.food_expiry_date = ko.observable();
            self.support_expiry_date = ko.observable();  
            self.coshh_expiry_date = ko.observable();
            self.safety_expiry_date = ko.observable();
            self.behaviour_expiry_date = ko.observable();
            self.epilepsy_expiry_date = ko.observable();
            self.act_expiry_date = ko.observable();
            self.prevention_expiry_date = ko.observable();
            self.disability_expiry_date = ko.observable();
            self.care_expiry_date = ko.observable();

            var routerLength = context.parentRouter._routes.length;
            if(routerLength!=17){
                location.reload();
            }      

            self.connected = function () {
                if (sessionStorage.getItem("userName") == null) {
                    self.router.go({ path: 'signin' });
                }
                else {
                   app.onAppSuccess();
                   getClientNames()
                   self.username(sessionStorage.getItem("userName"));
                   self.fullname(sessionStorage.getItem("fullName"));
                   getStaffInfo();
                   getStaffFileReminder();  
                   getStaffWorkHours();  
                }
            };
            self.context = context;
            self.router = self.context.parentRouter;

            function getClientNames() {
                var currentDate = new Date();
                var year = currentDate.getFullYear();
                var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
                var day = currentDate.getDate().toString().padStart(2, '0');
                var formattedDate = year + "-" + month + "-" + day;
                console.log("Current Date:", formattedDate);
                
                var currentTime = new Date();
                var hours = currentTime.getHours().toString().padStart(2, '0');
                var minutes = currentTime.getMinutes().toString().padStart(2, '0');
                var seconds = currentTime.getSeconds().toString().padStart(2, '0');
                var formattedTime = hours + ":" + minutes + ":" + seconds;
                console.log("Formatted Time:", formattedTime);

                $.ajax({
                    url: BaseURL  + "/jpClientShiftGet",
                    type: 'POST',
                    data: JSON.stringify({
                        staffId : sessionStorage.getItem("staffId"),
                        currentDate : formattedDate,
                        currentTime : formattedTime
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
                    console.log(result)
                }
                })
            }

            function getStaffInfo() {
                $("#loaderPage").show();
                var currentDate = new Date();
                var year = currentDate.getFullYear();
                var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
                var day = currentDate.getDate().toString().padStart(2, '0');
                var formattedDate = year + "-" + month + "-" + day;
                console.log("Current Date:", formattedDate);
                
                var currentTime = new Date();
                var hours = currentTime.getHours().toString().padStart(2, '0');
                var minutes = currentTime.getMinutes().toString().padStart(2, '0');
                var seconds = currentTime.getSeconds().toString().padStart(2, '0');
                var formattedTime = hours + ":" + minutes + ":" + seconds;
                console.log("Formatted Time:", formattedTime);
                $.ajax({
                    url: BaseURL  + "/jpDashboardStaffShiftInfo",
                    type: 'POST',
                    data: JSON.stringify({
                        staffId : sessionStorage.getItem("staffId"),
                        currentDate : formattedDate,
                        currentTime : formattedTime
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
                        $("#loaderPage").hide();
                        console.log(data)
                        self.allocatedShift(data[0])
                        var dataAllocated = JSON.parse(data[1]);
                        for (var i = 0; i < dataAllocated.length; i++) {
                            self.AllocatedStaffDet.push({'no': i+1, 'client_name' : dataAllocated[i][3], 'shift_name' : dataAllocated[i][4], 'shift_date': dataAllocated[i][5],'start_time': dataAllocated[i][6], 'end_time': dataAllocated[i][7], 'status': dataAllocated[i][8]  });
                    }
                        self.totalShiftPost(data[2])
                        var dataPost = JSON.parse(data[3]);
                        console.log(dataPost)
                        $("#loaderPostShiftPopup").hide();
                         for (var i = 0; i < dataPost.length; i++) {
                            self.PostShiftDet.push({'no': i+1, 'client_name' : dataPost[i][3], 'shift_name' : dataPost[i][4], 'shift_date': dataPost[i][5],'start_time': dataPost[i][6], 'end_time': dataPost[i][7], 'status': dataPost[i][8]  });
                    }
                        self.confirmedShiftPost(data[4])
                        var dataConfirmed = JSON.parse(data[5]);
                        console.log(dataConfirmed)
                        $("#loaderPostShiftPopup").hide();
                         for (var i = 0; i < dataConfirmed.length; i++) {
                            self.ConfirmedShiftDet.push({'no': i+1, 'client_name' : dataConfirmed[i][3], 'shift_name' : dataConfirmed[i][4], 'shift_date': dataConfirmed[i][5],'start_time': dataConfirmed[i][6], 'end_time': dataConfirmed[i][7], 'status': dataConfirmed[i][8]  });
                    }
                        self.completedShiftPost(data[6])
                        var dataCompleted = JSON.parse(data[7]);
                        console.log(dataCompleted)
                        $("#loaderCompletedPopup").hide();
                         for (var i = 0; i < dataCompleted.length; i++) {
                            self.CompletedShiftDet.push({'no': i+1, 'client_name' : dataCompleted[i][3],'shift_name' : dataCompleted[i][4], 'shift_date': dataCompleted[i][5],'start_time': dataCompleted[i][6], 'end_time': dataCompleted[i][7], 'status': dataCompleted[i][8]  });
                    }
                    //     var data = JSON.parse(data[4]);
                    //     for (var i = 0; i < data.length; i++) {
                    //         self.StaffShiftDet.push({'no': i+1, 'staff_name' : data[i][1], 'shift_name' : data[i][2], 'shift_date': data[i][3],'start_time': data[i][4], 'end_time': data[i][5], 'status': data[i][6]  });
                    // }
                    }
                })
            }
            


            self.AllocatedStaffPopup = function (event) {
                //self.TotalStaffDet([]);
                //getAllocatedStaffList();
                let popup = document.getElementById("AllocatedStaffPopup");
                popup.open();
            }
        
            self.closeAllocatedStaffPopup = function (event) {
                self.TotalStaffDet([]);
                let popup = document.getElementById("AllocatedStaffPopup");
                popup.close();
                location.reload();
            }

            function getAllocatedStaffList(){
                $("#loaderViewPopup").show();
                $.ajax({
                    url: BaseURL  + "/jpDashboardAllocatedfStaffInfo",
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
                        $("#loaderViewPopup").hide();
                        console.log(data)
                        var data = JSON.parse(data[0]);
                        for (var i = 0; i < data.length; i++) {
                            self.AllocatedStaffDet.push({'no': i+1, 'staff_name' : data[i][1], 'shift_name' : data[i][2], 'shift_date': data[i][3],'start_time': data[i][4], 'end_time': data[i][5], 'status': data[i][6]  });
                    }
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
                        clientId : null
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
                self.ConfirmedShiftDet([]);
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


            self.menuItemAllocateSelect = function (event) {
                var target = event.target;
                var itemValue = target.value;
                console.log(itemValue)
                //getAllocatedStaffList();
                let popup = document.getElementById("AllocatedStaffPopup");
                popup.open();
                //self.AllocatedStaffDet([]);
            }

            self.confirmedShiftPopup = function (event) {
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
                        clientId : null
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
                    let popup = document.getElementById("completedShiftPopup");
                    popup.open();
                }
                if(itemValue == 'this-month'){
                    getThisMonthCompletedShift();
                    let popup = document.getElementById("completedShiftPopup");
                    popup.open();
                }
                if(itemValue == 'last-week'){
                    getLastWeekCompletedShift();
                    let popup = document.getElementById("completedShiftPopup");
                    popup.open();
                }
                if(itemValue == 'last-month'){
                    getLastMonthCompletedShift();
                    let popup = document.getElementById("completedShiftPopup");
                    popup.open();
                }
                if(itemValue == 'custom'){
                    //getTotalStaffList();
                    let popup = document.getElementById("customCompletedShiftPopup");
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
                    url: BaseURL + "/jpCustomTotalPostStaffShiftGet",
                    type: 'POST',
                    data: JSON.stringify({
                        staffId : sessionStorage.getItem("staffId"),
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
                        var dataPost = JSON.parse(data[1]);
                        console.log(dataPost)
                        $("#customLoaderViewPopup").hide();
                         for (var i = 0; i < dataPost.length; i++) {
                            self.CustomPostShiftDet.push({'no': i+1, 'client_name' : dataPost[i][3], 'shift_name' : dataPost[i][4], 'shift_date': dataPost[i][5],'start_time': dataPost[i][6], 'end_time': dataPost[i][7], 'status': dataPost[i][8]  });
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
                    url: BaseURL + "/jpCustomTotalPostStaffShiftGet",
                    type: 'POST',
                    data: JSON.stringify({
                        staffId : sessionStorage.getItem("staffId"),
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
                    var dataPost = JSON.parse(data[1]);
                    console.log(dataPost)
                    $("#customLoaderViewPopup").hide();
                     for (var i = 0; i < dataPost.length; i++) {
                        self.CustomPostShiftDet.push({'no': i+1, 'client_name' : dataPost[i][3], 'shift_name' : dataPost[i][4], 'shift_date': dataPost[i][5],'start_time': dataPost[i][6], 'end_time': dataPost[i][7], 'status': dataPost[i][8]  });
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
                    url: BaseURL  + "/jpThisWeekTotalPostStaffShiftGet",
                    type: 'POST',
                    data: JSON.stringify({
                        staffId : sessionStorage.getItem("staffId"),
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
                        var dataPost = JSON.parse(data[1]);
                        console.log(dataPost)
                        $("#loaderPostShiftPopup").hide();
                         for (var i = 0; i < dataPost.length; i++) {
                            self.PostShiftDet.push({'no': i+1, 'client_name' : dataPost[i][3], 'shift_name' : dataPost[i][4], 'shift_date': dataPost[i][5],'start_time': dataPost[i][6], 'end_time': dataPost[i][7], 'status': dataPost[i][8]  });
                    }
                }
                })
            }

            function getThisMonthTotalPostShift(){
                $("#loaderViewPopup").show();
                $.ajax({
                    url: BaseURL  + "/jpThisMonthTotalPostStaffShiftGet",
                    type: 'POST',
                    data: JSON.stringify({
                        staffId : sessionStorage.getItem("staffId"),
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
                        var dataPost = JSON.parse(data[1]);
                        console.log(dataPost)
                        $("#loaderPostShiftPopup").hide();
                         for (var i = 0; i < dataPost.length; i++) {
                            self.PostShiftDet.push({'no': i+1, 'client_name' : dataPost[i][3], 'shift_name' : dataPost[i][4], 'shift_date': dataPost[i][5],'start_time': dataPost[i][6], 'end_time': dataPost[i][7], 'status': dataPost[i][8]  });
                    }
                }
                })
            }

            function getLastWeekTotalPostShift(){
                $("#loaderViewPopup").show();
                $.ajax({
                    url: BaseURL  + "/jpLastWeekTotalPostStaffShiftGet",
                    type: 'POST',
                    data: JSON.stringify({
                        staffId : sessionStorage.getItem("staffId"),
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
                        var dataPost = JSON.parse(data[1]);
                        console.log(dataPost)
                        $("#loaderPostShiftPopup").hide();
                         for (var i = 0; i < dataPost.length; i++) {
                            self.PostShiftDet.push({'no': i+1, 'client_name' : dataPost[i][3], 'shift_name' : dataPost[i][4], 'shift_date': dataPost[i][5],'start_time': dataPost[i][6], 'end_time': dataPost[i][7], 'status': dataPost[i][8]  });
                    }
                }
                })
            }

            function getLastMonthTotalPostShift(){
                $("#loaderViewPopup").show();
                $.ajax({
                    url: BaseURL  + "/jpLastMonthTotalPostStaffShiftGet",
                    type: 'POST',
                    data: JSON.stringify({
                        staffId : sessionStorage.getItem("staffId"),
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
                        var dataPost = JSON.parse(data[1]);
                        console.log(dataPost)
                        $("#loaderPostShiftPopup").hide();
                         for (var i = 0; i < dataPost.length; i++) {
                            self.PostShiftDet.push({'no': i+1, 'client_name' : dataPost[i][3], 'shift_name' : dataPost[i][4], 'shift_date': dataPost[i][5],'start_time': dataPost[i][6], 'end_time': dataPost[i][7], 'status': dataPost[i][8]  });
                    }
                }
                })
            }

            function getThisWeekConfirmedPostShift(){
                $("#loaderConfirmedPopup").show();
                $.ajax({
                    url: BaseURL  + "/jpThisWeekConfirmedStaffShiftGet",
                    type: 'POST',
                    data: JSON.stringify({
                        staffId : sessionStorage.getItem("staffId"),
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
                        var dataConfirmed = JSON.parse(data[1]);
                        console.log(dataConfirmed)
                        $("#loaderConfirmedPopup").hide();
                         for (var i = 0; i < dataConfirmed.length; i++) {
                            self.ConfirmedShiftDet.push({'no': i+1, 'client_name' : dataConfirmed[i][3], 'shift_name' : dataConfirmed[i][4], 'shift_date': dataConfirmed[i][5],'start_time': dataConfirmed[i][6], 'end_time': dataConfirmed[i][7], 'status': dataConfirmed[i][8]  });
                    }
                }
                })
            }

            function getThisMonthConfirmedPostShift(){
                $("#loaderConfirmedPopup").show();
                $.ajax({
                    url: BaseURL  + "/jpThisMonthConfirmedStaffShiftGet",
                    type: 'POST',
                    data: JSON.stringify({
                        staffId : sessionStorage.getItem("staffId"),
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
                        var dataConfirmed = JSON.parse(data[1]);
                        console.log(dataConfirmed)
                        $("#loaderConfirmedPopup").hide();
                         for (var i = 0; i < dataConfirmed.length; i++) {
                            self.ConfirmedShiftDet.push({'no': i+1, 'client_name' : dataConfirmed[i][3], 'shift_name' : dataConfirmed[i][4], 'shift_date': dataConfirmed[i][5],'start_time': dataConfirmed[i][6], 'end_time': dataConfirmed[i][7], 'status': dataConfirmed[i][8]  });
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
                    url: BaseURL + "/jpCustomConfirmedStaffShiftGet",
                    type: 'POST',
                    data: JSON.stringify({
                        staffId : sessionStorage.getItem("staffId"),
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
                        var dataConfirmed = JSON.parse(data[1]);
                        console.log(dataConfirmed)
                        $("#customLoaderViewPopup").hide();
                         for (var i = 0; i < dataConfirmed.length; i++) {
                            self.CustomConfirmedShiftDet.push({'no': i+1, 'client_name' : dataConfirmed[i][3], 'shift_name' : dataConfirmed[i][4], 'shift_date': dataConfirmed[i][5],'start_time': dataConfirmed[i][6], 'end_time': dataConfirmed[i][7], 'status': dataConfirmed[i][8]  });
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
                    url: BaseURL + "/jpCustomConfirmedStaffShiftGet",
                    type: 'POST',
                    data: JSON.stringify({
                        staffId : sessionStorage.getItem("staffId"),
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
                    var dataConfirmed = JSON.parse(data[1]);
                    console.log(dataConfirmed)
                    $("#customLoaderViewPopup").hide();
                     for (var i = 0; i < dataConfirmed.length; i++) {
                        self.CustomConfirmedShiftDet.push({'no': i+1, 'client_name' : dataConfirmed[i][3], 'shift_name' : dataConfirmed[i][4], 'shift_date': dataConfirmed[i][5],'start_time': dataConfirmed[i][6], 'end_time': dataConfirmed[i][7], 'status': dataConfirmed[i][8]  });
                    }
                   }
               })  
               }
           }; 

           self.completedShiftPopup = function (event) {
            //self.InactiveStaffDet([]);
            getCompletedShiftList();
            let popup = document.getElementById("completedShiftPopup");
            popup.open();
        }

        function getCompletedShiftList(){
            $("#loaderCompletedPopup").show();
            $.ajax({
                url: BaseURL  + "/jpCompletedShiftDashboardGet",
                type: 'POST',
                data: JSON.stringify({
                    clientId : null
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
                    $("#loaderCompletedPopup").hide();
                     for (var i = 0; i < data.length; i++) {
                        self.CompletedShiftDet.push({'no': i+1, 'shift_name' : data[i][1], 'shift_date': data[i][4],'start_time': data[i][5], 'end_time': data[i][6], 'status': data[i][15]  });
                }
            }
            })
        }

           function getThisWeekCompletedShift(){
            $("#loaderCompletedPopup").show();
            $.ajax({
                url: BaseURL  + "/jpThisWeekCompletedStaffShiftGet",
                type: 'POST',
                data: JSON.stringify({
                    staffId : sessionStorage.getItem("staffId"),
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
                    self.completedShiftPost(data[0])
                    var dataCompleted = JSON.parse(data[1]);
                    console.log(dataCompleted)
                    $("#loaderCompletedPopup").hide();
                     for (var i = 0; i < dataCompleted.length; i++) {
                        self.CompletedShiftDet.push({'no': i+1, 'client_name' : dataCompleted[i][3], 'shift_name' : dataCompleted[i][4], 'shift_date': dataCompleted[i][5],'start_time': dataCompleted[i][6], 'end_time': dataCompleted[i][7], 'status': dataCompleted[i][8]  });
                }
            }
            })
        }

        function getThisMonthCompletedShift(){
            $("#loaderCompletedPopup").show();
            $.ajax({
                url: BaseURL  + "/jpThisMonthCompletedStaffShiftGet",
                type: 'POST',
                data: JSON.stringify({
                    staffId : sessionStorage.getItem("staffId"),
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
                    self.completedShiftPost(data[0])
                    var dataCompleted = JSON.parse(data[1]);
                    console.log(dataCompleted)
                    $("#loaderCompletedPopup").hide();
                     for (var i = 0; i < dataCompleted.length; i++) {
                        self.CompletedShiftDet.push({'no': i+1, 'client_name' : dataCompleted[i][3], 'shift_name' : dataCompleted[i][4], 'shift_date': dataCompleted[i][5],'start_time': dataCompleted[i][6], 'end_time': dataCompleted[i][7], 'status': dataCompleted[i][8]  });
                }
            }
            })
        }

        function getLastWeekCompletedShift(){
            $("#loaderCompletedPopup").show();
            $.ajax({
                url: BaseURL  + "/jpLastWeekCompletedStaffShiftGet",
                type: 'POST',
                data: JSON.stringify({
                    staffId : sessionStorage.getItem("staffId"),
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
                    self.completedShiftPost(data[0])
                    var dataCompleted = JSON.parse(data[1]);
                    console.log(dataCompleted)
                    $("#loaderCompletedPopup").hide();
                     for (var i = 0; i < dataCompleted.length; i++) {
                        self.CompletedShiftDet.push({'no': i+1, 'client_name' : dataCompleted[i][3], 'shift_name' : dataCompleted[i][4], 'shift_date': dataCompleted[i][5],'start_time': dataCompleted[i][6], 'end_time': dataCompleted[i][7], 'status': dataCompleted[i][8]  });
                }
            }
            })
        }

        function getLastMonthCompletedShift(){
            $("#loaderCompletedPopup").show();
            $.ajax({
                url: BaseURL  + "/jpLastMonthCompletedStaffShiftGet",
                type: 'POST',
                data: JSON.stringify({
                    staffId : sessionStorage.getItem("staffId"),
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
                    self.completedShiftPost(data[0])
                    var dataCompleted = JSON.parse(data[1]);
                    console.log(dataCompleted)
                    $("#loaderCompletedPopup").hide();
                     for (var i = 0; i < dataCompleted.length; i++) {
                        self.CompletedShiftDet.push({'no': i+1, 'client_name' : dataCompleted[i][3], 'shift_name' : dataCompleted[i][4], 'shift_date': dataCompleted[i][5],'start_time': dataCompleted[i][6], 'end_time': dataCompleted[i][7], 'status': dataCompleted[i][8]  });
                }
            }
            })
        }

        self.TotalCompletedShiftDateFilter = function (event,data) {
            self.flag('1');
            console.log(self.CustomCompletedShiftDet())
            var validSec = self._checkValidationGroup("dateFilterTotalCompletedShift");
            if (validSec) {
                $("#customLoaderViewPopup").show();
            $.ajax({
                url: BaseURL + "/jpCustomCompletedStaffShiftGet",
                type: 'POST',
                data: JSON.stringify({
                    staffId : sessionStorage.getItem("staffId"),
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
                    self.customCompletedShiftPost(data[0])
                    var dataCompleted = JSON.parse(data[1]);
                    console.log(dataCompleted)
                    $("#customLoaderViewPopup").hide();
                     for (var i = 0; i < dataCompleted.length; i++) {
                        self.CustomCompletedShiftDet.push({'no': i+1, 'client_name' : dataCompleted[i][3], 'shift_name' : dataCompleted[i][4], 'shift_date': dataCompleted[i][5],'start_time': dataCompleted[i][6], 'end_time': dataCompleted[i][7], 'status': dataCompleted[i][8]  });
                }
            }
            })  
            }
        }; 

        self.TotalCompletedShiftDateFilterClear = function (event,data) {
           //alert(self.flag())
           console.log(self.CustomCompletedShiftDet())
           var validSec = self._checkValidationGroup("dateFilterTotalCompletedShift");
           if(validSec == false){
            self.CustomCompletedShiftDet([])
           }
           if (validSec) {
            self.CustomCompletedShiftDet([])
            $("#customLoaderViewPopup").show();
            $.ajax({
                url: BaseURL + "/jpCustomCompletedStaffShiftGet",
                type: 'POST',
                data: JSON.stringify({
                    staffId : sessionStorage.getItem("staffId"),
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
                self.customCompletedShiftPost(data[0])
                var dataCompleted = JSON.parse(data[1]);
                console.log(dataCompleted)
                $("#customLoaderViewPopup").hide();
                 for (var i = 0; i < dataCompleted.length; i++) {
                    self.CustomCompletedShiftDet.push({'no': i+1, 'client_name' : dataCompleted[i][3], 'shift_name' : dataCompleted[i][4], 'shift_date': dataCompleted[i][5],'start_time': dataCompleted[i][6], 'end_time': dataCompleted[i][7], 'status': dataCompleted[i][8]  });
                }
               }
           })  
           }
       }; 

       self.StaffShiftDateFilter = function (event,data) {
        self.flag('1');
        console.log(self.StaffShiftDet())
        var validSec = self._checkValidationGroup("dateFilterStaffShift");
        if (validSec) {
            $("#loaderStaffShift").show();
        $.ajax({
            url: BaseURL + "/jpStaffShiftDateFilter",
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
                $("#loaderStaffShift").hide();
                     var data = JSON.parse(data[0]);
                        for (var i = 0; i < data.length; i++) {
                            self.StaffShiftDet.push({'no': i+1, 'staff_name' : data[i][1], 'shift_name' : data[i][2], 'shift_date': data[i][3],'start_time': data[i][4], 'end_time': data[i][5], 'status': data[i][6]  });
                    }
           
            }
        })  
        }
    }; 

    self.StaffShiftDateFilterClear = function (event,data) {
        console.log(self.StaffShiftDet())
        var validSec = self._checkValidationGroup("dateFilterStaffShift");
        if(validSec == false){
         self.StaffShiftDet([])
        }
        if (validSec) {
         self.StaffShiftDet([])
         $("#loaderStaffShift").show();
        $.ajax({
            url: BaseURL + "/jpStaffShiftDateFilter",
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
                self.StaffShiftDet([])
                $("#loaderStaffShift").hide();
                     var data = JSON.parse(data[0]);
                        for (var i = 0; i < data.length; i++) {
                            self.StaffShiftDet.push({'no': i+1, 'staff_name' : data[i][1], 'shift_name' : data[i][2], 'shift_date': data[i][3],'start_time': data[i][4], 'end_time': data[i][5], 'status': data[i][6]  });
                    }
           
            }
        })  
        }
    }; 

    self.downloadReminder = ()=>{
        if(self.blobReminder() != undefined && self.fileNameReminder() != undefined){
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                // For Internet Explorer
                window.navigator.msSaveOrOpenBlob(self.blobReminder(), self.fileNameReminder());
            } else {
                // For modern browsers
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(self.blobReminder());
                link.download = self.fileNameReminder();
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    function getStaffFileReminder() {
        $("#ReminderView").hide();
       // $("#loaderView").show();
       
       /*Chart Properties*/
    
       $.ajax({
           url: BaseURL + "/jpStaffDashboardStaffFileReminder",
           type: 'POST',
           data: JSON.stringify({
                staffId : sessionStorage.getItem("staffId")
            }),
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
                const currentDate = new Date();
    
                const year = currentDate.getFullYear();
                const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-indexed
                const day = String(currentDate.getDate()).padStart(2, '0');
    
                const formattedDate = `${year}-${month}-${day}`;
                console.log(formattedDate);
                self.currentDate(formattedDate)
                var csvContent = '';
                var headers = ['SL.No', 'Staff Name', 'Email', 'Contact', 'File Type', 'Job Role', 'Expiry Date', 'File Name'];
                csvContent += headers.join(',') + '\n';
                var checkDate;
                for (var i = 0; i < StaffReminder.length; i++) {
                    if(StaffReminder[i][8] >= self.currentDate()){
                        checkDate = 'Yes';
                    }else{
                        checkDate = 'No';
                    }
                    self.StaffReminderDet.push({'no': i+1,'id': StaffReminder[i][0],'name' : StaffReminder[i][2] + " " + StaffReminder[i][3], 'email': StaffReminder[i][5],'contact': StaffReminder[i][6],'role': StaffReminder[i][4],'file_type': StaffReminder[i][7],'expiry_date': StaffReminder[i][8],'file_name': StaffReminder[i][9], 'check_date': checkDate  });
                    var rowData = [i+1, StaffReminder[i][2] + " " + StaffReminder[i][3], StaffReminder[i][5], StaffReminder[i][6], StaffReminder[i][4], StaffReminder[i][7], StaffReminder[i][8], StaffReminder[i][9]];
                    csvContent += rowData.join(',') + '\n';
            }
            var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            var today = new Date();
            var fileName = 'Staff_File_Expiry_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
            self.blobReminder(blob);
            self.fileNameReminder(fileName);
       }
       })
    }

    function getStaffWorkHours() {
        //$("#workView").hide();
       // $("#loaderView").show();
       
       /*Chart Properties*/

       $.ajax({
           url: BaseURL + "/jpStaffDashboardTotalStaffWorkHoursGet",
           type: 'POST',
           data: JSON.stringify({
                staffId : sessionStorage.getItem("staffId")
            }),
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
                // var csvContent = '';
                // var headers = ['SL.No', 'Staff Name', 'Job Role','Total hours'];
                // csvContent += headers.join(',') + '\n';
                for (var i = 0; i < dataStaffHours.length; i++) {
                    self.StaffWorkHoursDet.push({'no': i+1, 'client_name': dataStaffHours[i][0], 'total_hours': dataStaffHours[i][1]  });
                    // var rowData = [i+1, dataStaffHours[i][0] + " " + dataStaffHours[i][1], dataStaffHours[i][2], dataStaffHours[i][3]];
                    // csvContent += rowData.join(',') + '\n';
            }
            // var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            // var today = new Date();
            // var fileName = 'Staff_Work_Total_' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.csv';
            // self.blob(blob);
            // self.fileName(fileName);
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
        url: BaseURL + "/jpStaffDashboardThisWeekStaffWorkHoursGet",
        type: 'POST',
        data: JSON.stringify({
            staffId : sessionStorage.getItem("staffId")
        }),
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
                for (var i = 0; i < dataStaffHours.length; i++) {
                    self.StaffWorkHoursDet.push({'no': i+1, 'client_name': dataStaffHours[i][0], 'total_hours': dataStaffHours[i][1]  });
            }
    }
    })
}     

function getThisMonthStaffWorkInfo() {
    $("#workView").hide();
// $("#loaderView").show();

/*Chart Properties*/

$.ajax({
    url: BaseURL + "/jpStaffDashboardThisMonthStaffWorkHoursGet",
    type: 'POST',
    data: JSON.stringify({
        staffId : sessionStorage.getItem("staffId")
    }),
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
            for (var i = 0; i < dataStaffHours.length; i++) {
                self.StaffWorkHoursDet.push({'no': i+1, 'client_name': dataStaffHours[i][0], 'total_hours': dataStaffHours[i][1]  });
            }
}
})
}

        function getLastWeekStaffWorkInfo() {
            $("#workView").hide();
        // $("#loaderView").show();
        
        /*Chart Properties*/

        $.ajax({
            url: BaseURL + "/jpStaffDashboardLastWeekStaffWorkHoursGet",
            type: 'POST',
            data: JSON.stringify({
                staffId : sessionStorage.getItem("staffId")
            }),
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
                    for (var i = 0; i < dataStaffHours.length; i++) {
                        self.StaffWorkHoursDet.push({'no': i+1, 'client_name': dataStaffHours[i][0], 'total_hours': dataStaffHours[i][1]  });
                    }
        }
        })
    }


    function getLastMonthStaffWorkInfo() {
        $("#workView").hide();
    // $("#loaderView").show();
    
    /*Chart Properties*/

    $.ajax({
        url: BaseURL + "/jpStaffDashboardLastMonthStaffWorkHoursGet",
        type: 'POST',
        data: JSON.stringify({
            staffId : sessionStorage.getItem("staffId")
        }),
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
                for (var i = 0; i < dataStaffHours.length; i++) {
                    self.StaffWorkHoursDet.push({'no': i+1, 'client_name': dataStaffHours[i][0], 'total_hours': dataStaffHours[i][1]  });
            }
    }
    })
}

self.getStaffWorkFilterInfo = function (event,data) {
    self.StaffWorkFlag('1');
    console.log(self.CustomTotalStaffDet())
    var validSec = self._checkValidationGroup("dateFilterStaffWorkHour");
    if (validSec) {
        $("#customLoaderViewPopup").show();
    $.ajax({
        url: BaseURL + "/jpStaffDashboardStaffWorkHoursGetFilter",
        type: 'POST',
        data: JSON.stringify({
            staffId : sessionStorage.getItem("staffId"),
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
                for (var i = 0; i < dataStaffHoursFilter.length; i++) {
                    self.StaffWorkHoursDet.push({'no': i+1, 'client_name': dataStaffHoursFilter[i][0], 'total_hours': dataStaffHoursFilter[i][1]  });
            }
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
       url: BaseURL + "/jpStaffDashboardStaffWorkHoursGetFilter",
       type: 'POST',
       data: JSON.stringify({
           staffId : sessionStorage.getItem("staffId"),
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
                for (var i = 0; i < dataStaffHoursFilter.length; i++) {
                    self.StaffWorkHoursDet.push({'no': i+1, 'client_name': dataStaffHoursFilter[i][0], 'total_hours': dataStaffHoursFilter[i][1]  });
            }
       }
   })  
   }
}; 


self.profileView = function (event,data) {
    var clickedRowId = sessionStorage.getItem("staffId")
    console.log(clickedRowId)
    document.querySelector('#openUserProfileInfo').open();
    var BaseURL = sessionStorage.getItem("BaseURL")
    $.ajax({
        url: BaseURL+ "/jpStaffProfileInfoGet",
        type: 'POST',
        data: JSON.stringify({
            rowId : clickedRowId,
        }),
        dataType: 'json',
        timeout: sessionStorage.getItem("timeInetrval"),
        context: self,
        error: function (xhr, textStatus, errorThrown) {
            if(textStatus == 'timeout'){
                document.querySelector('#openUserProfileInfo').close();
                document.querySelector('#Timeout').open();
            }
        },
        success: function (result) {
          console.log(result)
           data = JSON.parse(result[0]);
           console.log(data)
           var data1 = JSON.parse(result[1]);
           if(data1 == null){
               self.movingFile_expiry_date('N/A')
           }else{
               self.movingFile_expiry_date(data1)
           }
           var data2 = JSON.parse(result[2]);
           if(data2 == null){
               self.safeguarding_expiry_date('N/A')
           }else{
               self.safeguarding_expiry_date(data2)
           }
           var data3 = JSON.parse(result[3]);
           if(data3 == null){
               self.health_expiry_date('N/A')
           }else{
               self.health_expiry_date(data3)
           }
           var data4 = JSON.parse(result[4]);
           if(data4 == null){
               self.food_expiry_date('N/A')
           }else{
               self.food_expiry_date(data4)
           }
           var data5 = JSON.parse(result[5]);
           if(data5 == null){
               self.support_expiry_date('N/A')
           }else{
               self.support_expiry_date(data5)
           }
           var data6 = JSON.parse(result[6]);
           if(data6 == null){
               self.coshh_expiry_date('N/A')
           }else{
               self.coshh_expiry_date(data6)
           }
           var data7 = JSON.parse(result[7]);
           if(data7 == null){
               self.safety_expiry_date('N/A')
           }else{
               self.safety_expiry_date(data7)
           }
           var data8 = JSON.parse(result[8]);
           if(data8 == null){
               self.behaviour_expiry_date('N/A')
           }else{
               self.behaviour_expiry_date(data8)
           }
           var data9 = JSON.parse(result[9]);
           if(data9 == null){
               self.epilepsy_expiry_date('N/A')
           }else{
               self.epilepsy_expiry_date(data9)
           }
           var data10 = JSON.parse(result[10]);
           if(data10 == null){
               self.act_expiry_date('N/A')
           }else{
               self.act_expiry_date(data10)
           }
           var data11 = JSON.parse(result[11]);
           if(data11 == null){
               self.prevention_expiry_date('N/A')
           }else{
               self.prevention_expiry_date(data11)
           }
           var data12 = JSON.parse(result[12]);
           if(data12 == null){
               self.disability_expiry_date('N/A')
           }else{
               self.disability_expiry_date(data12)
           }
           var data13 = JSON.parse(result[13]);
           if(data13 == null){
               self.care_expiry_date('N/A')
           }else{
               self.care_expiry_date(data13)
           }
           self.name(data[0] + " " + data[1] + " " + data[2])
           self.jobRoleStaff(data[3])
           self.gender(data[4])
           console.log(result[14])
           var container = document.getElementById("pic-print");
           var imgElement = document.createElement("img");
           imgElement.src = 'data:image/jpeg;base64,' + result[14];
           imgElement.width = 80; // Remove the quotes
           imgElement.height = 80; // Remove the quotes
           container.appendChild(imgElement);
           self.profilePhoto('data:image/jpeg;base64,'+result[14])
           if(data[6] == null){
           self.dbsNumber('N/A')
           }else{
               self.dbsNumber(data[6])
           }
           if(data[7] == null){
               self.dbsExpiryDate('N/A')
               }else{
                   self.dbsExpiryDate(data[7])
               }
        }
    })  

}

self.downloadProfile = function (event,data) {
    //document.title = "Print page title";
    var printContents = document.getElementById('DownloadProfile').innerHTML;
    document.body.innerHTML = "<html><head><title></title></head><body>" + printContents + "</body>";
    window.print(); 

    location.reload()
}
        


        //self.dataProvider = new ArrayDataProvider(this.StaffDet, { keyAttributes: "id"});
        self.PostShiftData = new PagingDataProviderView(new ArrayDataProvider(self.PostShiftDet, {keyAttributes: 'id'}));   
        self.CustomPostShiftData = new PagingDataProviderView(new ArrayDataProvider(self.CustomPostShiftDet, {keyAttributes: 'id'}));   
        self.ConfirmedShiftData = new PagingDataProviderView(new ArrayDataProvider(self.ConfirmedShiftDet, {keyAttributes: 'id'}));   
        self.CustomConfirmedShiftData = new PagingDataProviderView(new ArrayDataProvider(self.CustomConfirmedShiftDet, {keyAttributes: 'id'}));   
        self.CompletedShiftData = new PagingDataProviderView(new ArrayDataProvider(self.CompletedShiftDet, {keyAttributes: 'id'}));   
        self.CustomCompletedShiftData = new PagingDataProviderView(new ArrayDataProvider(self.CustomCompletedShiftDet, {keyAttributes: 'id'}));   
        self.StaffShiftData = new PagingDataProviderView(new ArrayDataProvider(self.StaffShiftDet, {keyAttributes: 'id'}));   
        self.AllocatedStaffData = new PagingDataProviderView(new ArrayDataProvider(self.AllocatedStaffDet, {keyAttributes: 'id'}));   

        self.TotalStaffData = new PagingDataProviderView(new ArrayDataProvider(self.TotalStaffDet, {keyAttributes: 'id'}));   
        self.InactiveStaffData = new PagingDataProviderView(new ArrayDataProvider(self.InactiveStaffDet, {keyAttributes: 'id'}));   
        self.PendingStaffData = new PagingDataProviderView(new ArrayDataProvider(self.PendingStaffDet, {keyAttributes: 'id'}));   
        self.CustomTotalStaffData = new PagingDataProviderView(new ArrayDataProvider(self.CustomTotalStaffDet, {keyAttributes: 'id'}));   
        self.StaffReminderData = new PagingDataProviderView(new ArrayDataProvider(self.StaffReminderDet, {keyAttributes: 'id'}));       
        self.StaffWorkHoursData = new PagingDataProviderView(new ArrayDataProvider(self.StaffWorkHoursDet, {keyAttributes: 'id'}));       


        }
    }
    return  overallStafffViewModel;
});