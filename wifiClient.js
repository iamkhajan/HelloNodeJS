var WiFiControl = require('wifi-control');
//  Initialize wifi-control package with verbose output
var settings = {
  debug: true || false,
  iface: 'wlan0',
  connectionTimeout: 10000 // in ms
};

WiFiControl.init({
  debug: true
});
WiFiControl.configure(settings);


exports.wifiScanResult = function() {
  //  Try scanning for access points:
  WiFiControl.scanForWiFi(function(err, response) {
    if (err) console.log(err);
  
    var networkList = response["networks"];      
    networkList.sort(function(a, b){
      return b.signal_level-a.signal_level
    });

    for (var i = 0; i < networkList.length; i++) { 
      console.log(networkList[i].ssid
        +" Mac :: "+networkList[i].mac
        +"  Strength :: "+networkList[i].signal_level);
    }  
    return networkList;
  });
}






  
