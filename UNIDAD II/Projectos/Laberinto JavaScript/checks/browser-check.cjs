"use strict";
const fs=require("node:fs"),path=require("node:path"),{pathToFileURL}=require("node:url"),{spawn}=require("node:child_process"),assert=require("node:assert/strict");
const root=path.resolve(__dirname,".."),out=path.join(root,"checks/screenshots");fs.mkdirSync(out,{recursive:true});
const routes=JSON.parse(fs.readFileSync(path.join(root,"tests/fixtures/original_routes.json"),"utf8"));
let browser,ws;
async function run(){
 browser=spawn("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",["--headless","--disable-gpu","--no-first-run","--deny-permission-prompts","--remote-debugging-port=9225","--user-data-dir="+path.join(root,"checks/.edge-preview",String(Date.now())),"about:blank"],{windowsHide:true,stdio:"ignore"});
 let pages;for(let i=0;i<60;i++){try{pages=await(await fetch("http://127.0.0.1:9225/json")).json();if(pages.some(p=>p.type==="page"))break}catch{}await new Promise(r=>setTimeout(r,200))}
 if(!pages)throw Error("No se pudo conectar a Edge");
 ws=new WebSocket(pages.find(p=>p.type==="page").webSocketDebuggerUrl);await new Promise((r,j)=>{ws.onopen=r;ws.onerror=j});
 let id=0,pending=new Map(),errors=[];
 ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const t=pending.get(m.id);if(t){pending.delete(m.id);m.error?t.j(Error(JSON.stringify(m.error))):t.r(m.result)}}if(m.method==="Runtime.exceptionThrown")errors.push(m.params.exceptionDetails.text)};
 function cdp(method,params={}){return new Promise((r,j)=>{const key=++id;pending.set(key,{r,j});ws.send(JSON.stringify({id:key,method,params}))})}
 async function ev(expression){const r=await cdp("Runtime.evaluate",{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result.value}
 async function wait(expression){for(let i=0;i<220;i++){if(await ev(expression))return;await new Promise(r=>setTimeout(r,100))}throw Error("Espera agotada: "+expression)}
 async function shot(name){await cdp("Page.bringToFront");await ev("new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))");const r=await cdp("Page.captureScreenshot",{format:"png",captureBeyondViewport:true});fs.writeFileSync(path.join(out,name+".png"),Buffer.from(r.data,"base64"))}
 async function alignment(selector){return ev("(()=>{const a=document.querySelector("+JSON.stringify(selector)+").getBoundingClientRect(),b=document.querySelector(\".walker\").getBoundingClientRect();return Math.abs(a.left-b.left)<1&&Math.abs(a.top-b.top)<1})()")}
 await cdp("Runtime.enable");await cdp("Page.enable");
 await cdp("Emulation.setDeviceMetricsOverride",{width:1440,height:1100,deviceScaleFactor:1,mobile:false});
 await cdp("Page.navigate",{url:pathToFileURL(path.join(root,"index.html")).href});
 await wait("document.readyState===\"complete\"&&typeof menu!==\"undefined\"&&!document.getElementById(\"menu\").hidden");
 assert.equal(await ev("document.querySelectorAll(\".mode-card\").length"),3);await shot("javascript-desktop");
 await ev("document.querySelector(\"[data-mode=manual]\").click()");await wait("activeForm instanceof frmBeginnerManual");
 assert.ok(await alignment(".start"));
 for(const key of ["ArrowRight","ArrowDown"]){await cdp("Input.dispatchKeyEvent",{type:"keyDown",key});await cdp("Input.dispatchKeyEvent",{type:"keyUp",key})}
 assert.deepEqual(await ev("[activeForm.ObjectWalker.mRow,activeForm.ObjectWalker.mColumn]"),[2,2]);
 await ev("activeForm.MRecognition_SpeechRecognized(null,{Result:{Text:\"right\"}})");
 assert.equal(await ev("activeForm.ObjectWalker.mColumn"),3);
 await ev("activeForm.MRecognition_SpeechRecognized(null,{Result:{Text:\"<script>hello</script>\"}})");
 assert.equal(await ev("document.querySelector(\"textarea\").value")," <script>hello</script>");
 await ev("document.getElementById(\"game-exit\").click()");await wait("activeForm===null&& !view.menu.hidden");
 console.log("PASS manual: apertura file://, paredes, teclado y manejador de voz.");
 for(const hand of ["right","left"]){
  await ev("document.querySelector(\"[data-mode="+hand+"]\").click()");
  await shot("javascript-game-"+hand);
  await ev("document.getElementById(\"solve-button\").click()");
  await wait("activeForm.running");
  await new Promise(r=>setTimeout(r,180));
  await ev("document.getElementById(\"solve-button\").click()");
  assert.deepEqual(await ev("[activeForm.ObjectNPC.mRow,activeForm.ObjectNPC.mColumn]"),routes[hand][0].slice(0,2));
  await wait("!view.victory.hidden");
  assert.deepEqual(await ev("[activeForm.ObjectNPC.mRow,activeForm.ObjectNPC.mColumn,activeForm.running]"),[17,16,false]);
  assert.ok(await alignment(".finish"));
  assert.equal(await ev("view.direction.value"),"");
  await shot("javascript-victory-"+hand);
  await ev("document.getElementById(\"solve-button\").click()");
  const closed=await ev("(()=>{const old=activeForm;view[\"game-exit\"].click();return old.running===false&&activeForm===null})()");assert.ok(closed);
  console.log("PASS "+hand+": resolver, reiniciar, meta alineada y cancelar.");
 }
 await cdp("Emulation.setDeviceMetricsOverride",{width:390,height:1100,deviceScaleFactor:1,mobile:true});
 assert.equal(await ev("document.documentElement.scrollWidth"),390);await shot("javascript-mobile");
 await ev("document.querySelector(\"[data-mode=left]\").click()");
 const layout=await ev("({page:document.documentElement.scrollWidth,board:view.walker.parentElement.parentElement.scrollWidth,visible:view.walker.parentElement.parentElement.clientWidth})");
 assert.equal(layout.page,390);assert.ok(layout.board<=layout.visible);assert.ok(await alignment(".start"));await shot("javascript-game-mobile");
 await ev("view[\"solve-button\"].click()");await wait("!view.victory.hidden");assert.ok(await alignment(".finish"));
 await ev("view[\"game-exit\"].click();view[\"menu-exit\"].click()");assert.equal(await ev("view[\"closed-notice\"].hidden"),false);
 assert.deepEqual(errors,[]);
 console.log("PASS movil: tablero completo, meta y salida; sin errores JavaScript.");
}
run().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>{ws?.close();browser?.kill()});
