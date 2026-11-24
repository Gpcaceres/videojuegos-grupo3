const {spawn,execFileSync}=require('child_process');
const assert=require('assert/strict'),path=require('path'),net=require('net');
const root=path.resolve(__dirname,'..');
async function available(port){await new Promise((resolve,reject)=>{const server=net.createServer();server.once('error',reject);server.listen(port,'127.0.0.1',()=>server.close(resolve));});}
async function main(){await available(8080);await available(4200);
const backend=spawn(path.join(root,'backend','laberinto.exe'),[],{cwd:path.join(root,'backend'),windowsHide:true,stdio:['ignore','pipe','pipe']});
const frontend=spawn(process.execPath,[path.join(root,'frontend/node_modules/@angular/cli/bin/ng.js'),'serve','--host','127.0.0.1','--proxy-config','proxy.conf.json'],{cwd:path.join(root,'frontend'),windowsHide:true,stdio:['ignore','pipe','pipe'],env:{...process.env,NG_CLI_ANALYTICS:'false'}});
let errors='';for(const child of [backend,frontend]){child.stdout.on('data',()=>{});child.stderr.on('data',chunk=>{errors+=chunk});}
try{let ready=false;for(let i=0;i<120;i++){if(backend.exitCode!==null||frontend.exitCode!==null)throw Error(errors);try{const r=await fetch('http://127.0.0.1:4200/');if(r.ok){assert.match(await r.text(),/<app-root>/);ready=true;break}}catch{}await new Promise(r=>setTimeout(r,250));}assert.ok(ready,'Angular no arranco');
const base='http://127.0.0.1:4200/api/game';
async function req(session,action,mode='',key='',status=200){const r=await fetch(base,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({session,action,mode,key})});assert.equal(r.status,status);return status===200?await r.json():null;}
let manual=await req('check-manual','load','manual');assert.equal(manual.matrix.length,19);assert.equal(manual.row,1);assert.equal(manual.column,2);
manual=await req('check-manual','key','','ArrowRight');assert.equal(manual.column,2);manual=await req('check-manual','key','','ArrowDown');assert.equal(manual.row,2);
manual=await req('check-manual','speech','','right');assert.equal(manual.column,3);
for(const [hand,expected] of [['left',66],['right',161]]){const session='check-'+hand;await req(session,'load',hand);let state=await req(session,'solve');let ticks=0;while(state.running&&ticks<1000){state=await req(session,'tick');ticks++;}assert.equal(ticks,expected);assert.equal(state.row,17);assert.equal(state.column,16);assert.ok(state.message);assert.equal(state.directionText,'');console.log(hand+': '+ticks+' ticks via proxy Angular');await req(session,'exit');await req(session,'tick','','',409);}
manual=await req('check-manual','key','','ArrowRight');assert.equal(manual.column,4);assert.equal(manual.row,2);
await req('invalid','load','expert','',400);await req('invalid','unknown','','',400);await req('','load','manual','',400);
const method=await fetch(base);assert.equal(method.status,405);
for(const file of ['megaman-moving.gif','ima_queso.gif']){const r=await fetch('http://127.0.0.1:4200/assets/'+file);assert.equal(r.status,200);assert.ok((await r.arrayBuffer()).byteLength>0);}
await req('check-manual','exit');
console.log('PASS: API, proxy Angular, modos, sesiones, errores y recursos originales.');
}finally{frontend.kill();backend.kill();}}
main().catch(e=>{console.error(e);process.exitCode=1;});