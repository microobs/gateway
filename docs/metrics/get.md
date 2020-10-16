**Show Metrics**
----
Returns an array containing the collected metrics.

* **URL**

  `/metrics`

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** `["cadvisor_version_info", "container_cpu_load_average_10s", "container_cpu_system_seconds_total"]`

* **Sample Call:**

  ```sh
  curl -H "Content-Type: application/json" \
  http://localhost:8081/metrics
  ```

**Query Specific Metric**
----
  Returns information about an informed metric.

* **URL**

  `/metrics/m/:metric`

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `metric=[string]`

*  **URL Query String**
   
   If no query string is informed, the request is carried out taking into consideration the specific point of time that the evaluation takes effect.
 
   **Optional:**

   `at=[ISO | milliseconds]` - indicates a specific point in time<br>
   `start=[ISO | milliseconds]` - indicates a start point in time<br>
   `end=[ISO | milliseconds]` - indicates a final point in time
   
   Additionally, a set of dimensions or labels (prometheus), can be passed in as query strings (in a key-value form) to filter even more the request.

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```yaml
    [
      {
        "metric": {
          "name": "process_start_time_seconds",
          "labels": {
            "instance": "cadvisor:8080",
            "job": "cadvisor"
          }
        },
        "value": {
          "time": "2020-10-15T23:09:39.955Z",
          "value": 1602786940.66
        }
      }
    ]
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{"err":"Not Found"}`

* **Sample Call:**
  
  ```sh
  curl -H "Content-Type: application/json" \
  http://localhost:8081/metrics/m/process_start_time_seconds?at=1602803967183
  ```
  With dimensions/labels:
  ```sh
  curl -H "Content-Type: application/json" \
  http://localhost:8081/metrics/m/process_start_time_seconds?instance=cadvisor:8080&job=cadvisor
  ```