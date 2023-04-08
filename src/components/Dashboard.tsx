import React, { useState } from "react";
import Button from "./Button";
import Axios from "axios";

function Dashboard() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  // TODO: create loading
  const sendInput = async () => {
    console.log("sent: ", input);
    const { data } = await Axios.post("/api/generate", {
      prompt: input,
    });
    if (!data) setLoading(!loading);
    setOutput(data.message);
    console.log(data);
  };

  const parseMessage = (str: string) => {
    return str.split(/(\n\nAnswer: [A-D]\n\n)/);
  };

  // Checks for Enter Key and Calls Send Input
  const handleKeyDown = (e: any) => {
    // if (e.keyCode === 13) sendInput();
  };


  return (
    <div className="flex min-h-screen flex-col items-center gap-5 bg-[#1B1C1E] pt-5 dark:text-white">
      <textarea
        className="box-border max-w-full rounded border-4 border-[#f1741b] bg-[#303030] p-2 text-white scrollbar-hide font-prototype tracking-wider "
        placeholder="Insert text here..."
        onChange={(e) => setInput(e.target.value)}
        cols={100}
        rows={20}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <button
        className={`hover:scale-105 transition duration-500 ease-in-out h-20 w-40 rounded bg-2B2B2B 
        p-2 text-#F5F5F5 border-4 border-[#f1741b] flex items-center justify-center font-prototype tracking-wider 
        bg-gradient-to-r from-[#d48a35] to-[#e0572a]`}
        style={{ fontSize: "22px" }}
        onClick={() => sendInput()}
      >
        Generate

      </button>

      <div className="flex flex-col justify-center gap-4 rounded-lg p-4">
        {output !== "" &&
          parseMessage(output).map((i, key) => {
            if (key % 2 == 0) {
              return (
                <div
                  className="gradient flex flex-col whitespace-pre-wrap rounded-lg border-2 border-[#f1741b] bg-[#303030] p-4 font-bold text-white shadow-2xl"
                  key={key}
                >
                  {i}
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}

export default Dashboard;
