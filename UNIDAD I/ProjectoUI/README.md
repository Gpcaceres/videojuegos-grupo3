# Tres en Raya IA · Proyecto 3 · Grupo 3

**Integrantes:** Diana Guerra · Paul Moreno · Germán Cáceres
**Stack:** Backend **Go** (API REST, solo librería estándar) + Frontend **Angular 22**.

La lógica es un port 1:1 del proyecto C# de referencia (`TicTacToeGameWindows2`).
**Toda la lógica del juego vive en el backend**; el frontend solo dibuja y anima.

```
ProjectoUI/
├── Backend/                      Go 1.23+
│   ├── cmd/server/main.go        arranque HTTP (:8080)
│   └── internal/
│       ├── api/server.go         rutas REST + sesiones en memoria
│       └── game/
│           ├── board.go          reemplaza ListButtons + GroupBox + MessageBox
│           ├── form.go           = frmTicTacToe (despacha clics por GameLevel)
│           ├── controller.go     interfaz común + catálogo de modos
│           ├── strong.go         ✅ UnbeatableAI  (ControlStrongIntelligentMoves)
│           ├── weak.go           🚧 MediumAI      (ControlWeakIntelligentMoves)
│           ├── minmax.go         🚧 UnbeatableAI → MinMax
│           ├── random.go         🚧 Principiante  (ControlRandomMoves)
│           ├── two_users.go      🚧 Dos jugadores (ControlTwoUsers)
│           └── strong_test.go    pruebas (Casos 1, 2, 3 del PDF + exploración exhaustiva)
└── Frontend/                     Angular 22 (zoneless, signals)
    └── src/app/
        ├── core/                 API, store de la partida, sonido, marcador
        └── components/           tablero 3D, fondo animado, selector, inspector IA, resultado
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
| GET  | `/api/modes` | RadioButtons de nivel |
| POST | `/api/games` `{level}` | abrir el formulario |
| POST | `/api/games/{id}/moves` `{index}` | `btnTicTacToeN_Click` |
| POST | `/api/games/{id}/new` | `btnNew_Click` |
| PUT  | `/api/games/{id}/level` `{level}` | `rdbXxx_CheckedChanged` |

Cada respuesta trae `events` (jugada del usuario, jugada de la JCC, `MessageBox`) en orden, para animarlos.

## Cómo completar tu modo (compañeros)

1. Abre tu archivo en `Backend/internal/game/` (`weak.go`, `minmax.go`, …) y porta **1:1** la clase C# indicada. Usa `strong.go` como guía (`showUserMove`, `showNPCMove`, `pick`).
2. En `controller.go` → `Modes`, pon `Implemented: true` y tu nombre en `Owner`.
3. En `api/server.go` → `stateOf`, expón `ArrayMoves/MoveNumber/Flag` de tu controlador.
4. Agrega pruebas en `internal/game/<modo>_test.go` y corre `go test ./...`.
5. El frontend lo habilita solo (lee `/api/modes`).

## Nota sobre la lógica original

La prueba `TestOriginalLogicExhaustive` recorre todas las partidas posibles: la JCC pierde en ~1 % de los caminos. El motivo es que, cuando ninguna regla del método numérico aplica, la JCC juega al azar y puede dejar un *tenedor* (ej.: X0, 0→4, X7, 0→2, X6). Como la especificación pide no cambiar la lógica, se mantiene igual y se documenta.

Única protección añadida: si un `do/while` aleatorio del original no tiene casillero válido, el original se quedaría en un bucle infinito. Aquí se sigue con la jugada heurística para no colgar el servidor.
