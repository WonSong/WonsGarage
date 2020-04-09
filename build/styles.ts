import * as sass from "node-sass";

export function styles() {
  const result = sass.renderSync({
    file: "./styles/main.scss",
  });

  return result.css.toString();
}
