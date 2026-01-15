#include <WiFi.h>
#include <HTTPClient.h>


const char* ssid     = "UNPAR";
const char* username = "6182201078@student.unpar.ac.id";
const char* password = "618078SU";

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid);

  Serial.println("Connecting to UNPAR ");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected");

  loginUNPAR();
}

void loop() {
  static uint32_t last = 0;
  if (millis() - last > 30000) {
    last = millis();
    if (WiFi.status() == WL_CONNECTED && !hasInternet()) {
      Serial.println("No public IP → re-login");
      loginUNPAR();
    }
  }
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
    Serial.println("No internet (no public IP) - still behind captive portal");
    http.end();
    return false;
  }
}

void loginUNPAR() {
  HTTPClient http;
  http.setTimeout(15000);

  String payload = "username=" + String(username) + "&password=" + String(password);

  http.begin("https://wireless.unpar.ac.id/logout");
  int codee = http.GET();
  String resp = http.getString();
  Serial.println(resp);
  http.end();
  http.begin("https://wireless.unpar.ac.id/login");
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");

  int code = http.POST(payload);
  if (code == 200) {
    String response = http.getString();
    Serial.println(response);
    Serial.println("UNPAR LOGIN SUCCESS!");
  } else if (code == 302) {
    Serial.println("redirect");
  } else {
    Serial.printf("Login failed (code %d)\n", code);
  }
  http.end();
}