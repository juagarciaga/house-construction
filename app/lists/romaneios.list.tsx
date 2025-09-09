'use client';
import _ from 'lodash';
import Image from 'next/image';
import { useState } from 'react';
import {
  calculateTotalExpenseByAgnosticType,
  computeTotalExpenseFormated,
  formatCurrency,
  formatDate,
} from '../commons';
import { useRomaneios } from '../context/RomaneiosContext';
import ConstructionForm from '../forms/construction.form';
import { eventsTranslate } from '../translate.dic';

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
  const [activeRomaneio, setActiveRomaneio] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedItemEdit, setSelectedItemEdit] = useState<RomaneioItem | undefined>(undefined);

  const { romaneios, loading, refreshRomaneios, deleteRomaneio } = useRomaneios();

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  const editExpense = (item: RomaneioItem) => {
    setSelectedItemEdit(item);
    toggleFormVisibility();
  };

  const toogleRomaneio = (index: number) => {
    if (activeRomaneio === index && isOpen) {
      // If clicking on the same romaneio that's already open, close it
      setIsOpen(false);
    } else {
      // If clicking on a different romaneio or opening a closed one
      setActiveRomaneio(index);
      setIsOpen(true);
    }
  };


  const scopoTotal = 810000;
  const total = calculateTotalExpenseByAgnosticType(romaneios);
  const progress1 = (total * 100);
  const progressByMoney = progress1 / scopoTotal;

  const totalByObra = calculateTotalExpenseByAgnosticType(romaneios.filter((i) => i.provider !== 'Terreno' && i.provider !== 'Admin'));
  const progressByObra = totalByObra / total * 100

  const remainingBudget = formatCurrency(scopoTotal - calculateTotalExpenseByAgnosticType(romaneios))

  const romaneiosByWeek = _.groupBy(romaneios, 'week');

  return (
    <div className="min-h-screen max-w-screen w-full overflow-x-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8 py-6">
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="ml-3 text-lg text-gray-600 animate-pulse">Loading...</p>
        </div>
      )}

      {showForm && <ConstructionForm toggleForm={toggleFormVisibility} item={selectedItemEdit ?? undefined} />}

      {/* Progress Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Construction Progress */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-white/20">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 animate-pulse"></div>
              {eventsTranslate['pt']['progressbyConstruction']}: {progressByObra.toFixed(2)}%
            </h2>
            <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-1000 ease-out shadow-sm"
                style={{ width: `${progressByObra}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Money Progress */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-white/20">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center">
              <div className="w-2 h-2 bg-green-600 rounded-full mr-3 animate-pulse"></div>
              {eventsTranslate['pt']['progressbyMoney']}: {progressByMoney.toFixed(2)}%
            </h2>
            <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-1000 ease-out shadow-sm"
                style={{ width: `${progressByMoney}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 border border-white/30 group hover:border-blue-200">
              <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                <span className="font-medium text-blue-600">Valor Base</span> <span className="text-sm text-gray-500">(Terreno + Construção)</span>:{' '}
                <span className='font-bold text-lg text-gray-900'>{formatCurrency(scopoTotal)}</span>
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 border border-white/30 group hover:border-indigo-200">
              <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                <span className="font-medium text-indigo-600">Valor Metro Cuadrado Construido</span> <span className="text-sm text-gray-500">(170m)</span>:{' '}
                <span className='font-bold text-lg text-gray-900'>{formatCurrency(calculateTotalExpenseByAgnosticType(romaneios.filter((i) => i.isInRomaneio)) / 170)}</span>
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 border border-white/30 group hover:border-purple-200">
              <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                <span className="font-medium text-purple-600">Valor Metro Cuadrado Total</span> <span className="text-sm text-gray-500">(240m)</span>:{' '}
                <span className='font-bold text-lg text-gray-900'>{formatCurrency(calculateTotalExpenseByAgnosticType(romaneios) / 240)}</span>
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 border border-white/30 group hover:border-teal-200">
              <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                <span className="font-medium text-teal-600">Gastos Obra</span> <span className="text-sm text-gray-500">(Material + Mão de Obra)</span>:{' '}
                <span className="font-bold text-lg text-gray-900">
                  {computeTotalExpenseFormated(
                    romaneios.filter((i) => i.isInRomaneio)
                  )}
                </span>
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 border border-white/30 group hover:border-orange-200">
              <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                <span className="font-medium text-orange-600">Fora dos Romaneios</span> <span className="text-sm text-gray-500">(Terreno + Admin + Prefeitura + Moveis)</span>:{' '}
                <span className="font-bold text-lg text-gray-900">
                  {computeTotalExpenseFormated(
                    romaneios.filter((i) => !i.isInRomaneio)
                  )}
                </span>
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-blue-400">
              <p className="text-white">
                <span className="font-medium">Gastos totais</span>:{' '}
                <span className='font-bold text-xl'>{computeTotalExpenseFormated(romaneios)}</span>
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-green-400">
              <p className="text-white">
                <span className="font-medium">Remanescente</span>:{' '}
                <span className="font-bold text-xl">{remainingBudget}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center mb-8">
          <button
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 group"
            onClick={refreshRomaneios}
          >
            <Image
              aria-hidden
              src="/refresh.svg"
              alt="refresh icon"
              width={20}
              height={20}
              className="group-hover:rotate-180 transition-transform duration-500"
            />
            <span>Actualizar</span>
          </button>
        </div>

        {/* Romaneios by Week */}
        {romaneiosByWeek &&
          Object.keys(romaneiosByWeek).map((week, index) => {
            const expenses = Object.values(romaneiosByWeek)[index];

            return (
              <div
                key={week}
                className="w-full max-w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/30 mb-6 overflow-hidden group"
              >
                <div
                  className="p-4 sm:p-6 cursor-pointer bg-gradient-to-r from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100 transition-all duration-300"
                  onClick={() => toogleRomaneio(index)}
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center">
                      <div className="w-3 h-3 bg-indigo-500 rounded-full mr-3"></div>
                      Semana {week}
                    </h3>
                    <div className="flex items-center space-x-3">
                      <span className="bg-indigo-100 text-indigo-800 px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm font-medium">
                        {computeTotalExpenseFormated(expenses)}
                      </span>
                      <div className={`transform transition-transform duration-300 ${activeRomaneio === index && isOpen ? 'rotate-180' : ''}`}>
                        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {activeRomaneio === index && isOpen ? (
                  <div className="animate-fade-in w-full">
                    <div className="overflow-x-auto max-w-full">
                      <table className="w-full min-w-max divide-y divide-gray-200">
                        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                          <tr>
                            {['Fornecedor', 'Material', 'Classificação', 'Nota Fiscal', 'Emissão', 'Valor', 'Vencimento', 'Forma de pagamento', 'OBS', '', ''].map((header, headerIndex) => (
                              <th key={headerIndex} className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap min-w-24">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {expenses.map((item: RomaneioItem, itemIndex: number) => (
                            <tr
                              key={item.id}
                              className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 ${itemIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                            >
                              <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900 min-w-32">{item.provider}</td>
                              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700 min-w-32">{item.ccoMaterial}</td>
                              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700 min-w-28">{item.clasification}</td>
                              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700 min-w-24">{item.note}</td>
                              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700 min-w-28">{formatDate(item.createdDate)}</td>
                              <td className="px-3 py-4 whitespace-nowrap text-sm font-semibold text-green-600 min-w-28">{formatCurrency(Number(item.value))}</td>
                              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700 min-w-28">{formatDate(item?.expiredDate)}</td>
                              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700 min-w-32">{item.paymentType}</td>
                              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700 min-w-20">{item.obs}</td>

                              <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium min-w-16">
                                <button
                                  className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200 p-2 hover:bg-indigo-50 rounded-lg group"
                                  onClick={() => editExpense(item)}
                                >
                                  <Image
                                    aria-hidden
                                    src="/edit.svg"
                                    alt="edit icon"
                                    width={16}
                                    height={16}
                                    className="group-hover:scale-110 transition-transform duration-200"
                                  />
                                </button>
                              </td>

                              <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium min-w-16">
                                <button
                                  className="text-red-600 hover:text-red-800 transition-colors duration-200 p-2 hover:bg-red-50 rounded-lg group"
                                  onClick={() => deleteRomaneio(item.id)}
                                >
                                  <Image
                                    aria-hidden
                                    src="/delete.svg"
                                    alt="delete icon"
                                    width={16}
                                    height={16}
                                    className="group-hover:scale-110 transition-transform duration-200"
                                  />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
      </div>
    </div>
  );
}
