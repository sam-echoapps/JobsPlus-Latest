define(['ojs/ojcore',"knockout","jquery","appController","ojs/ojconverterutils-i18n", "ojs/ojarraydataprovider",'ojs/ojknockout-keyset', "ojs/ojresponsiveutils", "ojs/ojresponsiveknockoututils", "ojs/ojknockout", "ojs/ojlistitemlayout", "ojs/ojtrain",
        "ojs/ojlistview","ojs/ojradioset","ojs/ojlabelvalue","ojs/ojlabel" ,"ojs/ojselectcombobox","ojs/ojbutton" ,"ojs/ojprogress-bar", "ojs/ojdatetimepicker", 'ojs/ojtable', 'ojs/ojswitch', 'ojs/ojvalidationgroup','ojs/ojselector','ojs/ojtoolbar','ojs/ojfilepicker','ojs/ojcheckboxset', "ojs/ojavatar","ojs/ojactioncard","ojs/ojmenu","ojs/ojformlayout"], 
function (oj,ko,$, app, ojconverterutils_i18n_1, ArrayDataProvider,  ojknockout_keyset_1,ResponsiveUtils, ResponsiveKnockoutUtils, AsyncRegExpValidator) {
    
    class dasboardAdminfViewModel {
        constructor(context) {
            var self = this;
            var BaseURL = sessionStorage.getItem("BaseURL");
            self.totalStaff = ko.observable('');
            self.activeStaff = ko.observable('');
            self.inactiveStaff = ko.observable('');

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
            self.connected = function () {
                if (sessionStorage.getItem("userName") == null) {
                    self.router.go({ path: 'signin' });
                }
                else {
                   app.onAppSuccess();
                   getTotalStaff();

                //    document.getElementById('oj-menu--1409012963-3').addEventListener('ojAction', function(event) {
                //     var target = event.target;
                //     var itemValue = target.value;
                
                //     // Handle the click event based on the value of the selected menu item
                //     console.log('Clicked on menu item with value: ' + itemValue);
                // });
                

                   /* document.getElementById('menu-item-list').addEventListener('ojAction', function(event) {
                   alert("jhj")
                }); */
                }
            };

            function getTotalStaff() {
                document.getElementById('mainView').style.display="none";
                document.getElementById('loaderView').style.display="block";
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
                        document.getElementById('mainView').style.display="block";
                        document.getElementById('loaderView').style.display="none";
                        console.log(data)
                        self.totalStaff(data[0][0][0])
                        self.activeStaff(data[1][0][0])
                        self.inactiveStaff(data[2][0][0])
                }
                })
            }

            self.menuItemSelect = function (event) {
                var target = event.target;
                var itemValue = target.value;
                console.log(itemValue)
            }

           
            
           
        }
    }
    return  dasboardAdminfViewModel;
});