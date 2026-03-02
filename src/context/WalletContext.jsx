import { createContext, useContext, useState, useEffect } from 'react';
import NativeService from '../services/NativeService';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const { user } = useAuth();

    const [balance, setBalance] = useState(() => {
        const saved = localStorage.getItem('wallet_balance');
        return saved !== null ? Number(saved) : 25;
    });

    const [purchasedIds, setPurchasedIds] = useState([]);

    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem('wallet_transactions');
        return saved ? JSON.parse(saved) : [
            { id: 'tx1', type: 'credit', amount: 25, date: '21/01/2026', conceptName: 'Welcome Credit' }
        ];
    });

    useEffect(() => {
        if (user) {
            const fetchPurchases = async () => {
                const { data } = await supabase
                    .from('purchases')
                    .select('concept_id')
                    .eq('user_id', user.uid);
                if (data) {
                    setPurchasedIds(data.map(p => p.concept_id));
                }
            };
            fetchPurchases();
        } else {
            setPurchasedIds([]);
        }
    }, [user]);

    useEffect(() => {
        localStorage.setItem('wallet_balance', balance);
    }, [balance]);

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

    const recordPurchase = async (concept) => {
        if (user) {
            await supabase.from('purchases').insert([{
                user_id: user.uid,
                concept_id: concept.id,
                amount: concept.price
            }]);
        }
        setPurchasedIds(prev => [...prev, concept.id]);
        setTransactions(prev => [...prev, {
            id: `tx${Date.now()}`,
            type: 'debit',
            amount: concept.price,
            date: new Date().toLocaleDateString(),
            conceptName: concept.concept || concept.name
        }]);
    };

    const purchaseConcept = async (concept, isUPI = false) => {
        if (isUPI) {
            await NativeService.triggerUPIIntent('merchant@upi', 'Micro Learning App', concept.price);
            await recordPurchase(concept);
            return true;
        }

        if (balance >= concept.price) {
            setBalance(prev => prev - concept.price);
            await recordPurchase(concept);
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

export const useWallet = () => useContext(WalletContext);
