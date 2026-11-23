export type Point = {
  x: number;
  y: number;
};

export const getRandomDeg = (blackList: number[] = []): number => {
  // 0 - 359をランダムに
  const gen = () => Math.floor(Math.random() * 360);

  let random = gen();
  while (blackList.includes(random)) {
    random = gen();
  }
  return random;
};

// aからbへ向かう直線に対して、bを起点に左方向へN進んだ座標を取得
export const getLeftOffsetPoint = (a: Point, b: Point, n: number): Point => {
  //bに向かってのベクトルを取得
  const dx = b.x - a.x;
  const dy = b.y - a.y;

  const length = Math.hypot(dx, dy);

  /*
  b地点からのそのベクトルを左に90度回転(x成分,y成分が逆転)させ、
  そのベクトルの量を1に相殺(lengthで割る)し、最後に求めたい移動量であるnをかける
  */
  return {
    x: b.x + (dy / length) * n,
    y: b.y - (dx / length) * n,
  };
};

export const centerOf = (element: HTMLElement | Element): Point => {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
};

export const distanceBetween = (a: Point, b: Point): number => {
  return Math.hypot(a.x - b.x, a.y - b.y);
};

export const getRequiredDistances = (args: {
  current: Point;
  destination: Point;
}): Point => {
  const { current, destination } = args;

  return {
    x: destination.x - current.x,
    y: destination.y - current.y,
  };
};

// aからbの直線を、ratio[0] : ration[1]に内分する点の座標を返す
export const dividePoints = (
  a: Point,
  b: Point,
  ratio: [number, number],
): Point => {
  const [m, n] = ratio;
  const t = m / (m + n);

  return {
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
  };
};

export const toRadian = (deg: number): number => {
  return (deg * Math.PI) / 180;
};
