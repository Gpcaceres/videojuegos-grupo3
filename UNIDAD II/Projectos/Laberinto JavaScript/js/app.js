"use strict";
// Adaptacion de los formularios WinForms: mismos manejadores, con DOM y temporizadores del navegador.
const view = {};
for (const element of document.querySelectorAll("[id]")) view[element.id] = element;
let activeForm = null;

// InitializeComponent ya existe en los archivos Designer.cs originales.
// Aqui actualiza exclusivamente la presentacion HTML, sin decidir movimientos.
function InitializeComponent() {
    const isMenu = this instanceof frmMenu;
    view.menu.hidden = !isMenu;
    view.game.hidden = isMenu;
    if (isMenu) {
        view["closed-notice"].hidden = !this.closed;
        document.title = "Laberinto con IA | JavaScript Arcade";
        return;
    }
    const manual = this instanceof frmBeginnerManual;
    const left = this instanceof frmBeginnerAutomaticLeft;
    const title = manual ? "Manual" : left ? "Mano izquierda" : "Mano derecha";
    const message = this.message || this.ObjectWalker?.Message || "";
    document.title = title + " | Laberinto con IA";
    view["game-title"].textContent = manual ? "Tu siguiente movimiento." : "Deja que la IA explore.";
    view["mode-label"].textContent = manual ? "CONTROL MANUAL" : left ? "MANO IZQUIERDA" : "MANO DERECHA";
    view["mode-title"].textContent = title;
    view["mode-icon"].classList.toggle("dpad", manual);
    if (manual) view["mode-icon"].innerHTML = "<i></i>";
    else view["mode-icon"].textContent = left ? "L" : "R";
    view["manual-panel"].hidden = !manual;
    view["automatic-panel"].hidden = manual;
    view["hand-label"].textContent = left ? "izquierda" : "derecha";
    view.walker.style.left = this.picWalker.Left / 475 * 100 + "%";
    view.walker.style.top = this.picWalker.Top / 475 * 100 + "%";
    view["play-badge"].textContent = message ? "META ALCANZADA" : this.running ? "EN MARCHA" : "LISTO PARA JUGAR";
    view["play-badge"].classList.toggle("is-running", Boolean(this.running));
    view["solve-label"].textContent = this.running ? "REINICIAR RECORRIDO" : message ? "VOLVER A RESOLVER" : "RESOLVER LABERINTO";
    view.direction.value = this.txtDirection?.Text || "";
    view["speech-data"].value = this.txtData?.Text || "";
    view["speech-status"].textContent = this.speechStatus || "";
    view.victory.hidden = !message;
    view["victory-text"].textContent = message;
}

// Equivalente de Form.Close: libera recursos de la pantalla que se cierra.
function Close() {
    activeForm = null;
    if (this.tmrBeginner !== null && this.tmrBeginner !== undefined) clearInterval(this.tmrBeginner);
    this.running = false;
    this.mRecognition?.stop();
    menu.closed = false;
    InitializeComponent.call(menu);
}

class frmMenu {
    constructor() { this.closed = false; InitializeComponent.call(this); this.frmMenu_Load(); }
    frmMenu_Load() {}
    btnBeginnerManual_Click() { activeForm = new frmBeginnerManual(); }
    btnBeginnerAutomatic_Click() { activeForm = new frmBeginnerAutomaticRight(); }
    btnBeginnerAutomaticLeft_Click() { activeForm = new frmBeginnerAutomaticLeft(); }
    btnExit_Click() { this.closed = true; InitializeComponent.call(this); }
}

class frmBeginnerManual {
    constructor() {
        this.ObjectWalker = new Walker();
        this.mMatrix = labyrinthMatrix;
        this.picWalker = {Left:50, Top:25};
        this.txtData = {Text:""};
        this.mRecognition = null;
        this.speechStatus = "";
        this.frmLaberynth_Load();
        InitializeComponent.call(this);
    }
    StartSpeech() {
        this.ObjectWalker.InitializeGrammar();
        const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!Recognition) { this.speechStatus = "Reconocimiento de voz no disponible en este navegador."; return; }
        try {
            const recognition = new Recognition();
            this.mRecognition = recognition;
            recognition.lang = "en-US";
            recognition.continuous = true;
            recognition.interimResults = false;
            recognition.onresult = event => {
                if (activeForm !== this) return;
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    this.MRecognition_SpeechRecognized(null, {Result:{Text:event.results[i][0].transcript.trim().toLowerCase()}});
                }
            };
            recognition.onerror = () => {
                if (activeForm !== this) return;
                this.speechStatus = "No se pudo iniciar el micrófono. Usa las flechas del teclado.";
                InitializeComponent.call(this);
            };
            recognition.onend = () => {
                if (activeForm !== this) return;
                this.speechStatus = "Reconocimiento de voz detenido.";
                InitializeComponent.call(this);
            };
            recognition.start();
            this.speechStatus = "Voz activada: permite el acceso al micrófono.";
        } catch { this.speechStatus = "Reconocimiento de voz no disponible."; }
    }
    MRecognition_SpeechRecognized(sender, e) {
        this.ObjectWalker.ControlSpeechMoves(this.picWalker, this.txtData, e);
        InitializeComponent.call(this);
    }
    frmLaberynth_Load() {
        this.ObjectWalker.CreateMatrix(19, 19);
        this.ObjectWalker.InitializeMatrix(this.mMatrix);
        this.ObjectWalker.InitializeRoad();
        this.ObjectWalker.LocalizeStart();
        this.StartSpeech();
    }
    frmLaberynth_KeyDown(sender, e) {
        this.ObjectWalker.ControlMovesInLaberynth(this.picWalker, e);
        InitializeComponent.call(this);
    }
    picWalker_Click() {}
}

class frmBeginnerAutomaticLeft {
    constructor() {
        this.ObjectNPC = new NonPlayerCharacter();
        this.mMatrix = labyrinthMatrix;
        this.picWalker = {Left:50, Top:25};
        this.mStartLocation = null;
        this.txtDirection = {Text:""};
        this.tmrBeginner = null;
        this.running = false;
        this.message = "";
        this.frmBeginnerAutomaticLeft_Load();
        InitializeComponent.call(this);
    }
    frmBeginnerAutomaticLeft_Load() {
        this.ObjectNPC.CreateMatrix(19, 19);
        this.ObjectNPC.InitializeMatrix(this.mMatrix);
        this.ObjectNPC.InitializeRoad();
        this.mStartLocation = {...this.picWalker};
    }
    btnSolve_Click() {
        clearInterval(this.tmrBeginner);
        this.ObjectNPC.InitializeRoad();
        this.ObjectNPC.LocalizeStart();
        this.picWalker.Left = this.mStartLocation.Left;
        this.picWalker.Top = this.mStartLocation.Top;
        this.message = "";
        this.ObjectNPC.DetermineStartDirection();
        this.ObjectNPC.RapidMovementWithLeftHandAI(this.picWalker);
        this.txtDirection.Text = "";
        this.running = true;
        InitializeComponent.call(this);
        this.tmrBeginner = setInterval(() => this.tmrBeginner_Tick(), 50);
    }
    btnExit_Click() {
        clearInterval(this.tmrBeginner);
        Close.call(this);
    }
    tmrBeginner_Tick() {
        this.ObjectNPC.RapidMovementWithLeftHandAI(this.picWalker);
        if (this.ObjectNPC.DetermineFinishDirection(this.picWalker)) {
            clearInterval(this.tmrBeginner);
            this.running = false;
            this.message = "Has llegado al final";
        }
        InitializeComponent.call(this);
    }
}

class frmBeginnerAutomaticRight {
    constructor() {
        this.ObjectNPC = new NonPlayerCharacter();
        this.mMatrix = labyrinthMatrix;
        this.picWalker = {Left:50, Top:25};
        this.mStartLocation = null;
        this.txtDirection = {Text:""};
        this.tmrBeginner = null;
        this.running = false;
        this.message = "";
        this.frmBeginnerAutomatic_Load();
        InitializeComponent.call(this);
    }
    frmBeginnerAutomatic_Load() {
        this.ObjectNPC.CreateMatrix(19, 19);
        this.ObjectNPC.InitializeMatrix(this.mMatrix);
        this.ObjectNPC.InitializeRoad();
        this.mStartLocation = {...this.picWalker};
    }
    btnSolve_Click() {
        clearInterval(this.tmrBeginner);
        this.ObjectNPC.InitializeRoad();
        this.ObjectNPC.LocalizeStart();
        this.picWalker.Left = this.mStartLocation.Left;
        this.picWalker.Top = this.mStartLocation.Top;
        this.message = "";
        this.ObjectNPC.DetermineStartDirection();
        this.ObjectNPC.RapidMovementWithRightHandAI(this.picWalker);
        this.txtDirection.Text = "";
        this.running = true;
        InitializeComponent.call(this);
        this.tmrBeginner = setInterval(() => this.tmrBeginner_Tick(), 50);
    }
    btnExit_Click() {
        Close.call(this);
    }
    txtDirection_TextChanged() {}
    tmrBeginner_Tick() {
        this.ObjectNPC.RapidMovementWithRightHandAI(this.picWalker);
        if (this.ObjectNPC.DetermineFinishDirection(this.picWalker)) {
            clearInterval(this.tmrBeginner);
            this.running = false;
            this.message = "Haz llegado al final";
        }
        InitializeComponent.call(this);
    }
}

const menu = new frmMenu();
document.querySelector('[data-mode="manual"]').addEventListener("click", () => menu.btnBeginnerManual_Click());
document.querySelector('[data-mode="right"]').addEventListener("click", () => menu.btnBeginnerAutomatic_Click());
document.querySelector('[data-mode="left"]').addEventListener("click", () => menu.btnBeginnerAutomaticLeft_Click());
view["menu-exit"].addEventListener("click", () => menu.btnExit_Click());
view["solve-button"].addEventListener("click", () => activeForm?.btnSolve_Click());
view["game-exit"].addEventListener("click", () => {
    if (activeForm instanceof frmBeginnerManual) Close.call(activeForm);
    else activeForm?.btnExit_Click();
});
window.addEventListener("keydown", event => {
    if (activeForm instanceof frmBeginnerManual && ["ArrowRight","ArrowLeft","ArrowUp","ArrowDown"].includes(event.key)) {
        event.preventDefault();
        activeForm.frmLaberynth_KeyDown(null, event);
    }
});
view.walker.addEventListener("click", () => { if (activeForm instanceof frmBeginnerManual) activeForm.picWalker_Click(); });
window.addEventListener("pagehide", () => { if (activeForm) Close.call(activeForm); });
