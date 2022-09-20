import { useState } from "react";

const textToIcon = { text: require("./icons8-text-50.png") };

function Diagram(props) {
  const { color_scheme, data } = props;
  const { name, icon, data_quality_score } = data;

  const { valid_count, invalid_count, missing_count } = data_quality_score;

  return (
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
        stroke-dasharray={`${missing_count} ${100 - missing_count}`}
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
  );
}

function App() {
  const data = {
    meta: {
      color_scheme: {
        valid_count: "green",
        invalid_count: "red",
        missing_count: "gray",
      },
      size: {
        radius: "100px",
      },
    },
    nodes: [
      {
        name: "customer_id",
        icon: "text",
        data_quality_score: {
          valid_count: 70,
          invalid_count: 20,
          missing_count: 10,
        },
      },
    ],
  };

  const [nodeName, setNodeName] = useState();

  const node =
    (nodeName && data.nodes.find((i) => i.name === nodeName)) || undefined;

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
        value={nodeName}
        onChange={(event) => {
          setNodeName(event.target.value || undefined);
        }}
      >
        <option>Select Customer</option>
        {data.nodes.map((item) => (
          <option value={item.name} key={item.name}>
            {item.name}
          </option>
        ))}
      </select>

      {node && (
        <div
          style={{
            width: parseInt(data.meta.size.radius, 10) * 2,
          }}
        >
          <Diagram data={node} color_scheme={data.meta.color_scheme} />
        </div>
      )}
    </div>
  );
}

export default App;
