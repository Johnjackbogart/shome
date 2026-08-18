export type BuilderBoot = {
  source: string;
  previewDoc: string | null;
};

export function scriptJson(value: unknown) {
  // Source is user-authored HTML. Escaping `<` keeps it from ending the
  // enclosing script while the canvas is first constructed.
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

/**
 * The visual builder intentionally treats arbitrary top-level HTML as movable
 * blocks, so the DOM work lives in an isolated document on every platform.
 * Its iframe receives the server-sanitized preview document.
 */
export function builderDocument(initial: BuilderBoot) {
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<style>
  :root { color-scheme: dark; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
  * { box-sizing: border-box; }
  html, body { margin: 0; min-height: 100%; background: #0f172a; color: #e2e8f0; }
  button, input, textarea { font: inherit; }
  button { border: 0; cursor: pointer; }
  #root { padding: 12px; }
  .tabs { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; margin-bottom: 12px; padding: 4px; border: 1px solid rgba(255,255,255,.1); border-radius: 12px; background: rgba(2,6,23,.65); }
  .tab { padding: 9px 6px; border-radius: 8px; background: transparent; color: #94a3b8; font-size: 13px; font-weight: 700; }
  .tab.active { background: #c4b5fd; color: #0f172a; }
  .hint { margin: 0 0 12px; color: #94a3b8; font-size: 13px; line-height: 1.45; }
  .palette { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; margin-bottom: 12px; }
  .template { min-height: 74px; padding: 11px; border: 1px solid rgba(255,255,255,.1); border-radius: 12px; background: #172033; color: #e2e8f0; text-align: left; }
  .template strong, .block-title { display: block; color: #fff; font-size: 14px; }
  .template small, .block-detail { display: block; margin-top: 4px; color: #94a3b8; font-size: 12px; line-height: 1.3; }
  .canvas { display: grid; gap: 8px; }
  .block { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 8px; align-items: center; padding: 11px; border: 1px solid rgba(255,255,255,.1); border-radius: 12px; background: #172033; }
  .block.dragging { opacity: .45; }
  .block.drop-before { box-shadow: 0 -3px 0 #c4b5fd; }
  .block.selected { border-color: #fbbf24; box-shadow: 0 0 0 3px rgba(251,191,36,.15); }
  .block-main { min-width: 0; border: 0; background: transparent; color: inherit; text-align: left; }
  .block-detail { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .actions { display: flex; gap: 5px; }
  .icon, .outline, .primary, .danger { border-radius: 9px; padding: 8px 10px; font-size: 12px; font-weight: 700; }
  .icon, .outline { border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.06); color: #c4b5fd; }
  .primary { background: #c4b5fd; color: #0f172a; }
  .danger { background: rgba(251,113,133,.12); color: #fda4af; }
  .undo { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 12px; padding: 10px; border: 1px solid rgba(52,211,153,.25); border-radius: 12px; background: rgba(52,211,153,.08); color: #a7f3d0; font-size: 13px; }
  .preview-shell { min-height: 500px; overflow: hidden; border: 1px solid rgba(255,255,255,.14); border-radius: 12px; background: #fff; }
  iframe { display: block; width: 100%; min-height: 500px; border: 0; background: #fff; }
  .empty { display: grid; min-height: 220px; place-items: center; padding: 24px; color: #94a3b8; text-align: center; }
  .editor { margin-top: 12px; padding: 12px; border: 1px solid rgba(196,181,253,.35); border-radius: 14px; background: #111827; }
  .editor-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 10px; }
  .editor h2 { margin: 0; color: #fff; font-size: 16px; }
  .editor-tabs { display: flex; gap: 6px; margin-bottom: 10px; }
  .editor-tab { padding: 7px 9px; border-radius: 8px; background: rgba(255,255,255,.06); color: #94a3b8; font-size: 12px; font-weight: 700; }
  .editor-tab.active { background: rgba(196,181,253,.18); color: #ddd6fe; }
  label { display: grid; gap: 5px; margin: 10px 0; color: #cbd5e1; font-size: 12px; font-weight: 700; }
  input, textarea { width: 100%; border: 1px solid rgba(255,255,255,.12); border-radius: 9px; padding: 9px; background: #020617; color: #f8fafc; }
  textarea { min-height: 180px; resize: vertical; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; line-height: 1.45; }
  .editor-actions { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 12px; }
  .editor-note { margin: 0; color: #94a3b8; font-size: 12px; line-height: 1.4; }
</style>
</head>
<body>
<main id="root"></main>
<script>
  const INITIAL = ${scriptJson(initial)};
  const TEMPLATES = [
    { id: "heading", label: "Heading", detail: "Start a new section", html: '<section class="profile__section">\\n  <p class="profile__eyebrow">New section</p>\\n  <h2>Say something memorable.</h2>\\n  <p>Add the details in the code editor.</p>\\n</section>' },
    { id: "text", label: "Text", detail: "A simple note", html: '<section class="profile__section">\\n  <p>Write a little more about what you are making, noticing, or sharing.</p>\\n</section>' },
    { id: "divider", label: "Divider", detail: "Add breathing room", html: '<hr class="profile__divider">' },
    { id: "posts", label: "Posts", detail: "Your latest updates", html: '<section class="profile__section profile__posts">\\n  <div class="profile__section-heading">\\n    <h2>From the notebook</h2>\\n    <span>Latest posts</span>\\n  </div>\\n  <shome-posts />\\n</section>' },
    { id: "shop", label: "Shop", detail: "Your visible products", html: '<section class="profile__section">\\n  <div class="profile__section-heading">\\n    <h2>Shop</h2>\\n    <span>Available now</span>\\n  </div>\\n  <shome-products />\\n</section>' }
  ];
  const state = { source: "", previewDoc: null, model: null, mode: "blocks", selected: null, editorPane: "text", blockDraft: "", fields: [], removed: null, dragged: null };

  function send(message) {
    const payload = JSON.stringify(Object.assign({ source: "shome-native-profile-builder" }, message));
    if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(payload);
    else window.parent.postMessage(payload, "*");
  }

  function element(name, className, text) {
    const node = document.createElement(name);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function button(text, className, onClick) {
    const node = element("button", className, text);
    node.type = "button";
    node.addEventListener("click", onClick);
    return node;
  }

  function shortText(value, fallback) {
    const clean = value.replace(/\\s+/g, " ").trim();
    if (!clean) return fallback;
    return clean.length > 54 ? clean.slice(0, 51) + "…" : clean;
  }

  function blockInfo(node, index) {
    const html = node instanceof Element ? node.outerHTML : node.nodeType === Node.COMMENT_NODE ? "<!--" + (node.textContent || "") + "-->" : (node.textContent || "");
    const text = shortText(node.textContent || "", "Empty block");
    const tagName = node instanceof Element ? node.tagName.toLowerCase() : node.nodeType === Node.COMMENT_NODE ? "note" : "text";
    const heading = node instanceof Element ? node.querySelector("h1, h2, h3, h4, h5, h6") : null;
    let label = tagName === "text" ? "Text" : tagName.charAt(0).toUpperCase() + tagName.slice(1);
    if (tagName === "hr") label = "Divider";
    if (tagName === "style") label = "Styles";
    if (html.includes("shome-posts")) label = "Posts";
    if (html.includes("shome-products")) label = "Shop";
    if (heading && heading.textContent) label = shortText(heading.textContent, label);
    return { id: "block-" + index + "-" + html.length + "-" + html.slice(0, 16), html: html, label: label, detail: tagName === "text" ? text : tagName + " · " + text };
  }

  function movableNode(node, includeStyles) {
    if (node.nodeType === Node.TEXT_NODE) return Boolean(node.textContent && node.textContent.trim());
    if (node.nodeType === Node.COMMENT_NODE) return true;
    return node.nodeType === Node.ELEMENT_NODE && (includeStyles || node.tagName !== "STYLE");
  }

  function makeBuilderModel(source) {
    const template = document.createElement("template");
    template.innerHTML = source;
    const topLevel = Array.from(template.content.children);
    const main = topLevel.filter(function (item) { return item.tagName === "MAIN"; })[0];
    const slot = document.createElement("shome-builder-slot");
    slot.setAttribute("data-profile-builder", "true");
    let nodes;
    if (main) {
      nodes = Array.from(main.childNodes).filter(function (node) { return movableNode(node, true); });
      main.replaceChildren(slot);
    } else {
      nodes = Array.from(template.content.childNodes).filter(function (node) { return movableNode(node, false); });
      const firstNode = nodes[0];
      if (firstNode) {
        template.content.insertBefore(slot, firstNode);
        nodes.forEach(function (node) { if (node.parentNode) node.parentNode.removeChild(node); });
      } else template.content.append(slot);
    }
    return { shell: template.innerHTML, slotMarkup: slot.outerHTML, blocks: nodes.map(blockInfo) };
  }

  function sourceFromBlocks(model, blocks) {
    return model.shell.replace(model.slotMarkup, blocks.map(function (block) { return block.html.trim(); }).join("\\n\\n"));
  }

  function moveBlock(blocks, from, to) {
    const next = blocks.slice();
    const block = next.splice(from, 1)[0];
    if (!block) return blocks;
    next.splice(to, 0, block);
    return next;
  }

  function blockWithUpdatedSource(block, source, index) {
    const template = document.createElement("template");
    template.innerHTML = source;
    const node = Array.from(template.content.childNodes).find(function (candidate) { return candidate.nodeType !== Node.TEXT_NODE || Boolean(candidate.textContent && candidate.textContent.trim()); });
    if (!node) return Object.assign({}, block, { html: source, label: "Empty block", detail: "Add HTML to this block" });
    const next = blockInfo(node, index);
    next.id = block.id;
    next.html = source;
    return next;
  }

  function textFieldsFromBlock(source) {
    const template = document.createElement("template");
    template.innerHTML = source;
    const fields = [];
    function visit(node, path) {
      if (node.nodeType === Node.TEXT_NODE && node.textContent && node.textContent.trim()) {
        const parent = node.parentElement;
        const tagName = parent ? parent.tagName.toLowerCase() : null;
        if (tagName && !["style", "code", "pre"].includes(tagName)) fields.push({ id: path.join("."), path: path, label: tagName + " text", value: node.textContent.trim() });
        return;
      }
      Array.from(node.childNodes).forEach(function (child, index) { visit(child, path.concat(index)); });
    }
    visit(template.content, []);
    return fields;
  }

  function sourceWithTextFields(source, fields) {
    const template = document.createElement("template");
    template.innerHTML = source;
    fields.forEach(function (field) {
      let node = template.content;
      field.path.forEach(function (childIndex) { node = node && node.childNodes[childIndex]; });
      if (node && node.nodeType === Node.TEXT_NODE) node.textContent = field.value;
    });
    return template.innerHTML;
  }

  function setSelected(index) {
    const block = state.model && state.model.blocks[index];
    if (!block) return;
    state.selected = index;
    state.editorPane = "text";
    state.blockDraft = block.html;
    state.fields = textFieldsFromBlock(block.html);
    render();
  }

  function applyBlocks(blocks, selected) {
    if (!state.model) return;
    state.source = sourceFromBlocks(state.model, blocks);
    state.model = makeBuilderModel(state.source);
    state.selected = selected === undefined ? state.selected : selected;
    send({ type: "change", html: state.source });
    render();
  }

  function addBlock(templateId) {
    if (!state.model) return;
    const template = TEMPLATES.find(function (item) { return item.id === templateId; });
    if (!template) return;
    const fragment = document.createElement("template");
    fragment.innerHTML = template.html;
    const node = Array.from(fragment.content.childNodes).find(function (candidate) { return movableNode(candidate, true); });
    if (!node) return;
    const next = state.model.blocks.slice();
    next.push(blockInfo(node, next.length));
    applyBlocks(next, next.length - 1);
  }

  function removeBlock(index) {
    if (!state.model) return;
    const block = state.model.blocks[index];
    if (!block) return;
    state.removed = { block: block, index: index };
    applyBlocks(state.model.blocks.filter(function (_item, itemIndex) { return itemIndex !== index; }), null);
  }

  function restoreBlock() {
    if (!state.model || !state.removed) return;
    const next = state.model.blocks.slice();
    next.splice(Math.min(state.removed.index, next.length), 0, state.removed.block);
    const selected = Math.min(state.removed.index, next.length - 1);
    state.removed = null;
    applyBlocks(next, selected);
  }

  function moveSelected(direction) {
    if (!state.model || state.selected === null) return;
    const destination = state.selected + direction;
    if (destination < 0 || destination >= state.model.blocks.length) return;
    applyBlocks(moveBlock(state.model.blocks, state.selected, destination), destination);
  }

  function saveBlockEditor() {
    if (!state.model || state.selected === null) return;
    const block = state.model.blocks[state.selected];
    if (!block) return;
    const source = state.editorPane === "text" ? sourceWithTextFields(block.html, state.fields) : state.blockDraft;
    if (!source.trim()) return;
    const next = state.model.blocks.slice();
    next[state.selected] = blockWithUpdatedSource(block, source, state.selected);
    applyBlocks(next, state.selected);
  }

  function closeEditor() {
    state.selected = null;
    state.blockDraft = "";
    state.fields = [];
    render();
  }

  function overlayDocument(doc, selectedIndex) {
    if (!doc) return null;
    const overlay = '<style id="shome-builder-overlay">body{counter-reset:shome-block}body>main>:not(style),body>:not(style):not(main){position:relative!important;outline:2px solid rgba(99,102,241,.8)!important;outline-offset:3px!important;counter-increment:shome-block}body>main>:not(style)::after,body>:not(style):not(main)::after{content:"Block " counter(shome-block);position:absolute!important;z-index:2147483647!important;top:.35rem!important;right:.35rem!important;padding:.2rem .45rem!important;border-radius:999px!important;background:#4f46e5!important;color:#fff!important;font:700 11px/1 ui-sans-serif,system-ui,sans-serif!important;letter-spacing:.03em!important;pointer-events:none!important}body>main>:not(style),body>:not(style):not(main){cursor:grab!important;user-select:none!important;touch-action:none!important}[data-shome-builder-selected="true"]{outline-color:#f59e0b!important;box-shadow:0 0 0 5px rgba(245,158,11,.22)!important}</style>';
    const bridge = '<script>(()=>{const root=document.querySelector("body > main")||document.body;const blocks=Array.from(root.children).filter((element)=>element.tagName!=="STYLE");const selectedIndex=' + String(selectedIndex === null ? -1 : selectedIndex) + ';let drag=null;blocks.forEach((block,index)=>{if(index===selectedIndex)block.setAttribute("data-shome-builder-selected","true");block.setAttribute("data-shome-builder-index",String(index));block.addEventListener("pointerdown",(event)=>{if(!event.isPrimary||(event.pointerType==="mouse"&&event.button!==0))return;drag={index:index,pointerId:event.pointerId,x:event.clientX,y:event.clientY,moved:false};event.preventDefault();block.setPointerCapture&&block.setPointerCapture(event.pointerId);const move=(moveEvent)=>{if(!drag||drag.index!==index||drag.pointerId!==moveEvent.pointerId)return;if(Math.hypot(moveEvent.clientX-drag.x,moveEvent.clientY-drag.y)>7){drag.moved=true;moveEvent.preventDefault();}};const finish=(upEvent)=>{document.removeEventListener("pointermove",move,true);document.removeEventListener("pointerup",finish,true);document.removeEventListener("pointercancel",cancel,true);if(!drag||drag.index!==index||drag.pointerId!==upEvent.pointerId)return;const currentDrag=drag;drag=null;if(!currentDrag.moved){window.parent.postMessage({source:"shome-profile-overlay",type:"select",index:index},"*");return;}const target=document.elementFromPoint(upEvent.clientX,upEvent.clientY)?.closest("[data-shome-builder-index]");const targetIndex=Number(target?.getAttribute("data-shome-builder-index"));if(!Number.isInteger(targetIndex)||targetIndex===currentDrag.index)return;const bounds=target.getBoundingClientRect();window.parent.postMessage({source:"shome-profile-overlay",type:"move",from:currentDrag.index,to:targetIndex,before:upEvent.clientY<bounds.top+bounds.height/2},"*");};const cancel=(cancelEvent)=>{if(drag?.pointerId===cancelEvent.pointerId)drag=null;document.removeEventListener("pointermove",move,true);document.removeEventListener("pointerup",finish,true);document.removeEventListener("pointercancel",cancel,true);};document.addEventListener("pointermove",move,true);document.addEventListener("pointerup",finish,true);document.addEventListener("pointercancel",cancel,true);});})();<\\/script>';
    const interactive = doc.replace("style-src 'unsafe-inline';", "style-src 'unsafe-inline'; script-src 'unsafe-inline';");
    return interactive.replace("</head>", overlay + "</head>").replace("</body>", bridge + "</body>");
  }

  function renderTabs(root) {
    const tabs = element("div", "tabs");
    [["blocks", "Blocks"], ["overlay", "Overlay"], ["preview", "Preview"]].forEach(function (item) {
      const node = button(item[1], "tab" + (state.mode === item[0] ? " active" : ""), function () { state.mode = item[0]; render(); });
      node.setAttribute("aria-pressed", String(state.mode === item[0]));
      tabs.append(node);
    });
    root.append(tabs);
  }

  function renderBlocks(root) {
    const hint = element("p", "hint", "Add building blocks, then edit their words, raw HTML, or placement. Changes stay as a draft until you save from the app.");
    root.append(hint);
    const palette = element("div", "palette");
    TEMPLATES.forEach(function (template) {
      const node = button("", "template", function () { addBlock(template.id); });
      const title = element("strong", "", template.label);
      const detail = element("small", "", template.detail);
      node.append(title, detail);
      palette.append(node);
    });
    root.append(palette);
    const canvas = element("div", "canvas");
    if (!state.model || state.model.blocks.length === 0) canvas.append(element("p", "empty", "Add a block to start composing your page."));
    else state.model.blocks.forEach(function (block, index) {
      const row = element("div", "block" + (state.selected === index ? " selected" : ""));
      row.draggable = true;
      row.addEventListener("dragstart", function (event) {
        state.dragged = index;
        row.classList.add("dragging");
        if (event.dataTransfer) {
          event.dataTransfer.effectAllowed = "move";
          event.dataTransfer.setData("text/plain", String(index));
        }
      });
      row.addEventListener("dragend", function () { state.dragged = null; render(); });
      row.addEventListener("dragover", function (event) {
        event.preventDefault();
        if (state.dragged === null || state.dragged === index) return;
        row.classList.toggle("drop-before", event.clientY < row.getBoundingClientRect().top + row.offsetHeight / 2);
      });
      row.addEventListener("dragleave", function () { row.classList.remove("drop-before"); });
      row.addEventListener("drop", function (event) {
        event.preventDefault();
        const from = state.dragged;
        state.dragged = null;
        if (from === null || from === index || !state.model) return;
        const before = event.clientY < row.getBoundingClientRect().top + row.offsetHeight / 2;
        const targetAfterRemoval = from < index ? index - 1 : index;
        applyBlocks(moveBlock(state.model.blocks, from, targetAfterRemoval + (before ? 0 : 1)), null);
      });
      const main = button("", "block-main", function () { setSelected(index); });
      main.append(element("strong", "block-title", block.label), element("small", "block-detail", block.detail));
      const actions = element("div", "actions");
      actions.append(button("↑", "icon", function () { if (index > 0) applyBlocks(moveBlock(state.model.blocks, index, index - 1), index - 1); }));
      actions.append(button("↓", "icon", function () { if (index < state.model.blocks.length - 1) applyBlocks(moveBlock(state.model.blocks, index, index + 1), index + 1); }));
      actions.append(button("×", "icon", function () { removeBlock(index); }));
      row.append(main, actions);
      canvas.append(row);
    });
    root.append(canvas);
    if (state.removed) {
      const undo = element("div", "undo");
      undo.append(element("span", "", "Block removed."), button("Undo", "outline", restoreBlock));
      root.append(undo);
    }
  }

  function renderPreview(root, overlay) {
    if (!state.previewDoc) {
      root.append(element("p", "empty", "Building your preview…"));
      return;
    }
    const shell = element("div", "preview-shell");
    const frame = document.createElement("iframe");
    frame.title = overlay ? "Interactive profile canvas" : "Profile preview";
    frame.setAttribute("sandbox", overlay ? "allow-scripts allow-popups allow-popups-to-escape-sandbox" : "allow-popups allow-popups-to-escape-sandbox");
    frame.srcdoc = overlay ? overlayDocument(state.previewDoc, state.selected) : state.previewDoc;
    shell.append(frame);
    root.append(shell);
    if (overlay) root.append(element("p", "hint", "Tap a block to edit it. Drag a block over another block to reorder it."));
  }

  function renderEditor(root) {
    if (state.selected === null || !state.model) return;
    const block = state.model.blocks[state.selected];
    if (!block) return;
    const panel = element("section", "editor");
    const head = element("div", "editor-head");
    head.append(element("h2", "", "Edit " + block.label), button("Close", "outline", closeEditor));
    panel.append(head);
    const tabs = element("div", "editor-tabs");
    ["text", "html"].forEach(function (pane) {
      tabs.append(button(pane === "text" ? "Text" : "HTML", "editor-tab" + (state.editorPane === pane ? " active" : ""), function () { state.editorPane = pane; render(); }));
    });
    panel.append(tabs);
    if (state.editorPane === "text") {
      if (state.fields.length === 0) panel.append(element("p", "editor-note", "This block has no editable text nodes. Use the HTML tab to edit it."));
      else state.fields.forEach(function (field) {
        const label = element("label", "", field.label);
        const input = document.createElement("input");
        input.value = field.value;
        input.addEventListener("input", function () { field.value = input.value; });
        label.append(input);
        panel.append(label);
      });
    } else {
      const label = element("label", "", "Block HTML");
      const input = document.createElement("textarea");
      input.value = state.blockDraft;
      input.addEventListener("input", function () { state.blockDraft = input.value; });
      label.append(input);
      panel.append(label);
    }
    const actions = element("div", "editor-actions");
    actions.append(button("Move up", "outline", function () { moveSelected(-1); }));
    actions.append(button("Move down", "outline", function () { moveSelected(1); }));
    actions.append(button("Remove", "danger", function () { removeBlock(state.selected); }));
    actions.append(button("Apply block", "primary", saveBlockEditor));
    panel.append(actions);
    root.append(panel);
  }

  function render() {
    const root = document.getElementById("root");
    root.replaceChildren();
    renderTabs(root);
    if (state.mode === "blocks") renderBlocks(root);
    else renderPreview(root, state.mode === "overlay");
    renderEditor(root);
  }

  function update(input) {
    const sourceChanged = typeof input.source === "string" && input.source !== state.source;
    if (sourceChanged) {
      state.source = input.source;
      state.model = makeBuilderModel(state.source);
      if (state.selected !== null && !state.model.blocks[state.selected]) closeEditor();
    }
    if (Object.prototype.hasOwnProperty.call(input, "previewDoc")) state.previewDoc = input.previewDoc || null;
    render();
  }

  window.addEventListener("message", function (event) {
    const message = event.data || {};
    if (message.source === "shome-native-builder-host" && message.type === "update") {
      update(message.input || {});
      return;
    }
    if (message.source !== "shome-profile-overlay") return;
    if (message.type === "select" && Number.isInteger(message.index)) setSelected(message.index);
    if (message.type === "move" && Number.isInteger(message.from) && Number.isInteger(message.to) && typeof message.before === "boolean" && state.model) {
      const from = message.from;
      const target = message.to;
      if (from < 0 || target < 0 || from >= state.model.blocks.length || target >= state.model.blocks.length) return;
      const afterRemoval = from < target ? target - 1 : target;
      applyBlocks(moveBlock(state.model.blocks, from, afterRemoval + (message.before ? 0 : 1)), null);
    }
  });

  window.__shomeProfileBuilder = { update: update };
  update(INITIAL);
</script>
</body>
</html>`;
}
