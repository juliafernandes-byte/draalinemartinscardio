import { spawnSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";

const require = createRequire(import.meta.url);
const viteCli = resolve(dirname(require.resolve("vite/package.json")), "bin/vite.js");
const result = spawnSync(process.execPath, [viteCli, "build"], {
  stdio: "inherit",
  env: { ...process.env, STATIC_EXPORT: "true" },
});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);

const output = "dist/static";
const html = readFileSync(`${output}/index.html`, "utf8");
if (!html.includes("Cuidar do coração") || !html.includes('id="publicacoes"')) {
  throw new Error("A exportação deve conter o conteúdo pré-renderizado da página inicial.");
}
if (html.includes("/__l5e/")) {
  throw new Error("A exportação ainda contém imagens exclusivas da hospedagem Lovable.");
}
for (const image of ["logo-completo-web.png", "logo-simbolo.png", "foto-dra-aline.jpg", "foto-dra-alineee.jpg"]) {
  if (!existsSync(`${output}/${image}`)) throw new Error(`Imagem ausente: ${image}`);
}
console.log(`Site estático pronto em ${output}/ (sem servidor em runtime).`);