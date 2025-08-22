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
    iniciarBot(codigo);
} else if (opcion === "2") {
    const qrData = `${config.nombreBot}:${generarCodigo()}`;
    console.log(chalk.bgGreen("\n📲 Generando QR..."));
    qrcode.toString(qrData, { type: "terminal"}, (err, qr) => {
      if (err) return console.error("❌ Error al generar QR:", err);
      console.log(qr);
      iniciarBot(qrData);
});
} else {
    console.log(chalk.red("\n❌ Opción inválida. Ejecuta el script nuevamente."));
}

  rl.close();
})();
```

---

*⚙️ `config.js`*

```js
export const config = {
  nombreBot: "SukiBot_MD",
  version: "1.0.0",
  creador: "Delfina 💞"
};
```

---

*🚀 `jadibot-serbot.js`*

```js
export function iniciarBot(dato) {
  console.log(`🚀 SukiBot_MD iniciado con: ${dato}`);
  // Aquí podés agregar tu lógica real de conexión
}
```

---

*📦 `package.json` (fragmento mínimo)*

```json
{
  "name": "SukiBot_MD",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "dependencies": {
    "chalk": "^5.3.0",
    "qrcode": "^1.5.1"
}
}
