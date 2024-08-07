define(['ojs/ojcore',"knockout","jquery","appController","ojs/ojconverterutils-i18n", "ojs/ojarraydataprovider",'ojs/ojknockout-keyset', "ojs/ojresponsiveutils", "ojs/ojresponsiveknockoututils", "ojs/ojknockout", "ojs/ojlistitemlayout", "ojs/ojtrain",
        "ojs/ojlistview","ojs/ojradioset","ojs/ojlabelvalue","ojs/ojlabel" ,"ojs/ojselectcombobox","ojs/ojbutton" ,"ojs/ojprogress-bar", "ojs/ojdatetimepicker", 'ojs/ojtable', 'ojs/ojswitch', 'ojs/ojvalidationgroup','ojs/ojselector','ojs/ojtoolbar','ojs/ojfilepicker','ojs/ojcheckboxset', "ojs/ojavatar","ojs/ojdrawerlayout"], 
function (oj,ko,$, app, ojconverterutils_i18n_1, ArrayDataProvider,  ojknockout_keyset_1,ResponsiveUtils, ResponsiveKnockoutUtils, AsyncRegExpValidator) {

    class PrefferdStaffModel {
        constructor(context) {
                var self = this;
                self.DepName = context.routerState.detail.dep_url;
                self.startOpened = ko.observable(true);
                self.startToggle = () => self.startOpened(!self.startOpened());
                self.StaffDet = ko.observableArray([]);
                self.selectorSelectedItems = new ojknockout_keyset_1.ObservableKeySet();
                self.CancelBehaviorOpt = ko.observable('icon');
                self.ListAction = ko.observable('Active Staff');
                var BaseURL = sessionStorage.getItem("BaseURL")

                self.ClientDet = ko.observableArray([]);   
                self.client_name = ko.observable();
                self.job_role = ko.observable();
                self.jobRoleList = ko.observableArray([]);  
                self.groupValid = ko.observable();
                self.isChecked = ko.observable(false);
                self.filterClick = ko.observable('No');

                self.connected = function () {
                    if (sessionStorage.getItem("userName") == null) {
                        self.router.go({ path: 'signin' });
                    }
                    else {
                       app.onAppSuccess();
                       getPrefferdStaff();
                    }
                };

                //Validation 
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
            function getPrefferdStaff() {
                self.StaffDet([]);
                self.ClientDet([]);
                $.ajax({
                    url: BaseURL  + "/jpPrefferedStaffGet",
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
                        $("#loaderView").hide();
                        console.log(data)
                        var photo;
                         for (var i = 0; i < data[0].length; i++) {
                            if(data[0][i][14] == '') {
                                // self.profilePhoto(BaseURL + "/css/uploads/defaultUser.png")
                                photo = 'data:image/jpeg;base64,'+data[2][i];                 
                            }else {
                                // self.profilePhoto(BaseURL+"/"+data[0][15]); 
                                // console.log(self.profilePhoto())
                                photo ='data:image/jpeg;base64,'+data[2][i];                 
                            }
                            self.StaffDet.push({'id': data[0][i][0], 'title' : data[0][i][1], 'firstName' : data[0][i][2] , 'lastName' : data[0][i][3] , 'name' : data[0][i][2] + " " +data[0][i][3] ,  'mainPostion' :data[0][i][4] , 'subPostion' : data[0][i][5] , 
                              'workStatus' : data[0][i][6] , 'address1' : data[0][i][7] ,'address2' : data[0][i][8] ,'postTown' : data[0][i][9] , 'postCode' : data[0][i][10], 'contactEmail' : data[0][i][11] , 'contactNumber' : data[0][i][17] + " " + data[0][i][12], 'profilePhoto' : photo, 'transportation' : data[0][i][15] , 'visa_status' : data[0][i][16], 'preferred_staff' : data[0][i][17] });

                    }
                    for (var i = 0; i < data[1].length; i++) {
                        self.ClientDet.push({'value' : data[1][i][0], 'label' : data[1][i][1]});
                }
                    self.ListAction('Active Staffs')

                    self.StaffDet.valueHasMutated();
                    self.ClientDet.valueHasMutated();
                    return self; 
                }
                })
            }
            this.dataProvider1 = new ArrayDataProvider(this.StaffDet, { keyAttributes: "id"});
            self.ClientDetDP = new ArrayDataProvider(self.ClientDet, {keyAttributes: 'value'});

            self.clientJobRole = function (event,data) {
                if(event.detail.value!=undefined){
                    self.StaffDet([]);  
                }
                self.jobRoleList([])
                //alert(self.client_name())
               if(self.client_name() !=undefined){
               $.ajax({
                url: BaseURL + "/jpGetJobRole",
                type: 'POST',
                data: JSON.stringify({
                    clientId : self.client_name()
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
                    var myArray = data[0][2].split(",");
                    //console.log(myArray)
                    self.jobRoleList([])
                    for (var i = 0; i < myArray.length; i++) {
                       // console.log(self.jobRoleList())
                        self.jobRoleList.push({'value' : myArray[i], 'label' : myArray[i]});
                    }
                    self.jobRoleList.valueHasMutated();
                     return self;
            }
            }) 
            }
        }
            self.JobRoleDP = new ArrayDataProvider(self.jobRoleList, {keyAttributes: 'value'});
            
            self.staffJobRoleFilter = function (event,data) {
                self.filterClick('Yes')
                var validSec1 = self._checkValidationGroup("filterSec1");
                var validSec2 = self._checkValidationGroup("filterSec2");
                if (validSec1  && validSec2 ) {
                    self.StaffDet([]);
                $.ajax({
                    url: BaseURL  + "/jpFilterPrefferedStaffGet",
                    type: 'POST',
                    data: JSON.stringify({
                        clientId : self.client_name(),
                        jobRole : self.job_role()
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
                        var photo;
                         for (var i = 0; i < data[0].length; i++) {
                            if(data[0][i][14] == null) {
                                     photo = BaseURL  + "/css/uploads/defaultUser.png";
                            }else {
                                photo = data[0][i][14];
                            }
                            //if(data[0][i][18] == self.client_name()|| data[0][i][18] ==null){
                            self.StaffDet.push({'id': data[0][i][0], 'title' : data[0][i][1], 'firstName' : data[0][i][2] , 'lastName' : data[0][i][3] , 'name' : data[0][i][2] + " " +data[0][i][3] ,  'mainPostion' :data[0][i][4] , 'subPostion' : data[0][i][5] , 
                              'workStatus' : data[0][i][6] , 'address1' : data[0][i][7] ,'address2' : data[0][i][8] ,'postTown' : data[0][i][9] , 'postCode' : data[0][i][10], 'contactEmail' : data[0][i][11] , 'contactNumber' : data[0][i][12], 'profilePhoto' : photo, 'transportation' : data[0][i][15] , 'visa_status' : data[0][i][16], 'preferred_staff' : data[0][i][17], 'client_id' : data[0][i][18], 'staff_id' : data[0][i][19] });
                           // }
                    }
                    console.log(self.StaffDet())

                    let myObject = self.StaffDet()
                    let myArray = Object.entries(myObject);
                    console.log(myArray);
                   /*  let duplicateRows = [];
                    let staffIds = new Set();

                    for (let i = 0; i < myArray.length; i++) {
                        let row = myArray[i][1];
                        if (staffIds.has(row.staff_id)) {
                            duplicateRows.push([i, row]);
                        } else {
                            staffIds.add(row.staff_id);
                        }
                    }

                    console.log(duplicateRows); */
                    const duplicateRows = findDuplicateRows(myArray);
                    let filteredArray;
                    if (duplicateRows.length !== 0) {
                        for (let i = 0; i < duplicateRows.length; i++) {
                          console.log(duplicateRows[i]);
                          console.log(duplicateRows[i].client_id);
                          console.log(duplicateRows[i].staff_id);
                          myArray = myArray.filter(row => !(row[1].staff_id === duplicateRows[i].staff_id && row[1].client_id !== self.client_name()));
                          console.log(myArray);
                        }
                      
                    if(myArray.length !=0){
                    let obj = Object.fromEntries(myArray);
                    let newObj = {};
                    Object.keys(obj).forEach((key, index) => {
                      newObj[index] = obj[key];
                    });
                    
                    console.log(newObj);
                    const result = Object.values(newObj);
                    console.log(result);
                    //console.log(self.StaffDet());
                    self.StaffDet([]);
                    result.forEach(function(item) {
                        self.StaffDet.push(item);
                      });
                    //console.log(self.StaffDet());
                    }
              
                    console.log(self.StaffDet())

                    self.ListAction('Active Staffs')
                    self.StaffDet.valueHasMutated();
                    return self;  
            }
                }
                })
                }

            }
            this.dataProvider1 = new ArrayDataProvider(this.StaffDet, { keyAttributes: "id"});

            function findDuplicateRows(data) {
                let duplicateRows = [];
                let rowIds = new Set();
              
                for (let i = 0; i < data.length; i++) {
                  let row = data[i][1];
                  let rowId = row.id;
              
                  if (rowIds.has(rowId)) {
                    duplicateRows.push(row);
                  } else {
                    rowIds.add(rowId);
                  }
                }
              
                return duplicateRows;
              }

            self.addConfirmPreferredList = function (event,data) {
                var clickedRowId = data.data.id
                sessionStorage.setItem("staffId", clickedRowId);
                console.log(clickedRowId)
                if(clickedRowId !=undefined){
                    document.querySelector('#openAddPreferredListConfirm').open();
                }         
            }
            
            self.addStaffPreferrdList = function (event,data) {
                var clickedRowId = data.data.id
                document.querySelector('#openAddPreferredListConfirm').close();
                document.querySelector('#openAddPreferredListProgress').open();
                var BaseURL = sessionStorage.getItem("BaseURL")
                $.ajax({
                    url: BaseURL+ "/jpStaffAddPreferredList",
                    type: 'POST',
                    data: JSON.stringify({
                        staffId : clickedRowId,
                        clientId : self.client_name(),
                        jobRole : self.job_role()
                    }),
                    dataType: 'json',
                    timeout: sessionStorage.getItem("timeInetrval"),
                    context: self,
                    error: function (xhr, textStatus, errorThrown) {
                        if(textStatus == 'timeout'){
                            document.querySelector('#openAddPreferredListProgress').close();
                            document.querySelector('#Timeout').open();
                        }
                    },
                    success: function (data) {
                       console.log(data)
                       console.log("Success")
                       document.querySelector('#openAddPreferredListProgress').close();
                       filterList()
                       //location.reload();
                    }
                })  
    
            }

            self.removeConfirmPreferredList = function (event,data) {
                var clickedRowId = data.data.id
                sessionStorage.setItem("staffId", clickedRowId);
                console.log(clickedRowId)
                if(clickedRowId !=undefined){
                    document.querySelector('#openRemovePreferredListConfirm').open();
                }         
            }

            self.removeStaffPreferrdList = function (event,data) {
                var clickedRowId = data.data.id
                document.querySelector('#openRemovePreferredListConfirm').close();
                document.querySelector('#openRemovePreferredListProgress').open();
                var BaseURL = sessionStorage.getItem("BaseURL")
                $.ajax({
                    url: BaseURL+ "/jpStaffRemovePreferredList",
                    type: 'POST',
                    data: JSON.stringify({
                        staffId : clickedRowId,
                        clientId : self.client_name(),
                        jobRole : self.job_role()
                    }),
                    dataType: 'json',
                    timeout: sessionStorage.getItem("timeInetrval"),
                    context: self,
                    error: function (xhr, textStatus, errorThrown) {
                        if(textStatus == 'timeout'){
                            document.querySelector('#openRemovePreferredListProgress').close();
                            document.querySelector('#Timeout').open();
                        }
                    },
                    success: function (data) {
                       console.log(data)
                       document.querySelector('#openRemovePreferredListProgress').close();
                       filterList()
                       //location.reload();
                    }
                })  
    
            }

            function filterList() {
                self.filterClick('Yes')
                var validSec1 = self._checkValidationGroup("filterSec1");
                var validSec2 = self._checkValidationGroup("filterSec2");
                if (validSec1  && validSec2 ) {
                    self.StaffDet([]);
                $.ajax({
                    url: BaseURL  + "/jpFilterPrefferedStaffGet",
                    type: 'POST',
                    data: JSON.stringify({
                        clientId : self.client_name(),
                        jobRole : self.job_role()
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
                        var photo;
                         for (var i = 0; i < data[0].length; i++) {
                            if(data[0][i][14] == null) {
                                     photo = BaseURL  + "/css/uploads/defaultUser.png";
                            }else {
                                photo = data[0][i][14];
                            }
                           // if(data[0][i][18] == self.client_name()|| data[0][i][18] ==null){
                                self.StaffDet.push({'id': data[0][i][0], 'title' : data[0][i][1], 'firstName' : data[0][i][2] , 'lastName' : data[0][i][3] , 'name' : data[0][i][2] + " " +data[0][i][3] ,  'mainPostion' :data[0][i][4] , 'subPostion' : data[0][i][5] , 
                                  'workStatus' : data[0][i][6] , 'address1' : data[0][i][7] ,'address2' : data[0][i][8] ,'postTown' : data[0][i][9] , 'postCode' : data[0][i][10], 'contactEmail' : data[0][i][11] , 'contactNumber' : data[0][i][12], 'profilePhoto' : photo, 'transportation' : data[0][i][15] , 'visa_status' : data[0][i][16], 'preferred_staff' : data[0][i][17], 'client_id' : data[0][i][18], 'staff_id' : data[0][i][19] });
                           // }
                            }
                            console.log(self.StaffDet())

                            let myObject = self.StaffDet()
                            let myArray = Object.entries(myObject);
                            console.log(myArray);
                           /*  let duplicateRows = [];
                            let staffIds = new Set();
        
                            for (let i = 0; i < myArray.length; i++) {
                                let row = myArray[i][1];
                                if (staffIds.has(row.staff_id)) {
                                    duplicateRows.push([i, row]);
                                } else {
                                    staffIds.add(row.staff_id);
                                }
                            }
        
                            console.log(duplicateRows); */
                            const duplicateRows = findDuplicateRows(myArray);
                            if (duplicateRows.length !== 0) {
                                for (let i = 0; i < duplicateRows.length; i++) {
                                  console.log(duplicateRows[i]);
                                  console.log(duplicateRows[i].client_id);
                                  console.log(duplicateRows[i].staff_id);
                                  myArray = myArray.filter(row => !(row[1].staff_id === duplicateRows[i].staff_id && row[1].client_id !== self.client_name()));
                                  console.log(myArray);
                                }
                              
                            if(myArray.length !=0){
                            let obj = Object.fromEntries(myArray);
                            let newObj = {};
                            Object.keys(obj).forEach((key, index) => {
                              newObj[index] = obj[key];
                            });
                            
                            console.log(newObj);
                            const result = Object.values(newObj);
                            console.log(result);
                            //console.log(self.StaffDet());
                            self.StaffDet([]);
                            result.forEach(function(item) {
                                self.StaffDet.push(item);
                              });
                            //console.log(self.StaffDet());
                            }
                      
                            console.log(self.StaffDet())
        
                            self.ListAction('Active Staffs')
                            self.StaffDet.valueHasMutated();
                            return self;  
                    }  
        
                }
                })
                }

            }
            this.dataProvider1 = new ArrayDataProvider(this.StaffDet, { keyAttributes: "id"});

                
            }
            
            
          }
            return  PrefferdStaffModel;

        });
