const client = require("prom-client");
const register = new client.Registry();

client.collectDefaultMetrics({ register });

const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests handled by the backend",
});

const httpErrorCounter = new client.Counter({
  name: "http_errors_total",
  help: "Total number of failed (error) requests",
});

const httpResponseTime = new client.Histogram({
  name: "http_response_time_seconds",
  help: "Response time of HTTP requests in seconds",
  buckets: [0.1, 0.5, 1, 2, 5],
});

register.registerMetric(httpRequestCounter);
register.registerMetric(httpErrorCounter);
register.registerMetric(httpResponseTime);

function trackMetrics(req, res, next) {
  const end = httpResponseTime.startTimer();
  httpRequestCounter.inc();

  res.on("finish", () => {
    if (res.statusCode >= 400) {
      httpErrorCounter.inc();
    }
    end();
  });

  next();
}

module.exports = { register, trackMetrics };
