import {
  centerOf,
  distanceBetween,
  dividePoints,
  getLeftOffsetPoint,
  getRandomDeg,
  getRequiredDistances,
  type Point,
} from "@/utils/math";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  animationConfig,
  colors,
  DEFAULT_ROTATION_TIMES,
  RADIUS,
} from "../constants";

type RouletteProps = {
  people: string[];
  onAnimationEnd?: (person: string) => void;
};

export const Roulette = ({ people, onAnimationEnd }: RouletteProps) => {
  const initialized = useRef<boolean>(false);
  const rouletteRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  const degreePerPerson = 360 / people.length;
  const conicGradient = people
    .map((_, i) => colors[i % colors.length])
    .map((color, i) => {
      return i === 0
        ? `${color} ${degreePerPerson}deg`
        : i === people.length - 1
          ? `${color} ${degreePerPerson * i}deg `
          : `${color} ${degreePerPerson * i}deg ${degreePerPerson * (i + 1)}deg`;
    })
    .join(",");

  const [tempCalcElementEnabled, setTempCalcElementEnabled] =
    useState<boolean>(true);
  const [nameContainerPositions, setNameContainerPositions] = useState<
    {
      width: number;
      height: number;
      translateX: number;
      translateY: number;
      deg: number;
    }[]
  >([]);

  const rotationRef = useRef<number>(0);
  const rotate = async () => {
    if (!rouletteRef.current) return;

    rotationRef.current++;
    const refNum = rotationRef.current;

    const degrees = people.map((_, i) => degreePerPerson * i);
    const blackList = Number.isInteger(degreePerPerson)
      ? Array(360)
          .fill(0)
          .map((_, i) => i)
          .filter((num) => num % degreePerPerson === 0)
      : [];

    const targetDeg = getRandomDeg(blackList);

    const res = rouletteRef.current.animate(
      [
        { transform: "rotate(0)" },
        {
          transform: `rotate(${360 * DEFAULT_ROTATION_TIMES + targetDeg}deg)`,
        },
      ],
      animationConfig,
    );

    await res.finished;

    // 立て続けに呼んだ場合に最後の実行だけを許可する
    if (rotationRef.current !== refNum) {
      return;
    }

    if (onAnimationEnd) {
      // degreesを大きい方から見ていって、最初にtargetDegを超えたものが当たりのインデックスに一致する
      const targetIndex = degrees
        .reverse()
        .findIndex((deg) => targetDeg >= deg);
      onAnimationEnd(people[targetIndex]);
    }
  };

  useLayoutEffect(() => {
    if (!barsRef.current.length) return;
    if (!barsRef.current.every(Boolean)) return;
    if (!rouletteRef.current) return;

    if (initialized.current) return;

    const bars: {
      ref: HTMLDivElement;
      endCoordinate: Point;
    }[] = (barsRef.current as HTMLDivElement[]).map((bar) => ({
      ref: bar,
      endCoordinate: centerOf(bar.children[0]),
    }));

    const centerOfRoulette = centerOf(rouletteRef.current);

    const ratio: [number, number] = [1, 3];
    for (let i = 0; i < bars.length; i++) {
      const current = bars[i];
      const next = bars[i + 1] ?? bars[0];

      const currentDivisionPoint = dividePoints(
        centerOfRoulette,
        current.endCoordinate,
        ratio,
      );
      const nextDivisionPoint = dividePoints(
        centerOfRoulette,
        next.endCoordinate,
        ratio,
      );

      let cursor = 0;
      let cursorPoint: Point;

      while (true) {
        cursorPoint = getLeftOffsetPoint(
          currentDivisionPoint,
          nextDivisionPoint,
          cursor,
        );
        const distance = distanceBetween(centerOfRoulette, cursorPoint);

        if (distance <= RADIUS) {
          cursor++;
        } else {
          break;
        }
      }

      const width = distanceBetween(cursorPoint, nextDivisionPoint);
      const height = distanceBetween(currentDivisionPoint, nextDivisionPoint);

      const { x: xAmount, y: yAmount } = getRequiredDistances({
        current: centerOfRoulette,
        destination: nextDivisionPoint,
      });

      setNameContainerPositions((prev) => {
        const _prev = [...prev];
        _prev.push({
          width: width,
          height: height,
          translateX: xAmount,
          translateY: yAmount - height,
          deg: degreePerPerson * i - (90 - degreePerPerson / 2),
        });
        return _prev;
      });
    }

    // 後処理
    requestAnimationFrame(() => {
      setTempCalcElementEnabled(false);
    });

    initialized.current = true;
  }, [degreePerPerson]);

  useEffect(() => {
    // コンポーネントが破棄される時はアニメーション終了時の通知を発火させないためにrefをあえて狂わせる
    return () => {
      rotationRef.current++;
    };
  }, []);

  return (
    <div className="w-full p-2">
      <section className="relative">
        <button
          className="absolute bg-blue-300 p-2 rounded-md cursor-pointer"
          onClick={rotate}
        >
          GO
        </button>
        <div className="w-3 h-10 bg-black m-auto absolute left-1/2 -translate-x-1/2 -top-6 z-10"></div>
        <div
          className="bg-red-300 w-125 h-125 rounded-full m-auto relative"
          style={{
            background: `conic-gradient(${conicGradient})`,
          }}
          ref={rouletteRef}
        >
          <div className="w-4 h-4 rounded-full bg-black absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"></div>
          {people.map((_, i) => (
            <div
              key={i}
              className={`w-0.5 h-62.5 bg-black absolute left-1/2 -translate-x-1/2 origin-[50%_100%] bar-${i}`}
              // Tailwind cssでクラスを組み立てるのに限界がある（挙動が安定しない)ためインラインスタイルで
              style={{
                transform: `rotate(${(360 / people.length) * i}deg)`,
              }}
              ref={(el) => {
                if (el) {
                  barsRef.current[i] = el;
                }
              }}
            >
              {tempCalcElementEnabled && (
                <div className="absolute w-3 h-3 top-0 left-1/2 -translate-y-1/2 -translate-x-1/2"></div>
              )}
            </div>
          ))}
          {nameContainerPositions.map(
            ({ width, height, translateX: x, translateY: y, deg }, i) => (
              <div
                key={i}
                className="person-name absolute top-1/2 left-1/2 origin-bottom-left"
                style={{
                  width,
                  height,
                  transform: `translate(${x}px, ${y}px) rotate(${deg}deg)`,
                }}
              >
                <span className="p-1 font-bold absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                  {people[i]}
                </span>
              </div>
            ),
          )}
        </div>
      </section>
    </div>
  );
};
