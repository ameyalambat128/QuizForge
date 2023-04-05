import { useState } from "react";

type Props = {
  name: string;
  color: string;
  textColor: string;
  height: number;
  width: number;
};

export default function Button({
  name,
  color,
  textColor,
  height,
  width,
}: Props) {
  const [clicked, setClicked] = useState(false);
  return (
    <button
      className={`bg-white p-2 text-${textColor} w-${width} h-${height} rounded`}
      onClick={() => setClicked(!clicked)}
    >
      {name}
    </button>
  );
}
