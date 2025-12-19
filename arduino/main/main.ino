#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char *ssid = "___"; // ganit wifi pass sendiri
const char *password = "___";

// untuk sso unpar
// const char* ssid     = "UNPAR";
// const char* username = "6182201078@student.unpar.ac.id";
// const char* password = "618078SU";

const char *serverUrl = "http://34.50.93.23:3000/api/sensor/update";

const int trigPin = 18;
const int echoPin = 19;
float duration, distance;

void setup(){
  Serial.begin(115200);

  // untuk sso unpar
  // WiFi.begin(ssid);

  WiFi.begin(ssid, password);
  Serial.println("\nConnecting to WiFi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.print("\nWifi connected");

  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

  //loginUNPAR();
}

void loop() {
  if (WiFi.status() == WL_CONNECTED && hasInternet()) {
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
    doc["sensor_name"] = "soba";
    doc["distance"] = distance;

    String jsonOutput;
    serializeJson(doc, jsonOutput);

    int httpResponseCode = http.PATCH(jsonOutput);

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

bool hasInternet() {
  HTTPClient http;
  http.setTimeout(10000);

  http.begin("https://api.ipify.org/");
  int code = http.GET();

  if (code == 200) {
    String publicIP = http.getString();
    Serial.println("Internet OK → Public IP: " + publicIP);
    http.end();
    return true;
  } else {
    Serial.println("No internet");
    http.end();
    return false;
  }
}

// untuk wifi unpar
// void loginUNPAR() {
//   HTTPClient http;
//   http.setTimeout(15000);

//   String payload = "username=" + String(username) + "&password=" + String(password);

//   http.begin("https://wireless.unpar.ac.id/logout");
//   int codee = http.GET();
//   String resp = http.getString();
//   Serial.println(resp);
//   http.end();
//   http.begin("https://wireless.unpar.ac.id/login");
//   http.addHeader("Content-Type", "application/x-www-form-urlencoded");

//   int code = http.POST(payload);
//   if (code == 200) {
//     String response = http.getString();
//     Serial.println(response);
//     Serial.println("UNPAR LOGIN SUCCESS!");
//   } else if (code == 302) {
//     Serial.println("redirect");
//   } else {
//     Serial.printf("Login failed (code %d)\n", code);
//   }
//   http.end();
// }