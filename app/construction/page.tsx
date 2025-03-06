'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import ConstructionForm from "../construction.form";

interface RomaneioItem {
  id: string;
  whoPaid: string;
  expenseCategory: string;
  expenseValue: number;
  expenseDate: string;
  description: string;
  month: number;
  year: number;
}

export default function Page() {
  const [showForm, setShowForm] = useState(false);
  const [romaneios, setRomaneios] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  const styleBtn: React.CSSProperties = {
    "position": "absolute",
    "right": "5%",
    "top": "0",
    "background": "gray",
    "borderRadius": "50%",
    "width": "4rem",
    "height": "4rem",
    "fontSize": "3rem",
    "textAlign": "center",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "padding": "0",
  }

  const listItem = async () => {
    try {
      const response = await axios.get('https://d3cntsq33m.execute-api.us-east-1.amazonaws.com/dev/romaneios');
      console.log({response});
      setRomaneios(response.data.items);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error getting items:', error);
    }
  };

  useEffect(() => {
    listItem();
  }, []);

  return (
    <>
      {loading && <p>Loading...</p>}

      {console.log(romaneios)}

      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1>Construction</h1>


        <button onClick={toggleFormVisibility} className="btn mt-4" style={styleBtn}>
          {showForm ? '-' : '+'}
        </button>
        {showForm && <ConstructionForm toggleForm={toggleFormVisibility} />}
      </div>
    </>
  );
}
