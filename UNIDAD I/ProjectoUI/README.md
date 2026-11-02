# Tres en Raya IA · Proyecto 3 · Grupo 3

**Integrantes y responsables:** Germán Cáceres (UnbeatableAI) · Paul Moreno (MediumAI) · Diana Guerra (MinMax, Scrum Master)
**Stack:** Backend **Go** (API REST, solo librería estándar) + Frontend **Angular 22**.

La lógica es un port 1:1 de la **versión oficial del docente**: `UNIDAD I/Material/Tic-Tac-Toe-Game-Windows-Professor/`
(una app de Windows Forms por variante: `Versión-IA-Fuerte`, `Versión-IA-Debil` y `Version-MiniMax`).
**Toda la lógica del juego vive en el backend**; el frontend solo dibuja y anima.

```
ProjectoUI/
├── Backend/                         Go 1.23+
│   ├── cmd/server/main.go           arranque HTTP (:8080)
│   └── internal/
│       ├── api/server.go            rutas REST + sesiones en memoria
│       └── game/
│           ├── board.go             reemplaza ListButtons + GroupBox + MessageBox
│           ├── form.go              = frmTicTacToe (despacha los clics al controlador del modo)
│           ├── controller.go        interfaz común, enums Player/GameState, constantes, catálogo de modos
│           ├── unbeatable_ai.go     ✅ UnbeatableAI  (IA-Fuerte/UnbeatableAIController.cs) — Germán
│           ├── medium_ai.go         IMPLEMENTADO  (IA-Debil/MediumAIController.cs) - Paul
│           ├── minimax_ai.go        🚧 MinMax        (MiniMax/UnbeatableAIController.cs) — Diana
│           └── unbeatable_ai_test.go pruebas (Casos 1, 2, 3 del PDF + exploración exhaustiva)
└── Frontend/                        Angular 22 (zoneless, signals)
    └── src/app/
        ├── core/                    API, store de la partida, sonido, marcador
        └── components/              tablero 3D, fondo animado, selector, inspector IA, resultado
```

## Ejecutar

```bash
# Backend
cd "UNIDAD I/ProjectoUI/Backend"
go test ./...
go run ./cmd/server
```

```bash
# Frontend (otra terminal) — abre http://localhost:4200
cd "UNIDAD I/ProjectoUI/Frontend"
npm install
npm start
```

`ng serve` redirige `/api` al backend con `proxy.conf.json`.

## API

| Método | Ruta | Equivale a (original) |
|---|---|---|
| GET  | `/api/modes` | elegir qué app (variante) abrir |
| POST | `/api/games` `{level}` | abrir el formulario (`frmTicTacToe_Load`) |
| POST | `/api/games/{id}/moves` `{index}` | `btnTicTacToeN_Click` |
| POST | `/api/games/{id}/new` | `btnNew_Click` |
| PUT  | `/api/games/{id}/level` `{level}` | cambiar de variante |

Cada respuesta trae `events` (jugada del usuario, jugada de la JCC, `MessageBox`) en orden, para animarlos.
La JCC juega con la letra **O** y los mensajes son los del docente: `¡Ganó X!`, `¡Ganó O!`, `¡Empate!`.

## Cómo completar tu modo (Diana)

1. Abre tu archivo en `Backend/internal/game/` (`minimax_ai.go`): arriba dice qué archivo del docente portar y qué cambia.
2. Porta **1:1** la clase del docente. Usa `unbeatable_ai.go` como guía (`showUserMove`, `showNPCMove`, `pick`, `CheckWinner`). Los enums y constantes ya están en `controller.go`.
3. Implementa los métodos de la interfaz `Controller` (`PlayUser`, `PlayNPC`, `Flag`, `Weights`).
4. En `controller.go` → `Modes`, pon `Implemented: true`.
5. Agrega pruebas en `internal/game/<modo>_test.go` y corre `go test ./...`.
6. El frontend lo habilita solo (lee `/api/modes`). Para MiniMax, los mensajes del docente son `You Win!`, `AI Wins!` e `It's a Draw!`; el frontend ya los reconoce.

## Hallazgos sobre la lógica del docente (se conservan, no se corrigen)

- **No es 100 % imbatible.** `TestOriginalLogicExhaustive` recorre todas las partidas: la JCC pierde en ~1,1 % de los caminos. Cuando ninguna regla aplica, juega al azar y puede dejar un *tenedor* (ej.: X0, O4, X7, O2, X6).
- **El lado 3 nunca se elige.** En `PlayNPC`, la condición del lado aleatorio compara `SIDE_INDICES[0]` dos veces, así que solo salen 1, 5 o 7 (`TestSideRuleNeverPicksThree`).
- **Protección añadida:** si un `do/while` aleatorio no tiene casillero válido, el original se quedaría en un bucle infinito. Aquí se sigue con la jugada heurística para no colgar el servidor. En ~15 000 partidas exploradas no ocurrió nunca.

