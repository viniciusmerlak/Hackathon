// styles.ts
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  welcomeScreen: { position: "absolute", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" },
  startText: { fontSize: 43, color: "#fff" },
  loginContainer: { width: "90%", alignItems: "center", backgroundColor: "transparent", paddingVertical: 20 },
  title: { fontSize: 40, color: "#fff", marginBottom: 20 },
  inputContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 25, width: width * 0.8, marginVertical: 10, paddingHorizontal: 15, height: 50, borderWidth: 2, borderLeftColor: "#00e6ff", borderRightColor: "black" },
  icon: { marginRight: 10 },
  input: { flex: 1, height: 40, color: "#000" },
  button: { backgroundColor: "#0AAD41", paddingVertical: 12, paddingHorizontal: 40, borderRadius: 25, marginTop: 20 },
  buttonText: { color: "#fff", fontSize: 20 },
  footerText: { marginTop: 40, fontSize: 34, color: "#fff", textAlign: "center" }
});