import { useState } from "react";

type Props = {
  name: string;
  color: string;
  textColor: string;
  height?: number;
  width?: number;
  onClick: any;
};

export default function Button({
  name,
  color,
  textColor,
  height,
  width,
  onClick,
}: Props) {
  const [clicked, setClicked] = useState(false);

  const sendInput = () => {
    onClick(!clicked);
    console.log(clicked);
  };
  return (
    <button
      className={`bg-white p-2 text-${textColor} w-${width} h-${height} rounded`}
      onClick={() => sendInput()}
    >
      {name}
    </button>
  );
}
