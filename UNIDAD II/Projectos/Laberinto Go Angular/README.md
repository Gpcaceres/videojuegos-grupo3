# Laberinto con IA — Go y Angular

Migración local del proyecto C# WinForms. El proyecto original permanece intacto.

## Ejecutar

Requisitos: Go 1.22 o superior y Node.js 22 LTS o 24 LTS con npm.

En una terminal, desde esta carpeta:

    cd backend
    go run .

En otra terminal:

    cd frontend
    npm install
    npm start

Abre http://localhost:4200. Go escucha en 127.0.0.1:8080. Mantén ambas terminales abiertas.

## Compilar y comprobar

    cd backend
    go test -v ./...
    go build .
    cd ../frontend
    npm run build

## Fidelidad al original

- Misma matriz 19 × 19: 0 pared, 1 camino, 2 inicio y 3 meta.
- Mismos métodos de Walker y NonPlayerCharacter, condiciones y orden de evaluación.
- Se conservan los if independientes de mano derecha, que pueden producir varios movimientos por llamada. No se sustituyen por else if.
- Se conservan los else if de mano izquierda y todas las condiciones anidadas.
- El original no tiene llamadas recursivas; no se introduce un algoritmo recursivo diferente.
- Desplazamientos de 25 píxeles; Resolver mueve primero y cada Tick posterior mueve y comprueba la meta.
- Intervalo nominal de 50 ms, más la latencia de la petición web.
- Se conservan InitializeRapidMovement, InitializePausedMovement y PausedMovementWithAI aunque no sean invocados por los botones.
- El teclado se bloquea al llegar a la meta; la voz mantiene el comportamiento diferente del original.
- Dirección permanece vacía en automático, como txtDirection.Clear del flujo activo original.
- Se reutilizan las imágenes originales del personaje y el queso. El tablero se representa con la misma matriz.

## Adaptaciones de plataforma

Go ejecuta toda la lógica. Angular presenta el juego. Se incorporan únicamente arranque, transporte HTTP, sesiones por pestaña y presentación necesarios para sustituir WinForms, sin nuevas modalidades ni algoritmos.
System.Speech se sustituye por reconocimiento del navegador. Requiere navegador compatible y permiso de micrófono; puede depender del servicio de voz del navegador.
Salir vuelve al menú desde un modo. Desde el menú libera la sesión e indica que puedes cerrar la pestaña; el navegador restringe cerrar pestañas abiertas por el usuario.

## Contrato local

POST /api/game, Content-Type: application/json.
Cuerpo: { "session": "identificador-de-pestaña", "action": "load", "mode": "manual", "key": "" }.

- load: carga manual, left o right.
- solve: reinicia el automático y hace su primer movimiento.
- tick: ejecuta el Tick original y comprueba la meta.
- key: ArrowRight, ArrowLeft, ArrowUp o ArrowDown.
- speech: right, left, up o down.
- exit: libera la sesión.

Respuesta: mode, matrix, row, column, x, y, direction, directionText, message y running. En manual incluye data. exit devuelve { "closed": true }.
Errores: 400 para entrada inválida, 405 para método no admitido y 409 si no se cargó la sesión.

## Pruebas de equivalencia

testdata contiene 320 resultados obtenidos de las condiciones del C# original mediante evaluación en JavaScript (sin sustituir ni simplificar sus if), y los recorridos completos de ambos modos automáticos. No se ejecutó el binario WinForms para obtener estas referencias.
Las pruebas Go comparan las decisiones para las 16 combinaciones de vecinos y cuatro orientaciones, las posiciones de cada Tick y el comportamiento del teclado y voz en paredes y meta.

## Verificaciones realizadas

- go test -v ./...: correcto; 320 decisiones comparadas y recorridos completos de 66 ticks (izquierda) y 161 (derecha).
- go build -o laberinto.exe .: correcto.
- npm run build: correcto.
- API real a través del proxy Angular: modos manual/izquierda/derecha, paredes, voz por HTTP, sesiones independientes, salida, errores y recursos de imagen comprobados.
- No se comprobó visualmente la interfaz en navegador ni el reconocimiento con un micrófono real.

Para repetir la integración, compila primero backend/laberinto.exe e instala las dependencias Angular; desde esta carpeta ejecuta:

    node checks/integration.cjs

La comprobación necesita los puertos 8080 y 4200 libres. Arranca ambos procesos y los cierra al finalizar.


## Interfaz arcade

Tema oscuro con acentos cian, violeta y dorado, selector de modos por tarjetas, marco arcade y controles adaptables. Se conservaron los metodos de Angular y el backend Go.

Compilacion Angular y revision visual realizadas en Edge sin ventana visible: escritorio de 1440 px y movil de 390 px; ambos modos automaticos completan el laberinto desde los botones de la interfaz, sin errores JavaScript. Capturas en checks/screenshots/.

El tablero se ajusta completo al ancho del movil. Se verifico la alineacion del personaje con inicio y meta, manteniendo las coordenadas y movimientos originales.
