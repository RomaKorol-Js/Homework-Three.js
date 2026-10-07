import { gui } from "./Scene.js";

window.addEventListener("keydown", (event) => {
  if (event.key === "h") {
    if (gui._hidden) {
      gui.show();
    } else {
      gui.hide();
    }
    // gui.show();
  }
});
