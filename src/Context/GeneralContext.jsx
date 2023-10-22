import { createContext, useState } from 'react';

export const GeneralContext = createContext({
    country: '',
    updateCountry: () => {}
});

export function GeneralContextProvider ({children}) {
    const [country, setCountry] = useState('');

    const updateCountry = (selectedCountry) => {
        setCountry(selectedCountry);
    };

    const contextValues = {
        country: country,
        updateCountry: updateCountry
    };
    return (
        <GeneralContext.Provider value={contextValues}>
            {children}
        </GeneralContext.Provider>
    );
};

export default GeneralContextProvider;
