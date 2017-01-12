var fhComponentMetrics = require('fh-component-metrics');

// TODO move this to separate module (component-metrics-config)

var APP_TITLE="CLOUD APP";

var config = {
  "enabled": !!process.env.METRICS_HOST,
  "host": process.env.METRICS_HOST,
  "port": process.env.METRICS_PORT

};

if(config && config.enabled){
  var metrics = fhComponentMetrics(config);
  metrics.memory(APP_TITLE, { interval: 2000 }, function(err) {
    if (err) console.error(err);
  });
  
  metrics.cpu(APP_TITLE, { interval: 2000 }, function(err) {
    if (err) console.error(err);
  });
}else{
  console.log("Metrics service disabled. Please configure METRICS_HOST and METRICS_PORT environment variables.")
}
