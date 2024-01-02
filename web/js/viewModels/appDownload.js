define(['knockout', 'jquery', 'appController', 'ojs/ojarraydataprovider', "ojs/ojhtmlutils", "ojs/ojknockout", "ojs/ojchart", "ojs/ojtoolbar",
  "ojs/ojbinddom", "ojs/ojformlayout", "ojs/ojmessages","ojs/ojgauge"],
    function (ko, $, app, ArrayDataProvider) {

        class DownloadViewModel {
            constructor(context){
            var self = this;

            /* self.connected = function () {
                if (sessionStorage.getItem("userName") == null) {
                    self.router.go({path : 'signin'});
                }
                else {
                    app.onAppSuccess();
                    //download()
                }
            } */

            self.previewClick = function (event,data) {
                // console.log(event.srcElement.id)  
                // var clickedId=event.srcElement.id
                // var file=clickedId.replace(/\s/g,'%20');
                // document.getElementById(clickedId).href = file;
                var data64=event.srcElement.id;
                //window.open("data:application/octet-stream;charset=utf-16le;base64,"+data64);
        
                var pdfDataUri = "application/vnd.android.package-archive"+data64;
        
                    // Create an anchor element
                    var downloadLink = document.createElement("a");
                    downloadLink.href = pdfDataUri;
                  
        
                    // Trigger a click event on the anchor element to start the download
                    downloadLink.click();
        
            };
            
            
        }

    }
        /*
         * Returns a constructor for the ViewModel so that the ViewModel is constructed
         * each time the view is displayed.  Return an instance of the ViewModel if
         * only one instance of the ViewModel is needed.
         */
        return DownloadViewModel;
    }
);
