# Tres en Raya IA · JavaScript (Web)

**Proyecto 3 · Grupo 3** · Desarrollo de Videojuegos, Unidad 2 (ESPE)
**Integrantes:** Diana Guerra · Paul Moreno · Germán Cáceres

Port a JavaScript del Tic-Tac-Toe del docente (`Tic-Tac-Toe-Game-Windows-Professor`, C# Windows Forms).
Las tres variantes conservan la lógica original y corren en el navegador, sin frameworks ni dependencias.

| Modo | Clase original | Archivo | Responsable |
|---|---|---|---|
| MediumAI | `MediumAIController` (IA débil) | `src/game/medium-ai.js` | Paul Moreno |
| UnbeatableAI | `UnbeatableAIController` (IA fuerte) | `src/game/unbeatable-ai.js` | Germán Cáceres |
| UnbeatableAI · MinMax | `UnbeatableAIController` (MiniMax) | `src/game/minimax-ai.js` | Diana Guerra |

## Ejecutar

Requiere Node.js 20 o superior (solo para el servidor estático y las pruebas).

```bash
cd "UNIDAD II/Projectos/TickTackToe-JavaScript"
npm start            # http://localhost:5173  (PORT=8000 npm start para otro puerto)
npm test             # 24 pruebas de primer nivel con node:test
npm run test:coverage
```

Los módulos ES no cargan desde `file://`, por eso se sirve la carpeta con `server.js`.
Cualquier otro servidor estático sirve igual.

## Estructura

```
TickTackToe-JavaScript/
├── index.html, css/styles.css
├── server.js                 servidor estático sin dependencias
├── src/game/                 lógica (no toca el DOM)
│   ├── constants.js          enum Player/GameState, índices y catálogo de modos
│   ├── board.js              reemplaza ListButtons + GroupBox + MessageBox
│   ├── form.js               = frmTicTacToe (despacha los clics según el nivel)
│   ├── medium-ai.js          MediumAIController
│   ├── unbeatable-ai.js      UnbeatableAIController (método numérico)
│   └── minimax-ai.js         UnbeatableAIController MiniMax + flujo de su formulario
├── src/ui/                   interfaz: dibuja el tablero y anima los eventos
└── test/                     pruebas U01–U08, D01–D08 y M01–M08
```

Cada jugada deja en `Board.events` lo que el usuario ve (jugada de X, jugada de O y `MessageBox`).
La interfaz los reproduce en orden; no decide ninguna jugada.

## Fidelidad al original

- Mismos pesos 0/1/3, mismo orden de reglas y mismos mensajes (`¡Ganó X!`, `AI Wins!`, …).
- Se conserva el error del docente que compara `SIDE_INDICES[0]` dos veces: el lado 3 nunca sale en la regla de suma 5.
- Minimax produce las mismas 2097 decisiones que el C# original (prueba M07, SHA-256).
- Única diferencia: los `do/while` aleatorios sin casilla válida (bucle infinito en el original) siguen con la jugada heurística para no congelar la pestaña.
