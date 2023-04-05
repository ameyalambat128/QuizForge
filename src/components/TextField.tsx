import { useState } from "react";

export default function TextField() {
  return (
    <textarea
      className="box-border max-w-full rounded bg-slate-200 p-2 text-black"
      placeholder="Text here"
      cols={100}
      rows={20}
    />
  );
}
