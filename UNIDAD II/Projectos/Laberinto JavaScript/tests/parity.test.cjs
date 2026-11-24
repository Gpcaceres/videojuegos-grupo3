"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.resolve(__dirname, "..");
const context = vm.createContext({setTimeout});
for (const name of ["direction","matrix","walker","non-player-character"]) {
    vm.runInContext(fs.readFileSync(path.join(root,"js",name+".js"),"utf8"),context,{filename:name+".js"});
}
const {Walker, NonPlayerCharacter, labyrinthMatrix} = vm.runInContext("({Walker, NonPlayerCharacter, labyrinthMatrix})",context);
const fixtures = JSON.parse(fs.readFileSync(path.join(__dirname,"fixtures/original_decisions.json"),"utf8"));
const traces = JSON.parse(fs.readFileSync(path.join(__dirname,"fixtures/original_routes.json"),"utf8"));
const originalMethods = JSON.parse(fs.readFileSync(path.join(__dirname,"fixtures/original-methods.json"),"utf8"));

test("Mismos metodos que las clases C#; no se agregaron metodos de juego", () => {
    for (const Class of [Walker,NonPlayerCharacter]) {
        const names = Object.getOwnPropertyNames(Class.prototype).filter(name => name !== "constructor" && typeof Object.getOwnPropertyDescriptor(Class.prototype,name).value === "function").sort();
        assert.deepEqual(names, originalMethods[Class.name].slice().sort());
    }
});

test("320 decisiones coinciden con las referencias del C# original", async () => {
    for (const [index,expected] of fixtures.entries()) {
        const npc = new NonPlayerCharacter();
        npc.CreateMatrix(9,9);
        npc.InitializeMatrix(expected.matrix);
        npc.mRow = 4; npc.mColumn = 4; npc.mDirection = expected.initialDirection; npc.mMiliseconds = 0;
        const picWalker = {Left:100,Top:100}, txtDirection = {Text:""};
        let result;
        if (expected.method === "PausedMovementWithAI") result = await npc.PausedMovementWithAI(txtDirection,picWalker);
        else result = npc[expected.method](picWalker);
        assert.deepEqual({row:npc.mRow,column:npc.mColumn,direction:npc.mDirection,x:picWalker.Left,y:picWalker.Top,directionText:txtDirection.Text,finished:Boolean(result)},
            {row:expected.row,column:expected.column,direction:expected.direction,x:expected.x,y:expected.y,directionText:expected.directionText,finished:expected.finished},
            "Caso "+index+" "+expected.method);
    }
});

test("Recorridos completos conservan cada posicion del original", () => {
    for (const [hand,trace] of Object.entries(traces)) {
        const npc = new NonPlayerCharacter();
        npc.CreateMatrix(19,19);npc.InitializeMatrix(labyrinthMatrix);npc.InitializeRoad();npc.LocalizeStart();
        const picWalker = {Left:50,Top:25};
        npc.DetermineStartDirection();
        for (const [tick,expected] of trace.entries()) {
            if(hand === "left") npc.RapidMovementWithLeftHandAI(picWalker);
            else npc.RapidMovementWithRightHandAI(picWalker);
            let finished = false;
            if(tick > 0) finished = npc.DetermineFinishDirection(picWalker);
            assert.deepEqual([npc.mRow,npc.mColumn,picWalker.Left,picWalker.Top],expected,hand+" tick "+tick);
            assert.equal(finished,tick===trace.length-1);
        }
        assert.equal(npc.mRow,17);assert.equal(npc.mColumn,16);
        console.log(hand+": "+(trace.length-1)+" ticks, igual al original.");
    }
});

test("Teclado, voz, paredes y diferencias originales al llegar a meta", () => {
    const walker = new Walker();
    walker.CreateMatrix(19,19);walker.InitializeMatrix(labyrinthMatrix);walker.InitializeRoad();walker.LocalizeStart();walker.InitializeGrammar();
    const pic = {Left:50,Top:25}, txt = {Text:""};
    assert.deepEqual(Array.from(walker.Table),["right","left","up","down"]);
    walker.ControlMovesInLaberynth(pic,{key:"ArrowRight"});assert.equal(walker.mColumn,2);
    walker.ControlMovesInLaberynth(pic,{key:"ArrowDown"});assert.equal(walker.mRow,2);assert.equal(pic.Top,50);
    walker.ControlSpeechMoves(pic,txt,{Result:{Text:"right"}});assert.equal(walker.mColumn,3);assert.equal(pic.Left,75);
    walker.ControlSpeechMoves(pic,txt,{Result:{Text:"hello"}});assert.equal(txt.Text," hello");
    walker.mRow=16;walker.mColumn=16;pic.Left=400;pic.Top=400;
    walker.ControlMovesInLaberynth(pic,{key:"ArrowDown"});assert.equal(walker.mRow,17);assert.equal(walker.Message,"Felicitaciones, buen trabajo.");
    walker.ControlMovesInLaberynth(pic,{key:"ArrowUp"});assert.equal(walker.mRow,17);
    walker.ControlSpeechMoves(pic,txt,{Result:{Text:"up"}});assert.equal(walker.mRow,16);
});

test("Inicializaciones rapida y pausada conservan el movimiento inicial", async () => {
    for(const paused of [false,true]) {
        const npc = new NonPlayerCharacter();npc.CreateMatrix(19,19);npc.InitializeMatrix(labyrinthMatrix);npc.InitializeRoad();npc.LocalizeStart();npc.mMiliseconds=0;
        const pic={Left:50,Top:25},txt={Text:""};
        if(paused) await npc.InitializePausedMovement(txt,pic);else npc.InitializeRapidMovement(pic);
        assert.deepEqual([npc.mRow,npc.mColumn,pic.Left,pic.Top],[2,2,50,50]);
        if(paused) assert.equal(txt.Text,"Down");
    }
});
