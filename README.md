Simple pendulum simulator with Node.js. Each pendulum runs on a unique TCP port. Made for job application assigmment.
Demo - https://youtu.be/INakaHLFJzM.
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/INakaHLFJzM/0.jpg)](https://www.youtube.com/watch?v=INakaHLFJzM)
**API Documentation**

Get Pendulums API - Returns current pendulum configuration as a JSON object.

Route: ```GET /getPendulums HTTP/1.1```

Example Request:
```http://localhost/getPendulums```

Example Output:
```{"1":{"mass":"0.5","length":"0.5","b":"0.998"},"2":{"mass":"0.6","length":"0.6","b":0.998},"3":{"mass":"0.7","length":"0.7","b":0.998},"4":{"mass":"0.8","length":"0.8","b":0.998},"5":{"mass":"0.9","length":"0.9","b":0.998}}```
