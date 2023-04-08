import { useState } from "react";

export default function TextField({ onSend, buttonClicked }: any) {
  const [input, setInput] = useState("");

  const sendInput = () => {
    onSend(input);
    // console.log("Prop Passed");
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) sendInput();
  };

  return (
    <textarea
      className="box-border max-w-full overflow-hidden rounded bg-slate-200 p-2 text-black"
      placeholder="Text here"
      onChange={(e) => setInput(e.target.value)}
      cols={100}
      rows={20}
      onKeyDown={(e) => handleKeyDown(e)}
    />
  );
}
