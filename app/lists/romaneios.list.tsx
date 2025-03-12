'use client'
import axios from "axios";
import _ from "lodash";
import Image from "next/image";
import { useEffect, useState } from "react";
import { calculateTotalExpenseByAgnosticType, formatCurrency, formatDate } from "../commons";

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
  const [activeRomaneio, setActiveRomaneio] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);


  const listItem = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://d3cntsq33m.execute-api.us-east-1.amazonaws.com/dev/romaneios');
      setRomaneios(response.data.items);
      console.log("nnnn", response.data.items.length);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error getting items:', error);
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      await axios.delete(`https://d3cntsq33m.execute-api.us-east-1.amazonaws.com/dev/romaneios/${id}`);
      // setRomaneios(romaneios.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const toogleRomaneio = (index: number) => {
    setActiveRomaneio(index);
    setIsOpen(!isOpen)
  };

  useEffect(() => {
    listItem();
  }, []);


  const romaneiosByWeek = _.groupBy(romaneios, 'week');
  return (
    <>
      {loading && <p>Loading...</p>}

      <p className="mt-3">Total Obra: <span>{calculateTotalExpenseByAgnosticType(romaneios.filter((i) => i.isInRomaneio))}</span></p>
      <p className="mt-3">Gastos totais: <span>{calculateTotalExpenseByAgnosticType(romaneios)}</span></p>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={listItem}>
        <Image
          aria-hidden
          src="/refresh.svg"
          alt="refresh icon"
          width={20}
          height={20}
        />
      </button>

      {romaneiosByWeek && Object.keys(romaneiosByWeek).map((week, index) => {

        const expenses = Object.values(romaneiosByWeek)[index]

        return (
          <div key={week} className="overflow-x-auto scrollable-table shadow-lg border border-gray-200 sm:rounded-lg mb-4 p-3 cursor-pointer" onClick={() => toogleRomaneio(index)}>
            <p className="p-4">Romaneio {week} - Total {calculateTotalExpenseByAgnosticType(expenses)}</p>

            {activeRomaneio === index && isOpen ? (
              <table className="min-w-full table-auto border-collapse">
                <thead className="bg-indigo-50 border-b border-indigo-800 text-black">
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
                    <th className="text-center px-1 text-transparent" >D</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {expenses.map((item: RomaneioItem) => (
                    <tr key={item.id} className="hover:bg-indigo-50 transition-colors hover:text-black">
                      <td className="text-center px-1">{item.provider}</td>
                      <td className="text-center px-1">{item.ccoMaterial}</td>
                      <td className="text-center px-1">{item.clasification}</td>
                      <td className="text-center px-1">{item.note}</td>
                      <td className="text-center px-1">{formatDate(item.createdDate)}</td>
                      <td className="text-center px-1">{formatCurrency(Number(item.value))}</td>
                      <td className="text-center px-1">{formatDate(item.expiredDate)}</td>
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
            ) : null}
          </div>
        )
      })}


    </>
  );
}
