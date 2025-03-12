'use client'
import axios from "axios";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';


export default function FormAddEdit({ toggleForm }: { toggleForm: () => void }) {

  const today = new Date();

  const [whoPaid, setWhoPaid] = useState('Sebas');
  const [sending, setSending] = useState(false);
  const [paidDate, setPaidDate] = useState(today);
  const [paidType, setPaidType] = useState('Fijo');
  const [category, setCategory] = useState('Casa');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [id, setId] = useState(uuidv4());


  const month = paidDate.getMonth() + 1;
  const year = paidDate.getFullYear();

  const handleSubmit = async (event: React.FormEvent) => {
    setSending(true);
    event.preventDefault();
    setId(uuidv4());

    const payload = {
      id,
      whoPaid,
      paidDate,
      paidType,
      category,
      description,
      value,
      month,
      year
    };

    await updateItem(payload);
  };

  const updateItem = async (payload: Record<string, unknown>): Promise<void> => {
    try {
      await axios.put('https://ucn9prowa5.execute-api.us-east-1.amazonaws.com/dev/items', payload);
      toggleForm();
      setSending(false);
    } catch (error) {
      setSending(false);
      console.error('Error updating item:', error);
    }
  };



  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

      <div className="fixed inset-0 bg-gray-800/75 transition-opacity" aria-hidden="true" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto flex-col justify-center items-center w-100">
        <form onSubmit={handleSubmit} className="max-width-5xl mx-auto bg-gray-800 rounded-lg p-8 shadow-lg ">
          <h1 className="text-white text-lg">Add Expense</h1>
          <hr className="border-gray-600 my-4" />

          <div className="sm:col-span-3">
            <label htmlFor="who-paid" className="block text-sm/6 font-medium text-white">Quien Pagó?</label>
            <div className="mt-2 grid grid-cols-1">
              <select id="who-paid" name="who-paid" onChange={(e) => setWhoPaid(e.target.value)} autoComplete="who-paid" className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-black outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" defaultValue={whoPaid}>
                <option>Juli</option>
                <option>Sebas</option>
              </select>
              <svg className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="paid-date" className="block text-sm/6 font-medium text-white">Fecha de pago:</label>
            <input onChange={(e) => setPaidDate(new Date(e.target.value))} type="date" id="paid-date" name="paid-date" className="block w-full rounded-md bg-white px-3 text-base text-black outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"></input>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="paid-type" className="block text-sm/6 font-medium text-white">Tipo</label>
            <div className="mt-2 grid grid-cols-1">
              <select onChange={(e) => setPaidType(e.target.value)} id="paid-type" name="paid-type" autoComplete="paid-type" className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-black outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                <option>Fijo</option>
                <option>Variable</option>
              </select>
              <svg className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="category" className="block text-sm/6 font-medium text-white">Tipo</label>
            <div className="mt-2 grid grid-cols-1">
              <select onChange={(e) => setCategory(e.target.value)} id="category" name="category" autoComplete="category" className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-black  outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                <option>Casa</option>
                <option>Carro</option>
                <option>Nenes</option>
                <option>Hobbie</option>
                <option>Ifood</option>
                <option>Salidas</option>
                <option>Viajes</option>
                <option>Salud</option>
                <option>Casa Nueva</option>
              </select>
              <svg className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="description" className="block text-sm/6 font-medium text-white">Descripción</label>
            <div className="mt-2">
              <input onChange={(e) => setDescription(e.target.value)} type="text" name="description" id="description" autoComplete="description" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="value" className="block text-sm/6 font-medium text-white">Valor</label>
            <div className="mt-2">
              <input onChange={(e) => setValue(e.target.value)} step="0.01" placeholder="0.00" type="number" name="value" id="value" autoComplete="value" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm/6 font-semibold text-white" onClick={() => toggleForm()}>Cancel</button>
            <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{sending ? 'Sending...' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
