import Head from "next/head";
import Image from "next/image";
import TextField from "@/components/TextField";
import Button from "@/components/Button";

export default function Home() {
  return (
    <>
      <Head>
        <title>Quiz Forge</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center gap-5 pt-5 dark:bg-slate-900 dark:text-white">
        <h1 className="text-3xl font-bold tracking-tighter">Quiz Forge</h1>
        <TextField onSend={(input: any) => console.log(input)} />
        <Button
          name="Generate"
          color="white"
          textColor="black"
          height={4}
          width={10}
        />
      </main>
    </>
  );
}
