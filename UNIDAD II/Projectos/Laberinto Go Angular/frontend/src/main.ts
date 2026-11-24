import {Component,HostListener,OnDestroy} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
interface State{mode:string;matrix:number[][];row:number;column:number;x:number;y:number;directionText:string;message:string;data:string;running:boolean}
interface SpeechEvent{results:{length:number;[index:number]:{[index:number]:{transcript:string}}};resultIndex:number}
interface Recognition{lang:string;continuous:boolean;interimResults:boolean;onresult:((event:SpeechEvent)=>void)|null;onerror:(()=>void)|null;onend:(()=>void)|null;start():void;stop():void}
@Component({selector:'app-root',standalone:true,template:`
<main class="arcade-shell">
<header class="topbar"><a class="brand" href="./" aria-label="Laberinto con IA, inicio"><span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i><i></i></span>LAB<span class="accent">/</span>AI</a><span class="edition">ARCADE EDITION</span><span class="tagline">UN CAMINO. MUCHAS DECISIONES.</span></header>
@if(!mode) {
<section class="welcome"><div class="welcome-copy"><p class="eyebrow">BIENVENIDO AL LABERINTO</p><h1>CADA GIRO<br>ES UNA <span>DECISIÓN.</span></h1><p class="intro">Encuentra la salida a tu manera. Toma el control o deja que la inteligencia artificial marque el camino.</p><div class="welcome-meta"><span><b>19 × 19</b> casillas</span><span><b>3</b> modos de juego</span><span><b>1</b> salida</span></div></div>
<div class="preview-cabinet" aria-hidden="true"><div class="cabinet-top"><span>LABERINTO</span><i></i></div><div class="preview-screen"><img class="preview-maze" src="assets/laberynth-beginner.png" alt=""><img class="preview-player" src="assets/megaman-moving.gif" alt=""><span class="preview-target">✦</span></div><div class="cabinet-bottom"><span class="joystick"></span><div class="cabinet-buttons"><i></i><i></i></div><span>READY TO PLAY</span></div></div></section>
<section aria-labelledby="choose-mode"><div class="section-heading"><h2 id="choose-mode">ELIGE TU MODO</h2><span>NIVEL PRINCIPIANTE</span></div><nav class="mode-grid" aria-label="Modos de juego">
<button class="mode-card manual-card" (click)="load('manual')"><span class="mode-icon dpad" aria-hidden="true"><i></i></span><span class="mode-kind">TÚ TIENES EL CONTROL</span><strong>Modo manual</strong><span class="mode-description">Explora con las flechas del teclado o usa tu voz para avanzar.</span><span class="card-action">JUGAR MANUAL<span class="action-pixel" aria-hidden="true"></span></span></button>
<button class="mode-card right-card" (click)="load('right')"><span class="mode-icon" aria-hidden="true">R</span><span class="mode-kind">INTELIGENCIA ARTIFICIAL</span><strong>Mano derecha</strong><span class="mode-description">Sigue la pared derecha y observa cómo la IA encuentra la salida.</span><span class="card-action">INICIAR RECORRIDO<span class="action-pixel" aria-hidden="true"></span></span></button>
<button class="mode-card left-card" (click)="load('left')"><span class="mode-icon" aria-hidden="true">L</span><span class="mode-kind">INTELIGENCIA ARTIFICIAL</span><strong>Mano izquierda</strong><span class="mode-description">Mismo laberinto. Otra perspectiva. Deja que la pared izquierda te guíe.</span><span class="card-action">INICIAR RECORRIDO<span class="action-pixel" aria-hidden="true"></span></span></button>
</nav></section>
@if(closed) {<p class="notice" role="status">Partida cerrada. Puedes cerrar esta pestaña o elegir otro modo.</p>}
<footer class="menu-footer"><span><span class="accent" aria-hidden="true">✦</span> EL CAMINO SE DESCUBRE JUGANDO.</span><button class="text-button" (click)="exit()">Salir del juego</button></footer>
} @else {
<section class="play-heading"><div><p class="eyebrow">LABERINTO / PRINCIPIANTE</p><h1>{{mode === "manual" ? "Tu siguiente movimiento." : "Deja que la IA explore."}}</h1></div><span class="play-badge" [class.is-running]="state?.running">{{state?.message ? "META ALCANZADA" : state?.running ? "EN MARCHA" : "LISTO PARA JUGAR"}}</span></section>
<section class="game-layout"><div class="game-cabinet"><div class="board-top"><span><i class="status-light" aria-hidden="true"></i>{{mode === "manual" ? "CONTROL MANUAL" : mode === "left" ? "MANO IZQUIERDA" : "MANO DERECHA"}}</span><span>19 × 19</span></div>
<div class="board-scroll"><div class="board" role="img" aria-label="Laberinto de 19 por 19 celdas: verde inicio, amarillo meta">
@if(state) { @for(row of state.matrix; track $index) { @for(cell of row; track $index) {<div class="cell" [class.wall]="cell === 0" [class.start]="cell === 2" [class.finish]="cell === 3"></div>} }
<img class="walker" src="assets/megaman-moving.gif" alt="Caminante" [style.left.%]="state.x / 475 * 100" [style.top.%]="state.y / 475 * 100"> }
</div></div><div class="board-bottom"><span><i class="legend-start"></i>INICIO</span><span><i class="legend-end"></i>META</span><span class="board-mission"><img src="assets/ima_queso.gif" alt="Queso">ENCUENTRA LA SALIDA</span></div></div>
<aside class="control-panel"><div class="panel-title"><span class="mode-icon" [class.dpad]="mode === 'manual'" aria-hidden="true">@if(mode === "manual") {<i></i>} @else { {{mode === "left" ? "L" : "R"}} }</span><div><p class="eyebrow">MODO DE JUEGO</p><h2>{{mode === "manual" ? "Manual" : mode === "left" ? "Mano izquierda" : "Mano derecha"}}</h2></div></div>
@if(mode === "manual") {
<div class="panel-section"><h3>EL TECLADO ES TU MANDO</h3><div class="keyboard" aria-hidden="true"><kbd class="up-key">↑</kbd><kbd>←</kbd><kbd>↓</kbd><kbd>→</kbd></div><p>Usa las flechas para moverte por los caminos del laberinto.</p></div>
<div class="panel-section"><h3>TAMBIÉN PUEDES USAR TU VOZ</h3><div class="voice-commands"><code>right</code><code>left</code><code>up</code><code>down</code></div><p class="speech-status">{{speechStatus}}</p><label class="field-label">Reconocimiento de voz<textarea readonly [value]="state?.data || ''" placeholder="Los textos reconocidos aparecerán aquí."></textarea></label></div>
} @else {
<div class="panel-section"><h3>CADA PARED ES UNA PISTA</h3><p>La IA seguirá la pared {{mode === "left" ? "izquierda" : "derecha"}} hasta encontrar la salida. Observa sus decisiones en cada giro.</p><button class="primary-button" (click)="solve()" [disabled]="busy"><span aria-hidden="true">■</span>{{state?.running ? "REINICIAR RECORRIDO" : state?.message ? "VOLVER A RESOLVER" : "RESOLVER LABERINTO"}}</button></div>
<div class="panel-section"><label class="field-label">Dirección<input readonly [value]="state?.directionText || ''" placeholder="Sin indicación"></label><p class="panel-hint">Un mismo escenario, una ruta diferente para cada mano.</p></div>
}
<button class="secondary-button" (click)="exit()">VOLVER AL MENÚ</button></aside></section>
@if(state?.message) {<div class="victory-message" role="status"><span aria-hidden="true">✦</span><div><strong>¡LABERINTO COMPLETADO!</strong><p>{{state?.message}}</p></div></div>}
<footer class="game-footer">PIENSA. EXPLORA. ENCUENTRA.</footer>
}
@if(error) {<p class="error" role="alert">{{error}}</p>}
</main>
`})
class App implements OnDestroy{
mode='';state:State|null=null;busy=false;error='';closed=false;speechStatus='';
private readonly session=crypto.randomUUID();private timer:ReturnType<typeof setTimeout>|undefined;private recognition:Recognition|undefined;private queue:Promise<void>=Promise.resolve();private epoch=0;
private request(action:string,key='',mode=this.mode):Promise<State|null>{
const generation=this.epoch;let result:State|null=null;
const job=this.queue.then(async()=>{if(generation!==this.epoch)return;this.busy=true;
try{const response=await fetch('/api/game',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({session:this.session,action,key,mode})});
if(!response.ok)throw new Error(await response.text());const data=await response.json() as State;if(generation!==this.epoch)return;if(action!=='exit'){this.state=data;result=data;}this.error='';
}catch(e){this.error='No se pudo comunicar con Go: '+(e instanceof Error?e.message:String(e));}finally{this.busy=false;}});
this.queue=job;return job.then(()=>result);}
async load(mode:string){this.epoch++;this.stop();this.mode=mode;this.closed=false;const state=await this.request('load','',mode);if(state&&mode==='manual')this.StartSpeech();}
async solve(){this.stop();const state=await this.request('solve');if(state?.running)this.schedule();}
private schedule(){this.timer=setTimeout(async()=>{const state=await this.request('tick');if(state?.running)this.schedule();},50);}
@HostListener('window:keydown',['$event']) async keydown(event:KeyboardEvent){if(this.mode==='manual'&&['ArrowRight','ArrowLeft','ArrowUp','ArrowDown'].includes(event.key)){event.preventDefault();await this.request('key',event.key);}}
private StartSpeech(){
const speechWindow=window as unknown as {SpeechRecognition?:new()=>Recognition;webkitSpeechRecognition?:new()=>Recognition};const Constructor=speechWindow.SpeechRecognition||speechWindow.webkitSpeechRecognition;
if(!Constructor){this.speechStatus='Reconocimiento de voz no disponible en este navegador.';return;}
const recognition=new Constructor();this.recognition=recognition;recognition.lang='en-US';recognition.continuous=true;recognition.interimResults=false;
recognition.onresult=event=>{for(let i=event.resultIndex;i<event.results.length;i++){void this.request('speech',event.results[i][0].transcript.trim().toLowerCase());}};
recognition.onerror=()=>{this.speechStatus='No se pudo iniciar el micrófono. Usa las flechas del teclado.';};recognition.onend=()=>{if(this.recognition===recognition)this.speechStatus='Reconocimiento de voz detenido.';};
try{recognition.start();this.speechStatus='Voz activada: permite el acceso al micrófono.';}catch{this.speechStatus='Reconocimiento de voz no disponible.';}}
private stop(){if(this.timer)clearTimeout(this.timer);this.timer=undefined;this.recognition?.stop();this.recognition=undefined;}
async exit(){this.epoch++;this.stop();await this.request('exit');this.closed=!this.mode;this.mode='';this.state=null;}
ngOnDestroy(){this.stop();}}
bootstrapApplication(App).catch(console.error);