'use client';
import axios from 'axios';
import _ from 'lodash';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  calculateTotalExpenseByAgnosticType,
  computeTotalExpenseFormated,
  formatCurrency,
  formatDate,
} from '../commons';

export interface RomaneioItem {
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
      const response = await axios.get(
        'https://d3cntsq33m.execute-api.us-east-1.amazonaws.com/dev/romaneios'
      );
      setRomaneios(response.data.items);
      console.log('nnnn', response.data.items.length);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error getting items:', error);
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      await axios.delete(
        `https://d3cntsq33m.execute-api.us-east-1.amazonaws.com/dev/romaneios/${id}`
      );
      setRomaneios(romaneios.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const toogleRomaneio = (index: number) => {
    setActiveRomaneio(index);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    listItem();
  }, []);

  const scopoTotal = 700000;
  const total = calculateTotalExpenseByAgnosticType(romaneios);
  const progress1 = (total * 100);
  const progress = progress1 / scopoTotal;


  const romaneiosByWeek = _.groupBy(romaneios, 'week');

  return (
    <>
      {loading && <p>Loading...</p>}

      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Total Progress: {progress.toFixed(2)}%</h1>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-600 h-4 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <p className="mt-3">
        Acumulado dos Romaneios:{' '}
        <span>
          {computeTotalExpenseFormated(
            romaneios.filter((i) => i.isInRomaneio)
          )}
        </span>
      </p>

      <p className="mt-3">
        Fora dos Romaneios:{' '}
        <span>
          {computeTotalExpenseFormated(
            romaneios.filter((i) => !i.isInRomaneio)
          )}
        </span>
      </p>

      <p className="mt-3">
        Gastos totais:{' '}
        <span>{computeTotalExpenseFormated(romaneios)}</span>
      </p>

      <p className="mt-3">
        Scopo Total:{' '}
        <span>{formatCurrency(scopoTotal)}</span>
      </p>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mb-2"
        onClick={listItem}
      >
        <Image
          aria-hidden
          src="/refresh.svg"
          alt="refresh icon"
          width={20}
          height={20}
        />
      </button>

      {romaneiosByWeek &&
        Object.keys(romaneiosByWeek).map((week, index) => {
          const expenses = Object.values(romaneiosByWeek)[index];

          return (
            <div
              key={week}
              className="overflow-x-auto scrollable-table shadow-lg border border-gray-200 rounded mb-4 p-3 "
            >
              <div
                className="p-4 cursor-pointer"
                onClick={() => toogleRomaneio(index)}
              >
                <p>
                  Romaneio {week} - Total{' '}
                  {computeTotalExpenseFormated(expenses)}
                </p>
              </div>

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
                      <th className="text-center px-1 text-transparent">D</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {expenses.map((item: RomaneioItem) => (
                      <tr
                        key={item.id}
                        className="hover:bg-indigo-50 transition-colors hover:text-black"
                      >
                        <td className="text-center px-1">{item.provider}</td>
                        <td className="text-center px-1">{item.ccoMaterial}</td>
                        <td className="text-center px-1">
                          {item.clasification}
                        </td>
                        <td className="text-center px-1">{item.note}</td>
                        <td className="text-center px-1">
                          {formatDate(item.createdDate)}
                        </td>
                        <td className="text-center px-1">
                          {formatCurrency(Number(item.value))}
                        </td>
                        <td className="text-center px-1">
                          {formatDate(item.expiredDate)}
                        </td>
                        <td className="text-center px-1">{item.paymentType}</td>
                        <td className="text-center px-1">{item.obs}</td>
                        <td
                          className="text-center px-1 flex align-center justify-center cursor-pointer"
                          onClick={() => deleteExpense(item.id)}
                        >
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
          );
        })}
    </>
  );
}
