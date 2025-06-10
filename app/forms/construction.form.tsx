'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { RomaneioItem } from "../lists/romaneios.list";

export const romeT = [
  {
    "id": uuidv4(),
    "week": 41,
    "provider": "Baoba Madeiras",
    "ccoMaterial": "MA - Material",
    "clasification": "PISOS - 14.4. CERÂMICOS EXTERNOS",
    "note": "2.633",
    "value": "170.00",
    "createdDate": "2025-05-12T00:00:00.001Z",
    "expiredDate": "2025-06-01T00:00:00.001Z",
    "paymentType": "Boleto",
    "obs": "",
    "isInRomaneio": true,
    "month": 6,
    "year": 2025
  },
  {
    "id": uuidv4(),
    "week": 41,
    "provider": "Andaimes Mota",
    "ccoMaterial": "MA - Material",
    "clasification": "SERVIÇOS INICIAIS - 1.3. LOCAÇÃO DE ANDAIMES E MATERIAIS DE OBRA",
    "note": "5.385",
    "value": "120.00",
    "createdDate": "2025-05-19T00:00:00.001Z",
    "expiredDate": "2025-06-06T00:00:00.001Z",
    "paymentType": "Boleto",
    "obs": "",
    "isInRomaneio": true,
    "month": 6,
    "year": 2025
  },
  {
    "id": uuidv4(),
    "week": 41,
    "provider": "FG Esquadrias",
    "ccoMaterial": "MA - Material",
    "clasification": "ESQUADRIAS - 3.1. JANELAS E PORTAS EXTERNAS EM ALUMÍNIO E VIDRO",
    "note": "54.192",
    "createdDate": "2025-06-05T00:00:00.001Z",
    "expiredDate": "2025-06-06T00:00:00.001Z",
    "value": "4810.00",
    "paymentType": "Boleto",
    "obs": "PARCELA 2/2",
    "isInRomaneio": true,
    "month": 6,
    "year": 2025
  },
  {
    "id": uuidv4(),
    "week": 41,
    "provider": "FG Esquadrias",
    "ccoMaterial": "MA - Material",
    "clasification": "ESQUADRIAS - 3.1. JANELAS E PORTAS EXTERNAS EM ALUMÍNIO E VIDRO",
    "note": "54.192",
    "emissao": "6/05/2025",
    "value": "1640.00",
    "createdDate": "2025-06-05T00:00:00.001Z",
    "expiredDate": "2025-06-06T00:00:00.001Z",
    "paymentType": "Boleto",
    "obs": "PARCELA 2/2",
    "isInRomaneio": true,
    "month": 6,
    "year": 2025
  },
  {
    "id": uuidv4(),
    "week": 41,
    "provider": "Taurus Materiais",
    "ccoMaterial": "MA - Material",
    "clasification": "15. KIT DE FECHAMENTO MENSAL",
    "note": "190.946",
    "value": "3818.15",
    "createdDate": "2025-06-02T00:00:00.001Z",
    "expiredDate": "2025-06-03T00:00:00.001Z",
    "paymentType": "Boleto",
    "obs": "",
    "isInRomaneio": true,
    "month": 6,
    "year": 2025
  },
  {
    "id": uuidv4(),
    "week": 41,
    "provider": "Joaquim Arquitetura - Reembolso",
    "ccoMaterial": "MA - Material",
    "clasification": "11. INSTALAÇÕES ELÉTRICAS - 11.3. TOMADAS E INTERRUPTORES",
    "emissao": "4/06/2025",
    "value": "36.80",
    "createdDate": "2025-06-04T00:00:00.001Z",
    "expiredDate": "2025-06-04T00:00:00.001Z",
    "paymentType": "Pix",
    "obs": "",
    "isInRomaneio": true,
    "month": 6,
    "year": 2025
  }
]

export default function ConstructionForm({ toggleForm, item }: { toggleForm: () => void, item: RomaneioItem | undefined }) {
  const today = new Date();
  const [id, setId] = useState(uuidv4());
  const [week, setWeek] = useState(0);
  const [provider, setProvider] = useState('provider');
  const [ccoMaterial, setccoMaterial] = useState('material');
  const [clasification, setClasification] = useState('clasification');
  const [note, setNote] = useState('nota fiscail');
  const [createdDate, setCreatedDate] = useState(today);
  const [expiredDate, setExpiredDate] = useState(today);
  const [value, setValue] = useState('');
  const [paymentType, setpaymentType] = useState('Boleto');
  const [obs, setObs] = useState('');
  const [isChecked, setIsChecked] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const month = createdDate.getMonth() + 1;
  const year = createdDate.getFullYear();

  const handleSubmit = async (event: React.FormEvent) => {
    setIsLoading(true);
    event.preventDefault();
    setId(uuidv4());

    const payload = {
      id,
      week,
      provider,
      ccoMaterial,
      clasification,
      note,
      createdDate,
      expiredDate,
      value,
      paymentType,
      obs,
      month,
      year,
      isInRomaneio: isChecked,
    };

    await updateItem(payload);
    setIsLoading(false);
  };

  const updateItem = async (payload: Record<string, unknown>): Promise<void> => {
    try {
      await axios.put('https://d3cntsq33m.execute-api.us-east-1.amazonaws.com/dev/romaneios', payload);
      // romeT.map(async (item) => {
      //   await axios.put('https://d3cntsq33m.execute-api.us-east-1.amazonaws.com/dev/romaneios', item);
      // });
      toggleForm();
      console.log('Item updated:', payload);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle the checked state
  };

  useEffect(() => {
    if (item?.id) {
      setId(item.id);
      setWeek(Number(item.week));
      setProvider(item.provider);
      setccoMaterial(item.ccoMaterial);
      setClasification(item.clasification);
      setNote(item.note);
      setCreatedDate(new Date(item.createdDate));
      setExpiredDate(new Date(item.expiredDate));
      setValue(item.value);
      setpaymentType(item.paymentType);
      setObs(item.obs);
      setIsChecked(item.isInRomaneio);
    }
  }, [item]);

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

      <div className="fixed inset-0 bg-gray-800/75 transition-opacity" aria-hidden="true" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto flex-col justify-center items-center w-100">
        <form onSubmit={handleSubmit} className="max-width-5xl mx-auto bg-gray-800 rounded-lg p-8 shadow-lg ">
          <h1 className="text-white text-lg">Add Expense</h1>
          <hr className="border-gray-600 my-4" />

          <div className="mt-4 sm:col-span-3">
            <label htmlFor="week" className="block text-sm/6 font-medium text-white">No. Romaneio</label>
            <input onChange={(e) => setWeek(Number(e.target.value))} value={week} id="week" name="week" autoComplete="week" className="block w-full rounded-md bg-white px-3 text-base text-black outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>

          <div className="mt-4 sm:col-span-3">
            <label htmlFor="provider" className="block text-sm/6 font-medium text-white">Fornecedor</label>
            <input onChange={(e) => setProvider(e.target.value)} value={provider} type="text" id="provider" name="provider" autoComplete="provider" className="block w-full rounded-md bg-white px-3 text-base text-black outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>

          <div className="mt-4 sm:col-span-3">
            <label htmlFor="material" className="block text-sm/6 font-medium text-white">Material</label>
            <input onChange={(e) => setccoMaterial(e.target.value)} type="text" value={ccoMaterial} id="material" name="material" autoComplete="material" className="block w-full rounded-md bg-white px-3 text-base text-black outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>

          <div className="mt-4 sm:col-span-3">
            <label htmlFor="clasification" className="block text-sm/6 font-medium text-white">Clasificação de Material ou Serviço</label>
            <input onChange={(e) => setClasification(e.target.value)} value={clasification} type="text" id="clasification" name="clasification" className="block w-full rounded-md bg-white px-3 text-base text-black outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>

          <div className="mt-4 sm:col-span-3">
            <label htmlFor="note" className="block text-sm/6 font-medium text-white">Nota Fiscal</label>
            <input onChange={(e) => setNote(e.target.value)} value={note} type="text" id="note" name="note" className="block w-full rounded-md bg-white px-3 text-base text-black outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>

          <div className="mt-4 sm:col-span-3">
            <label htmlFor="creationDt" className="block text-sm/6 font-medium text-white">Emissão</label>
            <input onChange={(e) => setCreatedDate(new Date(e.target.value))} type="date" id="creationDt" name="creationDt" className="block w-full rounded-md bg-white px-3 text-base text-black outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>

          <div className="mt-4 sm:col-span-3">
            <label htmlFor="expiredDt" className="block text-sm/6 font-medium text-white">Vencimento</label>
            <input onChange={(e) => setExpiredDate(new Date(e.target.value))} type="date" id="expiredDt" name="expiredDt" className="block w-full rounded-md bg-white px-3 text-base text-black outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>

          <div className="mt-4 sm:col-span-3">
            <label htmlFor="value" className="block text-sm/6 font-medium text-white">Valor</label>
            <input onChange={(e) => setValue(e.target.value)} value={value} type="text" name="value" id="value" autoComplete="value" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>

          <div className="mt-4 sm:col-span-3">
            <label htmlFor="paid-type" className="block text-sm/6 font-medium text-white">Tipo</label>
            <div className="grid grid-cols-1">
              <select onChange={(e) => setpaymentType(e.target.value)} defaultValue={paymentType} id="paid-type" name="paid-type" autoComplete="paid-type" className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-black outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                <option>Boleto</option>
                <option>Dinheiro</option>
                <option>Pix</option>
              </select>
              <svg className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <div className="mt-4 sm:col-span-3">
            <label htmlFor="description" className="block text-sm/6 font-medium text-white">Descripción</label>
            <input onChange={(e) => setObs(e.target.value)} value={obs} type="text" name="description" id="description" autoComplete="description" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>

          <div className="mt-4 sm:col-span-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">Gasto está no Romaneio?</span>
            </label>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm/6 font-semibold text-white" onClick={() => toggleForm()}>Cancel</button>
            <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{isLoading ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
