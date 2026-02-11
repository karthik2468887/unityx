import { createContext, useContext, useState, useEffect } from 'react';
import NativeService from '../services/NativeService';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [balance, setBalance] = useState(() => {
        const saved = localStorage.getItem('wallet_balance');
        return saved !== null ? Number(saved) : 25;
    });

    const [purchasedIds, setPurchasedIds] = useState(() => {
        const saved = localStorage.getItem('purchased_concepts');
        return saved ? JSON.parse(saved) : ['con1'];
    });

    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem('wallet_transactions');
        return saved ? JSON.parse(saved) : [
            { id: 'tx1', type: 'credit', amount: 25, date: '21/01/2026', conceptName: 'Welcome Credit' }
        ];
    });

    useEffect(() => {
        localStorage.setItem('wallet_balance', balance);
    }, [balance]);

    useEffect(() => {
        localStorage.setItem('purchased_concepts', JSON.stringify(purchasedIds));
    }, [purchasedIds]);

    useEffect(() => {
        localStorage.setItem('wallet_transactions', JSON.stringify(transactions));
    }, [transactions]);

    const addFunds = (amount) => {
        setBalance(prev => prev + amount);
        setTransactions(prev => [...prev, {
            id: `tx${Date.now()}`,
            type: 'credit',
            amount: amount,
            date: new Date().toLocaleDateString(),
            conceptName: 'Wallet Top-up'
        }]);
    };

    /**
     * Real UPI Payment Flow
     */
    const purchaseConcept = async (concept, isUPI = false) => {
        if (isUPI) {
            await NativeService.triggerUPIIntent('merchant@upi', 'Micro Learning App', concept.price);
            setPurchasedIds(prev => [...prev, concept.id]);
            setTransactions(prev => [...prev, {
                id: `tx${Date.now()}`,
                type: 'debit',
                amount: concept.price,
                date: new Date().toLocaleDateString(),
                conceptName: concept.concept || concept.name
            }]);
            return true;
        }

        if (balance >= concept.price) {
            setBalance(prev => prev - concept.price);
            setPurchasedIds(prev => [...prev, concept.id]);
            setTransactions(prev => [...prev, {
                id: `tx${Date.now()}`,
                type: 'debit',
                amount: concept.price,
                date: new Date().toLocaleDateString(),
                conceptName: concept.concept || concept.name
            }]);
            return true;
        }
        return false;
    };

    const isPurchased = (id) => purchasedIds.includes(id);

    return (
        <WalletContext.Provider value={{ balance, transactions, addFunds, purchaseConcept, isPurchased }}>
            {children}
        </WalletContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWallet = () => useContext(WalletContext);
