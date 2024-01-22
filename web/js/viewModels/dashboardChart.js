/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojchart'],
function (oj, ko, $) {
    function DashboardChartViewModel() {
        var self = this;
        
        /*Chart Properties*/
        self.stackValue = ko.observable('off');
        self.orientationValue = ko.observable('vertical');
        /* chart data */
        var barSeries = [
        {name : "Finance", items : [42000, 55000]},
        {name : "Purchase", items : [55000, 70000]},
        {name : "Service", items : [36000, 50000]},
        {name : "Administration", items : [28000, 65000]},
        {name : "HR", items : [25000, 60000]}
        ];
         
        var barGroups = ["Average Salary", "Max Salary"];
        self.barSeriesValue = ko.observableArray(barSeries);
        self.barGroupsValue = ko.observableArray(barGroups);

    }
    return DashboardChartViewModel;
});
