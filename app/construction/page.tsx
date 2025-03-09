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
      <button onClick={toggleFormVisibility} className="btn mt-4 largeAddBtn" >
        {showForm ? '-' : '+'}
      </button>
      {showForm && <ConstructionForm toggleForm={toggleFormVisibility} />}
    </DashboardLayout>
  );
}
