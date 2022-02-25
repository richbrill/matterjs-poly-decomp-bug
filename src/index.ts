import { Engine, Bodies, Composite, Render, Runner, Common } from 'matter-js';

// create an engine
var engine = Engine.create();

// Add poly-decomp, uncommenting this causes this error "Uncaught TypeError: Cannot read properties of undefined (reading 'type')"
// but only when using the Clockwise concave polygon below
Common.setDecomp(require('poly-decomp'));

// create a renderer
var render = Render.create({
  element: document.body,
  engine: engine
});

// Clockwise concave polygon
// const vertices = [
//   {x: 8, y: 9}, 
//   {x: 86, y: 28},
//   {x: 95, y: 77},
//   {x: 76, y: 158},
//   {x: 35, y: 137},
//   {x: 28, y: 69},
//   {x: 8, y: 9}
// ]

// Counter-Clockwise concave polygon (comment this out and uncomment the above Clockwise polygon to see the error)
const vertices = [
  {x: 8, y: 9},
  {x: 28, y: 69},
  {x: 35, y: 137},
  {x: 76, y: 158},
  {x: 95, y: 77},
  {x: 86, y: 28},
  {x: 8, y: 9}
]

const body = Bodies.fromVertices(600, 200, vertices, { isStatic: true }, true, 0.01, 10, 0.01);

// Add body to matter
Composite.add(engine.world, [
  body
]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);