import "./style.css";

class ColumnsComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
        :host {
          display: block;
        }
        .columns {
          display: grid;
          gap: 2.5rem;
          grid-template-columns: repeat(var(--columns, 1), 1fr);
        }
      `;

    const columnsContainer = document.createElement("div");
    columnsContainer.classList.add("columns");

    const slot = document.createElement("slot");
    columnsContainer.appendChild(slot);

    shadow.appendChild(style);
    shadow.appendChild(columnsContainer);
  }

  static get observedAttributes() {
    return ["cols"];
  }

  attributeChangedCallback(name: "cols", oldValue: string, newValue: string) {
    if (name === "cols") {
      this.style.setProperty("--columns", newValue || "1");
    }
  }
}

customElements.define("gno-columns", ColumnsComponent);
