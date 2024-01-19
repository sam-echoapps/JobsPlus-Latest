require(["require", "exports", "knockout", "ojs/ojbootstrap", "ojs/ojarraydataprovider", "ojs/ojknockout", "ojs/ojchart", "jet-composites/demo-chart-three-d-effect-control/loader"], function (require, exports, ko, ojbootstrap_1, data, ArrayDataProvider) {
    "use strict";
    
    class ChartModel {
        constructor() {
            this.threeDValue = ko.observable("off");

            
        }
    }
    (0, ojbootstrap_1.whenDocumentReady)().then(() => {
        ko.applyBindings(new ChartModel(), document.getElementById("chart-container"));
    });
});