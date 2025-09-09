'use client'
import axios from 'axios';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { RomaneioItem } from '../lists/romaneios.list';

interface RomaneiosContextType {
    romaneios: RomaneioItem[];
    loading: boolean;
    refreshRomaneios: () => void;
    addRomaneio: (romaneio: RomaneioItem) => void;
    updateRomaneio: (romaneio: RomaneioItem) => void;
    deleteRomaneio: (id: string) => void;
}

const RomaneiosContext = createContext<RomaneiosContextType | undefined>(undefined);

export const RomaneiosProvider = ({ children }: { children: ReactNode }) => {
    const [romaneios, setRomaneios] = useState<RomaneioItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchRomaneios = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                'https://d3cntsq33m.execute-api.us-east-1.amazonaws.com/dev/romaneios'
            );
            setRomaneios(response.data.items);
        } catch (error) {
            console.error('Error fetching romaneios:', error);
        } finally {
            setLoading(false);
        }
    };

    const refreshRomaneios = () => {
        fetchRomaneios();
    };

    const addRomaneio = (romaneio: RomaneioItem) => {
        setRomaneios(prev => [...prev, romaneio]);
    };

    const updateRomaneio = async (updatedRomaneio: RomaneioItem) => {
        try {
            await axios.put('https://d3cntsq33m.execute-api.us-east-1.amazonaws.com/dev/romaneios', updatedRomaneio);
            setRomaneios(prev =>
                prev.map(item => item.id === updatedRomaneio.id ? updatedRomaneio : item)
            );
        } catch (error) {
            console.error('Error updating romaneio:', error);
        }
    };

    const deleteRomaneioItem = async (id: string) => {
        try {
            await axios.delete(
                `https://d3cntsq33m.execute-api.us-east-1.amazonaws.com/dev/romaneios/${id}`
            );
            setRomaneios(prev => prev.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting romaneio:', error);
        }
    };

    useEffect(() => {
        fetchRomaneios();
    }, []);

    return (
        <RomaneiosContext.Provider value={{
            romaneios,
            loading,
            refreshRomaneios,
            addRomaneio,
            updateRomaneio,
            deleteRomaneio: deleteRomaneioItem
        }}>
            {children}
        </RomaneiosContext.Provider>
    );
};

export const useRomaneios = () => {
    const context = useContext(RomaneiosContext);
    if (context === undefined) {
        throw new Error('useRomaneios must be used within a RomaneiosProvider');
    }
    return context;
};
