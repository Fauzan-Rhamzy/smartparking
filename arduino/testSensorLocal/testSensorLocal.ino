#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char *ssid = "Ram G";
const char *password = "hehohiha";

const char *serverUrl = "http://172.20.10.2:3000/api/test";

const int trigPin = 18;
const int echoPin = 19;
float duration, distance;

void setup(){
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  Serial.print("Menghubungkan ke WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.print("\nWifi Connected");

  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  Serial.begin(9600);
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");
    JsonDocument doc;

    digitalWrite(trigPin, LOW);
    delayMicroseconds(2);
    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);

    duration = pulseIn(echoPin, HIGH);
    distance = (duration*.0343)/2;
    Serial.print("Distance: ");
    Serial.println(distance);
    delay(100);

    // doc["deviceId"] = "ESP32-";
    // doc["jarak"] = 700;
    doc["sensor_name"] = "ESP32-";
    doc["jarak"] = distance;

    String jsonOutput;
    serializeJson(doc, jsonOutput);

    int httpResponseCode = http.POST(jsonOutput);

    if (httpResponseCode > 0)
    {
      String response = http.getString();
      Serial.print("Respon Server: ");
      Serial.println(httpResponseCode);
      Serial.println(response);
    }
    else
    {
      Serial.print("Error saat mengirim: ");
      Serial.println(httpResponseCode);
    }

    http.end();
  }
  else
  {
    Serial.println("WiFi Terputus");
  }

  delay(5000);
}