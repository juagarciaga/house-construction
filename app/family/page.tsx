'use client'
import Image from "next/image";
import { useState } from "react";
import DashboardLayout from "../dashboard.layout";
import FormAddEdit from "../forms/family-expenses.form";
import ListExpenses from "../lists/expenses.list";

export default function Page() {
  const [showForm, setShowForm] = useState(false);

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  return (
    <DashboardLayout>
      <ListExpenses />
      <button onClick={toggleFormVisibility} className="btn mt-4 largeAddBtn">
        {showForm ? '-' : '+'}
      </button>
      {showForm && <FormAddEdit toggleForm={toggleFormVisibility} />}
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
      </footer>
    </DashboardLayout>
  );
}
