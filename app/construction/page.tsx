'use client'

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import ConstructionForm from "../construction.form";


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
    <>
      {loading && <p>Loading...</p>}

      <table className="table-auto border-collapse w-full">
        <thead>
          <tr>
            <th className="text-center px-1">Fornecedor</th>
            <th className="text-center px-1">Material</th>
            <th className="text-center px-1">Classifição</th>
            <th className="text-center px-1">Nota Fiscal</th>
            <th className="text-center px-1">Emissão</th>
            <th className="text-center px-1">Valor</th>
            <th className="text-center px-1">Vencimento</th>
            <th className="text-center px-1">Forma de pagamento</th>
            <th className="text-center px-1">OBS:</th>
          </tr>
        </thead>
        <tbody>
          {romaneios.map((item: RomaneioItem) => (
            <tr key={item.id}>
              <td className="text-center px-1">{item.provider}</td>
              <td className="text-center px-1">{item.ccoMaterial}</td>
              <td className="text-center px-1">{item.clasification}</td>
              <td className="text-center px-1">{item.note}</td>
              <td className="text-center px-1">{item.createdDate}</td>
              <td className="text-center px-1">{item.value}</td>
              <td className="text-center px-1">{item.expiredDate}</td>
              <td className="text-center px-1">{item.paymentType}</td>
              <td className="text-center px-1">{item.obs}</td>
              <td className="text-center px-1 flex align-center justify-center cursor-pointer" onClick={() => deleteExpense(item.id)}>
                <Image
                  aria-hidden
                  src="/delete.svg"
                  alt="delete icon"
                  width={20}
                  height={20}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
