import { useMemo, useState } from "react";
import data from "./data";

const textIconLink = require("./icons8-text-50.png");

function Diagram(props) {
  const { color_scheme, data } = props;
  const { name, data_quality_score, size: radius } = data;
  const { valid_count, invalid_count, missed_count } = data_quality_score[0];
  const totalCount = valid_count + invalid_count + missed_count;

  const circumference = ((radius * 22) / 7) * 2;
  const validCount = (valid_count * circumference) / totalCount;
  const invalidCount = (invalid_count * circumference) / totalCount;
  const missedCount = (missed_count * circumference) / totalCount;

  const strokeWidth = radius * 0.2;
  const svgProps = {
    viewBox: {
      width: radius * 2 + strokeWidth * 2,
      height: radius * 2 + strokeWidth * 2 + (radius * 2) / 5,
    },
  };
  const circleProps = {
    cx: radius + strokeWidth,
    cy: radius + strokeWidth,
    r: radius,
  };

  const circleWithStrokeProps = {
    ...circleProps,
    "stroke-width": strokeWidth,
  };

  const validCountCircleProps = {
    ...circleWithStrokeProps,
    stroke: color_scheme.valid_count,
    "stroke-dasharray": `${validCount} ${circumference - validCount}`,
    "stroke-dashoffset": `${validCount}`,
  };

  const invalidCountCircleProps = {
    ...circleWithStrokeProps,
    stroke: color_scheme.invalid_count,
    "stroke-dasharray": `${invalidCount} ${circumference - invalidCount}`,
    "stroke-dashoffset": `${validCount + invalidCount}`,
  };

  const missingCountCircleProps = {
    ...circleWithStrokeProps,
    stroke: color_scheme.missing_count,
    "stroke-dasharray": `${missedCount} ${circumference - missedCount}`,
    "stroke-dashoffset": "0",
  };

  const heightWidth = radius / 2;
  const imageProps = {
    href: textIconLink,
    x: radius + strokeWidth,
    y: radius + strokeWidth,
    height: heightWidth,
    width: heightWidth,
    transform: `translate(-${heightWidth / 2},-${heightWidth / 2})`,
  };

  const textProps = {
    x: radius + strokeWidth,
    y: radius * 2 + strokeWidth * 2 + (radius * 2) / 10,
    fontSize: (radius * 2) / 10,
  };

  return (
    <div
      style={{
        width: radius * 2 + strokeWidth * 2,
      }}
    >
      <svg viewBox={`0 0 ${svgProps.viewBox.width} ${svgProps.viewBox.height}`}>
        <circle fill="lightblue" {...circleProps}></circle>
        <circle
          fill="transparent"
          stroke="#d2d3d4"
          {...circleWithStrokeProps}
        ></circle>
        <circle fill="transparent" {...validCountCircleProps}></circle>
        <circle fill="transparent" {...invalidCountCircleProps}></circle>
        <circle fill="transparent" {...missingCountCircleProps}></circle>
        <image {...imageProps} />
        <g>
          <text dominant-baseline="middle" text-anchor="middle" {...textProps}>
            {name}
          </text>
        </g>
      </svg>
    </div>
  );
}

function App() {
  const [categories, categoryWiseNodes] = useMemo(() => {
    const categories = [];
    const nodes = {};

    data.nodes.forEach((c) => {
      if (nodes[c.type] === undefined) {
        nodes[c.type] = [c];
        categories.push(c.type);
      } else {
        nodes[c.type] = [...nodes[c.type], c];
      }
    });

    return [categories, nodes];
  }, []);

  const [category, setCategory] = useState();

  const nodes = (category && categoryWiseNodes[category]) || [];

  return (
    <div
      style={{
        margin: 16,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexFlow: "column",
      }}
    >
      <select
        value={category}
        onChange={(event) => {
          setCategory(event.target.value || undefined);
        }}
      >
        <option>Select category</option>
        {categories.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>

      <div style={{ display: "flex", flexDirection: "row", flexFlow: "wrap" }}>
        {nodes.map((node) => {
          return (
            <div key={node.name} style={{ padding: 20 }}>
              <Diagram data={node} color_scheme={data.meta.color_scheme} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
