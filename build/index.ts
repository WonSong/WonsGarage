import { html } from "./html";
import { styles } from "./styles";
import * as fs from 'fs';

const body = "";
const scripts = "";

const result = html(body, styles(), scripts);
console.log(result);

fs.writeFileSync('./docs/index.html', result);

