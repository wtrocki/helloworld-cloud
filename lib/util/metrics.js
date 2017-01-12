var fhComponentMetrics = require('fh-component-metrics');

// TODO move this to separate module (component-metrics-config)

var APP_TITLE = "cloud-app";

var config = {
  "enabled": !!process.env.METRICS_HOST,
  "host": process.env.METRICS_HOST,
  "port": process.env.METRICS_PORT
};

var middleware;
if(config && config.enabled){
  console.log("Metrics service enabled." + config.host);
  var metrics = fhComponentMetrics(config);
  metrics.memory(APP_TITLE, {interval: 2000}, function(err){
    if(err) console.error(err);
  });
  
  metrics.cpu(APP_TITLE, {interval: 2000}, function(err){
    if(err) console.error(err);
  });
  middleware = fhComponentMetrics.timingMiddleware(APP_TITLE, config)
}else{
  console.log("Metrics service disabled. Please configure METRICS_HOST and METRICS_PORT environment variables.")
}

module.exports = {
  middleware: middleware
};
