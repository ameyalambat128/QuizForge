import Head from "next/head";
import Image from "next/image";
import TextField from "@/components/TextField";
import Button from "@/components/Button";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  return (
    <>
      <Head>
        <title>Quiz Forge</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/onlyQ.png" />
      </Head>
      <main className="flex min-h-screen flex-col items-center gap-5 pt-5 dark:bg-slate-900 dark:text-white">
        <h1 className="flex items-center justify-center gap-1 text-3xl font-bold tracking-tighter">
          <Image src="/onlyQ.png" alt="logo" width={60} height={50} />
          <Image src="/textIcon.png" alt="logo" width={140} height={50} />
        </h1>
        <Dashboard />
      </main>
    </>
  );
}
