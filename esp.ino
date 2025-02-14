#include <WiFi.h>
#include <FirebaseESP32.h>

// Configurações do WiFi
#define WIFI_SSID "Paulo's Galaxy S20 FE"
#define WIFI_PASSWORD "rakan123"

// Configurações do Firebase
#define FIREBASE_HOST "https://hack-a-ton-8603f-default-rtdb.firebaseio.com/"
#define FIREBASE_AUTH  "AIzaSyBAmuO10FSQIs6XVhHJrBjVK9bKAMCBH9Q"

// Inicializa o Firebase
FirebaseData firebaseData;
FirebaseAuth auth;
FirebaseConfig config;

// Pinos de toque do ESP32
#define TOUCH_PIN_1 13  // GPIO 4
#define TOUCH_PIN_2 14  // GPIO 15

void setup() {
    Serial.begin(115200);

    // Conectando ao WiFi
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print("Conectando ao WiFi...");
    while (WiFi.status() != WL_CONNECTED) {
        Serial.print(".");
        delay(500);
    }
    Serial.println("\nWiFi conectado!");

    // Configuração do Firebase
    config.host = FIREBASE_HOST;
    config.signer.tokens.legacy_token = FIREBASE_AUTH;
    Firebase.begin(&config, &auth);
    Firebase.reconnectWiFi(true);
}

void loop() {
    // Lê os valores de toque
    int touchValue1 = touchRead(TOUCH_PIN_1);
    int touchValue2 = touchRead(TOUCH_PIN_2);

    Serial.print("condutividade: ");
    Serial.print(touchValue1);
    Serial.print(" condutividade: ");
    Serial.println(touchValue2);

    // Envia os valores para o Firebase
    Firebase.setInt(firebaseData, "/touchSensor", touchValue1);
    Firebase.setInt(firebaseData, "/touchSensor2", touchValue2);

    delay(1000); // Aguarda 1 segundo antes de enviar novamente
}
