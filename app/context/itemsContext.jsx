import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

// Create the context
const ItemsContext = createContext();

// Create the provider component
const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch items from the API
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          'https://d3cntsq33m.execute-api.us-east-1.amazonaws.com/dev/romaneios'
        );
        const data = await response.data.items;
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <ItemsContext.Provider value={items}>{children}</ItemsContext.Provider>
  );
};

export { ItemsContext, ItemsProvider };
