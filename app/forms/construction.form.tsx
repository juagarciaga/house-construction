'use client'
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useRomaneios } from "../context/RomaneiosContext";
import { RomaneioItem } from "../lists/romaneios.list";

export default function ConstructionForm({ toggleForm, item }: { toggleForm: () => void, item: RomaneioItem | undefined }) {

  const { refreshRomaneios, updateRomaneio, romaneios } = useRomaneios();

  const today = new Date();
  const [id, setId] = useState(uuidv4());
  const [week, setWeek] = useState(0);
  const [provider, setProvider] = useState('provider');
  const [providerBySelect, setProviderBySelect] = useState('providerBySelect');
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

    const payload: RomaneioItem = {
      id,
      provider: providerBySelect === 'custom' ? provider : providerBySelect,
      createdDate: createdDate.toISOString(),
      week: String(week),
      value,
      note,
      expiredDate: expiredDate.toISOString(),
      ccoMaterial,
      clasification,
      month: String(month),
      year: String(year),
      obs,
      paymentType,
      isInRomaneio: isChecked,
    };

    await updateItem(payload);
    setIsLoading(false);
  };

  const updateItem = async (payload: RomaneioItem): Promise<void> => {
    try {
      await updateRomaneio(payload);
      refreshRomaneios();
      toggleForm();
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
      setProvider(providerBySelect === 'custom' ? item.provider : providerBySelect);
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

  const uniqueProviders = [...new Set(romaneios.map(r => r.provider))].filter(Boolean);
  const uniqueMaterials = [...new Set(romaneios.map(r => r.ccoMaterial))].filter(Boolean);
  const uniqueClasifications = [...new Set(romaneios.map(r => r.clasification))].filter(Boolean);


  return (
    <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" aria-hidden="true" />

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 w-full overflow-y-auto flex items-center justify-center p-4">
        <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 animate-fade-in"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-white/80 rounded-full mr-3 animate-pulse"></div>
                  <h1 className="text-xl font-bold text-white">
                    {item?.id ? 'Editar Despesa' : 'Adicionar Despesa'}
                  </h1>
                </div>
                <button
                  type="button"
                  onClick={toggleForm}
                  className="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-2 transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6 space-y-6">
              {/* Week Number */}
              <div className="group">
                <label htmlFor="week" className="block text-sm font-semibold text-gray-800 mb-2 flex items-center">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></div>
                  No. Romaneio
                </label>
                <input
                  onChange={(e) => setWeek(Number(e.target.value))}
                  value={week}
                  id="week"
                  name="week"
                  type="number"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-200 hover:border-gray-300 shadow-sm hover:shadow-md"
                  placeholder="Digite o número do romaneio"
                />
              </div>

              {/* Provider */}
              <div className="group">
                <label htmlFor="provider" className="block text-sm font-semibold text-gray-800 mb-2 flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Fornecedor
                </label>
                <div className="relative">
                  <select
                    onChange={(e) => setProviderBySelect(e.target.value)}
                    value={providerBySelect}
                    id="provider"
                    name="provider"
                    className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 pr-10 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-200 hover:border-gray-300 shadow-sm hover:shadow-md"
                  >
                    <option value="provider">Selecione um fornecedor</option>
                    {uniqueProviders.map((providerOption, index) => (
                      <option key={index} value={providerOption}>
                        {providerOption}
                      </option>
                    ))}
                    <option value="custom">+ Adicionar novo fornecedor</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                {providerBySelect === 'custom' && (
                  <input
                    onChange={(e) => setProvider(e.target.value)}
                    type="text"
                    placeholder="Digite o nome do novo fornecedor"
                    className="mt-3 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-200 animate-fade-in"
                  />
                )}
              </div>

              {/* Material */}
              <div className="group">
                <label htmlFor="material" className="block text-sm font-semibold text-gray-800 mb-2 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Material
                </label>
                <div className="relative">
                  <select
                    onChange={(e) => setccoMaterial(e.target.value)}
                    value={ccoMaterial}
                    id="material"
                    name="material"
                    className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 pr-10 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-200 hover:border-gray-300 shadow-sm hover:shadow-md"
                  >
                    <option value="material">Selecione um material</option>
                    {uniqueMaterials.map((materialOption, index) => (
                      <option key={index} value={materialOption}>
                        {materialOption}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Classification */}
              <div className="group">
                <label htmlFor="clasification" className="block text-sm font-semibold text-gray-800 mb-2 flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  Classificação
                </label>
                <div className="relative">
                  <select
                    onChange={(e) => setClasification(e.target.value)}
                    value={clasification}
                    id="clasification"
                    name="clasification"
                    className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 pr-10 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-200 hover:border-gray-300 shadow-sm hover:shadow-md"
                  >
                    <option value="clasification">Selecione uma classificação</option>
                    {uniqueClasifications.map((clasificationOption, index) => (
                      <option key={index} value={clasificationOption}>
                        {clasificationOption}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Two Column Grid for smaller fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Note */}
                <div className="group">
                  <label htmlFor="note" className="block text-sm font-semibold text-gray-800 mb-2 flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                    Nota Fiscal
                  </label>
                  <input
                    onChange={(e) => setNote(e.target.value)}
                    value={note}
                    type="text"
                    id="note"
                    name="note"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-200 hover:border-gray-300 shadow-sm hover:shadow-md"
                    placeholder="Número da nota fiscal"
                  />
                </div>

                {/* Value */}
                <div className="group">
                  <label htmlFor="value" className="block text-sm font-semibold text-gray-800 mb-2 flex items-center">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                    Valor
                  </label>
                  <input
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    type="text"
                    name="value"
                    id="value"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-200 hover:border-gray-300 shadow-sm hover:shadow-md"
                    placeholder="R$ 0,00"
                  />
                </div>
              </div>

              {/* Date Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Created Date */}
                <div className="group">
                  <label htmlFor="creationDt" className="block text-sm font-semibold text-gray-800 mb-2 flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                    Data de Emissão
                  </label>
                  <input
                    onChange={(e) => setCreatedDate(new Date(e.target.value))}
                    value={createdDate.toISOString().split('T')[0]}
                    type="date"
                    id="creationDt"
                    name="creationDt"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-200 hover:border-gray-300 shadow-sm hover:shadow-md"
                  />
                </div>

                {/* Expired Date */}
                <div className="group">
                  <label htmlFor="expiredDt" className="block text-sm font-semibold text-gray-800 mb-2 flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    Data de Vencimento
                  </label>
                  <input
                    onChange={(e) => setExpiredDate(new Date(e.target.value))}
                    value={expiredDate.toISOString().split('T')[0]}
                    type="date"
                    id="expiredDt"
                    name="expiredDt"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-200 hover:border-gray-300 shadow-sm hover:shadow-md"
                  />
                </div>
              </div>

              {/* Payment Type */}
              <div className="group">
                <label htmlFor="paid-type" className="block text-sm font-semibold text-gray-800 mb-2 flex items-center">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mr-2"></div>
                  Forma de Pagamento
                </label>
                <div className="relative">
                  <select
                    onChange={(e) => setpaymentType(e.target.value)}
                    value={paymentType}
                    id="paid-type"
                    name="paid-type"
                    className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 pr-10 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-200 hover:border-gray-300 shadow-sm hover:shadow-md"
                  >
                    <option>Boleto</option>
                    <option>Dinheiro</option>
                    <option>Pix</option>
                    <option>Cartão de Crédito</option>
                    <option>Cartão de Débito</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="group">
                <label htmlFor="description" className="block text-sm font-semibold text-gray-800 mb-2 flex items-center">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                  Observações
                </label>
                <textarea
                  onChange={(e) => setObs(e.target.value)}
                  value={obs}
                  name="description"
                  id="description"
                  rows={3}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-200 hover:border-gray-300 shadow-sm hover:shadow-md resize-none"
                  placeholder="Informações adicionais sobre a despesa..."
                />
              </div>

              {/* Checkbox */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                      className="sr-only"
                    />
                    <div className={`w-6 h-6 rounded-lg border-2 transition-all duration-200 flex items-center justify-center ${isChecked
                        ? 'bg-indigo-600 border-indigo-600'
                        : 'bg-white border-gray-300 group-hover:border-indigo-300'
                      }`}>
                      {isChecked && (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-200">
                    Gasto está incluído no Romaneio
                  </span>
                </label>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 rounded-b-2xl flex flex-col sm:flex-row items-center justify-end space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                type="button"
                className="w-full sm:w-auto px-6 py-2.5 text-gray-700 font-semibold hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200"
                onClick={toggleForm}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Salvando...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    <span>{item?.id ? 'Atualizar' : 'Salvar'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
