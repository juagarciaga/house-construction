'use client'

import axios from "axios";
import _ from "lodash";
import { useEffect, useState } from "react";
import { calculateTotalExpenseByAgnosticType } from "../commons";
import DashboardLayout from "../dashboard.layout";
import { RomaneioItem } from "../lists/romaneios.list";
import { eventsTranslate } from "../translate.dic";

export default function Page() {
    const [loading, setLoading] = useState<boolean>(true);
    const [romaneios, setRomaneios] = useState<RomaneioItem[]>([]);
    const [filterBy, setFilterBy] = useState<string>(eventsTranslate['pt']['selectFilter']);
    const [filters, setfilters] = useState<string[]>([]);

    const listItem = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                'https://d3cntsq33m.execute-api.us-east-1.amazonaws.com/dev/romaneios'
            );
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


    const byFilter = _.groupBy(romaneios.filter((i) => i.provider !== `Terreno`), filterBy);

    useEffect(() => {
        listItem();
    }, []);

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
            <>
                {loading && <p>Loading...</p>}
                <div className="sm:col-span-3 mb-5">
                    {eventsTranslate['pt']['selectFilter']}
                    <div className="mt-2 grid grid-cols-1">
                        <select id="who-paid" name="who-paid" onChange={(e) => setFilterBy(e.target.value)} autoComplete="who-paid" className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-black outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" defaultValue={filterBy}>
                            <option value={filterBy} defaultValue={filterBy}>{filterBy}</option>
                            {filters.map((column: string) => (
                                <option key={column} value={column}>{translateColumn(column)}</option>
                            ))}
                        </select>
                        <svg className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
                <table className="min-w-full table-auto border-collapse">
                    <thead className="bg-indigo-50 border-b border-indigo-800 text-black">
                        <tr>
                            <th className="text-center px-1">{translateColumn(filterBy)}</th>
                            <th className="text-center px-1">%</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {_.orderBy(piedata, ['value'], ['desc']).map((item) => (
                            <tr key={item.label}>
                                <td className="text-center px-1">{item.label}</td>
                                <td className="text-center px-1">{calcPercentage(item.value)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </>
        </DashboardLayout>
    );
}
