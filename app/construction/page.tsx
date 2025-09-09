'use client'

import { useState } from "react";
import DashboardLayout from "../dashboard.layout";
import ConstructionForm from "../forms/construction.form";
import RomaneiosList from "../lists/romaneios.list";



export default function Page() {
  const [showForm, setShowForm] = useState(false);

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  return (
    <DashboardLayout>
      <RomaneiosList />
      <button
        onClick={toggleFormVisibility}
        className={`fixed bottom-6 right-6 w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg hover:shadow-2xl transform transition-all duration-300 ease-out z-40 flex items-center justify-center text-white font-bold text-xl sm:text-2xl hover:scale-110 active:scale-95 ${showForm
            ? 'bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rotate-45'
            : 'bg-gradient-to-br from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700'
          }`}
        aria-label={showForm ? 'Fechar formulário' : 'Adicionar nova despesa'}
      >
        <div className="relative flex items-center justify-center">
          {showForm ? (
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-200"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-200"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>

        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

        {/* Pulse animation when closed */}
        {!showForm && (
          <div className="absolute inset-0 rounded-full bg-white opacity-25 animate-ping"></div>
        )}
      </button>
      {showForm && <ConstructionForm toggleForm={toggleFormVisibility} item={undefined} />}
    </DashboardLayout>
  );
}
