'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import DashboardLayout from "../dashboard.layout";
import ConstructionForm from "../forms/construction.form";
import RomaneiosList from "../lists/romaneios.list";


interface RomaneioItem {
  id: string;
  provider: string;
  createdDate: string;
  week: string;
  value: string;
  note: string;
  expiredDate: string;
  ccoMaterial: string;
  clasification: string;
  month: string;
  year: string;
  obs: string;
  paymentType: string;
}

export default function Page() {
  const [showForm, setShowForm] = useState(false);
  const [romaneios, setRomaneios] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  const listItem = async () => {
    try {
      const response = await axios.get('https://d3cntsq33m.execute-api.us-east-1.amazonaws.com/dev/romaneios');
      console.log({ response });
      setRomaneios(response.data.items);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error getting items:', error);
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      await axios.delete(`https://ucn9prowa5.execute-api.us-east-1.amazonaws.com/dev/items/${id}`);
      listItem();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  useEffect(() => {
    listItem();
  }, []);

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
