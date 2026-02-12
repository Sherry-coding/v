const BOYFRIEND_NAME = "Richard";   // 改成他的名字
const YOUR_NAME = "Sherry";      // 改成你的名字
const VALENTINE_DATE = "Feb 14"; // 改成你们的约会信息

const output = document.getElementById("output");
const cmd = document.getElementById("cmd");

const modal = document.getElementById("modal");
const modalText = document.getElementById("modalText");
const modalClose = document.getElementById("modalClose");

const btnYes = document.getElementById("btnYes");
const btnNo = document.getElementById("btnNo");
const btnSurprise = document.getElementById("btnSurprise");

let noCount = 0;

function printLine(text, klass="line"){
  const div = document.createElement("div");
  div.className = klass;
  div.textContent = text;
  output.appendChild(div);
  output.parentElement.scrollTop = output.parentElement.scrollHeight;
}

async function typeLine(text, speed=18){
  const div = document.createElement("div");
  div.className = "line";
  output.appendChild(div);
  for(let i=0;i<text.length;i++){
    div.textContent += text[i];
    await new Promise(r=>setTimeout(r, speed));
  }
  output.parentElement.scrollTop = output.parentElement.scrollHeight;
}

function openModal(text){
  modalText.textContent = text;
  modal.classList.remove("hidden");
}
function closeModal(){
  modal.classList.add("hidden");
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e)=>{ if(e.target === modal) closeModal(); });

function help(){
  printLine("Available commands:");
  printLine("  help        - show this list", "line faint");
  printLine("  love        - run love-checker", "line faint");
  printLine("  date        - show Valentine's plan", "line faint");
  printLine("  ping        - test connection", "line faint");
  printLine("  sudo kiss   - requires permission :)", "line faint");
  printLine("  clear       - clear screen", "line faint");
}

async function boot(){
  await typeLine(`> initializing romantic_module...`);
  await typeLine(`> loading constants: boyfriend="${BOYFRIEND_NAME}", girlfriend="${YOUR_NAME}"`);
  await typeLine(`> compiling feelings... ✅`);
  await typeLine(`> starting...`);
  printLine("");
  await typeLine(`Hi ${BOYFRIEND_NAME}.`);
  await typeLine(`I built this tiny website because...`);
  await typeLine(`you make my heart do unexpected rerenders.`);
  await typeLine(`Type "help" or click a button below :)`);
  printLine("");
  cmd.focus();
}

function handleCommand(raw){
  const input = raw.trim();

  if(!input) return;

  printLine(`$ ${input}`, "line faint");

  if(input === "help") return help();

  if(input === "clear"){
    output.innerHTML = "";
    return;
  }

  if(input === "ping"){
    printLine("Pinging your heart... ❤️");
    printLine("Reply from heart: time=0ms status=always-yes");
    return;
  }

  if(input === "date"){
    printLine(`Valentine plan: ${VALENTINE_DATE}`);
    printLine("Checklist:");
    printLine("  - hug (mandatory)");
    printLine("  - dinner (optional but recommended)");
    printLine("  - photos (if you allow)");
    printLine("  - end-of-day cuddle (non-negotiable)");
    return;
  }

  if(input === "love"){
    printLine("Running love-checker v1.4.0...");
    printLine("Result:");
    printLine(`  compatibility(${YOUR_NAME}, ${BOYFRIEND_NAME}) = 100%`);
    printLine("  known bugs: none. only butterflies.");
    return;
  }

  if(input.toLowerCase() === "sudo kiss"){
    printLine("Password required: say 'yes' by clicking Accept ❤️");
    return;
  }

  printLine(`Command not found: ${input}`);
  printLine(`Try: help`);
}

cmd.addEventListener("keydown", (e)=>{
  if(e.key === "Enter"){
    handleCommand(cmd.value);
    cmd.value = "";
  }
});

btnYes.addEventListener("click", async ()=>{
  printLine("");
  await typeLine("Deploying happiness to production... ✅");
  await typeLine(`PR merged: "${BOYFRIEND_NAME} is my favorite feature."`);
  openModal(`Okay ${BOYFRIEND_NAME} — you just approved the cutest contract ever.\n\nClause 1: You are loved.\nClause 2: You are my Valentine.\nClause 3: Renewable every day.`);
});

btnNo.addEventListener("click", async ()=>{
  noCount += 1;
  const lines = [
    "Reject received. Re-running with --force-love...",
    "Nice try. That button is decorative 🙂",
    "Permission denied: you’re too cute to reject.",
    "Okay okay… but my feelings have auto-retry enabled.",
    "Final warning: your Valentine request is unstoppable."
  ];
  const msg = lines[Math.min(noCount-1, lines.length-1)];
  printLine("");
  await typeLine(msg);
  if(noCount >= 4){
    openModal(`System override: ${BOYFRIEND_NAME} is now officially my Valentine.\n\n(you can still click Accept ❤️ to make it legal)`);
  }
});

btnSurprise.addEventListener("click", ()=>{
  openModal(`Dear ${BOYFRIEND_NAME},\n\nIf love were a repo, I’d star yours, fork your life, and commit to you daily.\n\n— ${YOUR_NAME}`);
});

boot();
