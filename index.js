import readline from "readline";
import chalk from "chalk";
import qrcode from "qrcode";
import { config} from "./config.js";
import { iniciarBot} from "./jadibot-serbot.js";

// 🎲 Generador de código de 8 dígitos
const generarCodigo = () => Math.floor(10000000 + Math.random() * 90000000).toString();

// 🎛️ Interfaz de consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const pregunta = (texto) => new Promise(resolve => rl.question(texto, resolve));

(async () => {
  console.clear();
  console.log(chalk.cyanBright(`🌸 Bienvenida a ${config.nombreBot} v${config.version} 🌸`));
  console.log(chalk.magenta("Selecciona una opción:"));
  console.log(chalk.yellow("1️⃣ Generar código de vinculación"));
  console.log(chalk.green("2️⃣ Generar código QR"));

  const opcion = await pregunta(chalk.bold.blue("\n👉 Opción (1 o 2): "));

  if (opcion === "1") {
    const codigo = generarCodigo();
    console.log(chalk.bgMagenta("\n🔐 Código generado:"), chalk.whiteBright(codigo));
    iniciarBot(codigo); // Lógica personalizada
} else if (opcion === "2") {
    const qrData = `${config.nombreBot}:${generarCodigo()}`;
    console.log(chalk.bgGreen("\n📲 Generando QR..."));
    qrcode.toString(qrData, { type: "terminal"}, (err, qr) => {
      if (err) return console.error("❌ Error al generar QR:", err);
      console.log(qr);
      iniciarBot(qrData); // Lógica personalizada
});
} else {
    console.log(chalk.red("\n❌ Opción inválida. Ejecuta el script nuevamente."));
}

  rl.close();
})();
