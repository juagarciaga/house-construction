'use client'

import _ from "lodash";
import { useEffect, useState } from "react";
import { calculateTotalExpenseByAgnosticType } from "../commons";
import { useRomaneios } from "../context/RomaneiosContext";
import DashboardLayout from "../dashboard.layout";
import { RomaneioItem } from "../lists/romaneios.list";
import { eventsTranslate } from "../translate.dic";

export default function Page() {
    const [filterBy, setFilterBy] = useState<string>(eventsTranslate['pt']['selectFilter']);
    const [filters, setfilters] = useState<string[]>([]);

    const { romaneios, loading } = useRomaneios();

    const byFilter = _.groupBy(romaneios.filter((i) => i.provider !== `Terreno`), filterBy);

    useEffect(() => {
        setfilters(Object.keys(romaneios?.[0] ?? []));
    }, [romaneios]);

    const generateRandomColor = (): string => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const data = Object.values(byFilter).map((items: RomaneioItem[]) => items.reduce((sum, item) => sum + Number(item.value), 0));
    const piedata = data.map((item, index) => {
        return {
            value: Number(item.toFixed(2)),
            color: generateRandomColor(),
            label: Object.keys(byFilter)[index],
            // percentage: 
        };
    })

    const totalObra = calculateTotalExpenseByAgnosticType(
        romaneios.filter((i) => i.isInRomaneio)
    )

    const calcPercentage = (value: number): number => {
        return Number(((value / totalObra) * 100).toFixed(2));
    }

    const translateColumn = (column: string): string =>
        eventsTranslate['pt'][`${column}`]


    return (
        <DashboardLayout>
            <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8 py-6">
                <div className="max-w-7xl mx-auto w-full">
                    {/* Loading State */}
                    {loading && (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                            <p className="ml-3 text-lg text-gray-600 animate-pulse">Carregando métricas...</p>
                        </div>
                    )}

                    {/* Header Section */}
                    <div className="mb-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                            Métricas do Projeto
                        </h2>
                        <p className="text-gray-600">Análise detalhada dos gastos por categoria</p>
                    </div>

                    {/* Filter Section */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/30 mb-8">
                        <label className="block text-sm font-semibold text-gray-800 mb-3">
                            <div className="flex items-center mb-2">
                                <div className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></div>
                                {eventsTranslate['pt']['selectFilter']}
                            </div>
                        </label>
                        <div className="relative">
                            <select
                                id="filter-select"
                                name="filter"
                                onChange={(e) => setFilterBy(e.target.value)}
                                className="w-full appearance-none rounded-xl bg-white py-3 pl-4 pr-10 text-base text-gray-900 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-200 hover:border-gray-300 shadow-sm hover:shadow-md"
                                defaultValue={filterBy}
                            >
                                <option value={filterBy}>{filterBy}</option>
                                {filters.map((column: string) => (
                                    <option key={column} value={column}>{translateColumn(column)}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                    <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Results Table */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/30 overflow-hidden">
                        <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-indigo-100">
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                                <div className="w-3 h-3 bg-indigo-500 rounded-full mr-3"></div>
                                Distribuição por {translateColumn(filterBy)}
                            </h3>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                            {translateColumn(filterBy)}
                                        </th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                            Percentual
                                        </th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                            Valor
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {_.orderBy(piedata, ['value'], ['desc']).map((item, index) => (
                                        <tr
                                            key={item.label}
                                            className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group"
                                            style={{ animationDelay: `${index * 100}ms` }}
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div
                                                        className="w-4 h-4 rounded-full mr-3 shadow-sm group-hover:scale-110 transition-transform duration-200"
                                                        style={{ backgroundColor: item.color }}
                                                    ></div>
                                                    <span className="text-sm font-medium text-gray-900 group-hover:text-gray-700 transition-colors duration-200">
                                                        {item.label}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex flex-col items-center">
                                                    <span className="text-lg font-bold text-indigo-600 group-hover:text-indigo-800 transition-colors duration-200">
                                                        {calcPercentage(item.value)}%
                                                    </span>
                                                    <div className="w-12 bg-gray-200 rounded-full h-1.5 mt-1 overflow-hidden">
                                                        <div
                                                            className="bg-indigo-500 h-1.5 rounded-full transition-all duration-1000 ease-out"
                                                            style={{
                                                                width: `${calcPercentage(item.value)}%`,
                                                                backgroundColor: item.color
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-lg group-hover:bg-green-100 transition-colors duration-200">
                                                    R$ {item.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Summary Card */}
                    <div className="mt-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                        <div className="text-white text-center">
                            <h4 className="text-lg font-semibold mb-2">Total Analisado</h4>
                            <p className="text-3xl font-bold">
                                R$ {totalObra.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                            <p className="text-blue-100 text-sm mt-2">
                                {piedata.length} categorias encontradas
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
