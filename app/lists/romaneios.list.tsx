'use client'
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

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
  isInRomaneio: boolean;
}

export default function RomaneiosList() {
  const [loading, setLoading] = useState<boolean>(true);
  const [romaneios, setRomaneios] = useState<RomaneioItem[]>([]);


  const listItem = async () => {
    try {
      const response = await axios.get('https://d3cntsq33m.execute-api.us-east-1.amazonaws.com/dev/romaneios');
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

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={listItem}>
        <Image
          aria-hidden
          src="/refresh.svg"
          alt="refresh icon"
          width={20}
          height={20}
        />
      </button>

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
            <th className="text-center px-1" />
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
    </>
  );
}
