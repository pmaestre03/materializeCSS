(function ($) {
         $(function () {
                  $('.sidenav').sidenav();
         }); // end of document ready
})(jQuery); // end of jQuery name space


document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
         // Cordova is now initialized. Have fun!
         var options = { "swipeable": true };
         var el = document.getElementById('tabs');
         var instance = M.Tabs.init(el, options);
         console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
         //document.getElementById('deviceready').classList.add('ready');
}

