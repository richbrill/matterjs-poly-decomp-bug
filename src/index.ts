import { Application, Graphics } from 'pixi.js';
import { debounce } from 'lodash';
import polylabel from 'polylabel';
import Region from './centroid';

const app = new Application({
  view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  antialias: true
});

const setMousePosition = e => {
  const pos = e.data.global;

  const xDistance = pos.x - graphics.x;
  const yDistance = pos.y - graphics.y;
  graphics.rotation = Math.atan2(yDistance, xDistance) * 3 / Math.PI;
};

const graphics = new Graphics();

// let's create a moving shape
app.stage.addChild(graphics);
graphics.x = 800 / 2;
graphics.y = 600 / 2;

// center the polygons anchor point


const user = {
  points: [0, 0, 150, -150, 220, 30, 130, 100, 50, 40, 0, 0],
  name: 'RichB'
};

const points = user.points;
let polygon = [];
app.stage.interactive = true;
//app.stage.on('pointermove', debounce(setMousePosition, 10));
graphics.lineStyle(2, 0xffffff, 1);

graphics.moveTo(points[0], points[1]);
for (let i = 2; i < points.length; i += 2) {
  polygon.push({
    x: points[i],
    y: points[i + 1]
  });
  graphics.lineTo(points[i], points[i + 1]);
  graphics.beginFill(0xffffff);
  graphics.drawCircle(points[i], points[i + 1], 3);
}

graphics.endFill();

const rotateToPoint = (mx, my, px, py) => {
  const distY = my - py;
  const distX = mx - px;
  const angle = Math.atan2(distY, distX);
  return angle;
}

// const center = polylabel(polygon, 1.0);
// const average = points.reduce((a, b) => Math.abs(a) + Math.abs(b), 0) / points.length;
// console.log('center', center);

// var polygon = [
//         {"x": -1.2, "y": 5.1},
//         {"x": -1.3, "y": 5.2},
//         {"x": -1.8, "y": 5.9},
//         {"x": -1.9, "y": 5.8}
//     ],
const area = new Region(polygon);
const region = area.centroid();
console.log('region', region);

// TODO Need to work out how to change the pivot when the size of the polygon changes
graphics.pivot.x = region.x;  
graphics.pivot.y = region.y;

app.ticker.add(delta => {

  // Rotate users polygon to "look" at mouse pointer (borrowed from http://proclive.io/shooting-tutorial/)
  graphics.rotation = rotateToPoint(app.renderer.plugins.interaction.mouse.global.x, app.renderer.plugins.interaction.mouse.global.y, graphics.position.x, graphics.position.y);
  
});
