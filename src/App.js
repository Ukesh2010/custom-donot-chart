import { useMemo, useState } from "react";
import data from "./data";

const textToIcon = { text: require("./icons8-text-50.png") };

function Diagram(props) {
  const { color_scheme, data } = props;
  const { name, icon, data_quality_score, size } = data;

  const { valid_count, invalid_count, missed_count } = data_quality_score[0];

  return (
    <div
      style={{
        width: size * 2,
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 42 48">
        <circle cx="21" cy="21" r="15.91549430918954" fill="lightblue"></circle>
        <circle
          cx="21"
          cy="21"
          r="15.91549430918954"
          fill="transparent"
          stroke="#d2d3d4"
          stroke-width="3"
        ></circle>

        <circle
          cx="21"
          cy="21"
          r="15.91549430918954"
          fill="transparent"
          stroke={color_scheme.valid_count}
          stroke-width="3"
          stroke-dasharray={`${valid_count} ${100 - valid_count}`}
          stroke-dashoffset={`${valid_count}`}
        ></circle>
        <circle
          cx="21"
          cy="21"
          r="15.91549430918954"
          fill="transparent"
          stroke={color_scheme.invalid_count}
          stroke-width="3"
          stroke-dasharray={`${invalid_count} ${100 - invalid_count}`}
          stroke-dashoffset={`${valid_count + invalid_count}`}
        ></circle>
        <circle
          cx="21"
          cy="21"
          r="15.91549430918954"
          fill="transparent"
          stroke={color_scheme.missing_count}
          stroke-width="3"
          stroke-dasharray={`${missed_count} ${100 - missed_count}`}
          stroke-dashoffset="0"
        ></circle>
        <image
          href={textToIcon[icon]}
          x="50%"
          y="50%"
          height="24"
          width="24"
          transform="translate(-12,-12)"
        />
        <g>
          <text
            x="50%"
            y="90%"
            dominant-baseline="middle"
            text-anchor="middle"
            fontSize={5}
          >
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
            <Diagram
              key={node.name}
              data={node}
              color_scheme={data.meta.color_scheme}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
