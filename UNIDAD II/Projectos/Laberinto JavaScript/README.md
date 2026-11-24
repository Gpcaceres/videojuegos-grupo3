# Laberinto con IA - JavaScript Arcade

Proyecto independiente en HTML, CSS y JavaScript puro. Mantiene el diseño arcade de la versión anterior. No modifica los proyectos C# ni Go/Angular.

## Ejecutar

Abre index.html directamente en el navegador. No necesitas instalar dependencias, compilar, ejecutar Go ni iniciar Angular.

La voz requiere navegador compatible con SpeechRecognition o webkitSpeechRecognition y permiso de micrófono. El reconocimiento puede depender del servicio del navegador; el teclado funciona sin conexión.

## Lógica conservada

- Walker: los mismos 11 métodos públicos del C# original, además del constructor y las propiedades Table y Elements.
- NonPlayerCharacter: los mismos 19 métodos públicos del C# original y su constructor.
- Se conservan los nombres, parámetros, orden y condiciones de los movimientos. No se añaden métodos a estas dos clases.
- Misma matriz de 19 por 19, inicio (1,2), meta (17,16), casillas 0/1/2/3 y pasos lógicos de 25 píxeles.
- Se conservan los if independientes de mano derecha, los else if de mano izquierda y todas las condiciones anidadas. No se sustituyen por tablas, rutas precalculadas u otro algoritmo.
- El original no contiene llamadas recursivas; se mantiene su estructura de if.
- Se conservan InitializeRapidMovement, InitializePausedMovement y PausedMovementWithAI aunque los botones no los utilizan.
- Resolver reinicia, determina la dirección inicial y hace el primer movimiento. Cada tick de 50 ms mueve y comprueba la meta.
- La dirección de los modos automáticos queda vacía como en el flujo original.
- Teclado y voz mantienen sus diferencias originales al llegar a la meta.

## Adaptaciones de plataforma

js/app.js conserva los nombres de los formularios y sus manejadores. InitializeComponent actualiza el DOM en lugar de controles WinForms y Close libera el temporizador/micrófono. Son equivalentes de los métodos de presentación originales; no incorporan algoritmos de juego.
PictureBox se representa con un objeto Left/Top y los TextBox con Text. La interfaz refleja esos valores; la escala visual en móvil no altera las coordenadas.
MessageBox se muestra como aviso de victoria dentro de la página. Salir de un modo vuelve al menú; salir del menú permite cerrar la pestaña.
Las dos funciones pausadas usan async/await y setTimeout en lugar de Thread.Sleep, conservando la secuencia de condiciones y movimientos sin bloquear el navegador. Quien las invoque debe usar await.
System.Speech se sustituye por la API de voz del navegador. No se ha añadido un algoritmo de voz ni nuevas órdenes.

## Archivos

- index.html y styles.css: interfaz arcade adaptable.
- js/walker.js y js/non-player-character.js: lógica original traducida directamente desde C#.
- js/direction.js y js/matrix.js: direcciones y matriz originales.
- js/app.js: formularios y eventos de interfaz.
- assets/: imágenes originales.
- tests/: comparaciones con las referencias del C# usadas en la migración previa.

## Pruebas

Con Node.js 22 o superior, desde esta carpeta:

    npm test

No hace falta ejecutar npm install. Las pruebas usan solamente las herramientas incluidas en Node.js.

## Verificación realizada

- Las 5 pruebas automatizadas pasaron: mismos métodos, 320 decisiones, recorridos completos, teclado/voz/paredes/meta e inicializaciones.
- Recorridos iguales a las referencias originales: izquierda 66 ticks; derecha 161 ticks, meta (17,16).
- Apertura directa mediante file:// comprobada en Edge, sin servidor ni peticiones a un backend.
- Botones de los tres modos, teclado, reinicio, cancelación, victoria y salida comprobados en navegador.
- Diseño revisado a 1440 px y 390 px; tablero completo y personaje alineado con inicio y meta, sin desbordamiento horizontal de la página ni errores JavaScript.
- La voz se probó mediante su manejador de eventos; no se usó un micrófono real.
- Capturas guardadas en checks/screenshots/.

La revisión opcional en Windows con Edge y Node.js puede repetirse con:

    node checks/browser-check.cjs

El chequeo utiliza un perfil aislado dentro de checks/.edge-preview/ y cierra el navegador al terminar.
