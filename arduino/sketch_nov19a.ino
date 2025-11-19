#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "Nama wifi";
const char* password = "pass";

const char* serverUrl = "http://.../api/sensor";

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  Serial.print("Menghubungkan ke WiFi");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.print("\nWifi Connected");
}

void loop() {
  if(WiFi.status() == WL_CONNECTED){
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");
    JsonDocument doc;
    doc["deviceId"] = "ESP32-CikalHandosme";
    doc["jarak"] = 700;

    String jsonOutput;
    serializeJson(doc, jsonOutput);

    int httpResponseCode = http.POST(jsonOutput);

    if(httpResponseCode > 0){
      String response = http.getString();
      Serial.print("Respon Server: ");
      Serial.println(httpResponseCode);
      Serial.println(response);
    } else {
      Serial.print("Error saat mengirim: ");
      Serial.println(httpResponseCode);
    }

    http.end();
  } else {
    Serial.println("WiFi Terputus");
  }

  delay(5000);
}