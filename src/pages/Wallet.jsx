import React from 'react';
import { useWallet } from '../context/WalletContext';
import { motion } from 'framer-motion';
import {
    Wallet as WalletIcon,
    Plus,
    ChevronRight,
    History,
    ArrowUpRight,
    ArrowDownLeft,
    CreditCard,
    Shield
} from 'lucide-react';
import '../styles/Wallet.css';

const Wallet = () => {
    const { balance, transactions, addFunds } = useWallet();

    const handleAddMoney = (amt) => {
        addFunds(amt);
        alert(`Successfully added ₹${amt} to your wallet!`);
    };

    return (
        <div className="wallet-unity">
            <div className="content-max-width">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="wallet-grid"
                >
                    {/* Left: Balance & Top up */}
                    <div className="balance-section-unity">
                        <h2>My Wallet</h2>
                        <div className="balance-card-unity">
                            <div className="balance-label">
                                <Shield size={18} color="#4f46e5" />
                                <span>Secured Balance</span>
                            </div>
                            <div className="balance-value-unity">₹{balance?.toLocaleString()}</div>

                            <h3 className="add-funds-title">Precision Recharge</h3>
                            <div className="fund-presets">
                                {[5, 10, 20, 50].map(amt => (
                                    <button
                                        key={amt}
                                        className="preset-chip"
                                        onClick={() => handleAddMoney(amt)}
                                    >
                                        +₹{amt}
                                    </button>
                                ))}
                            </div>

                            <div style={{ marginTop: '32px' }}>
                                <button className="btn-primary-saas" style={{ width: '100%', justifyContent: 'center' }}>
                                    <Plus size={18} /> Add Custom Amount
                                </button>
                            </div>

                            <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.85rem' }}>
                                <CreditCard size={14} />
                                <span>Secured by Unity Payment Gateway</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: History */}
                    <div className="history-section-unity">
                        <h2>Transaction History</h2>
                        <div className="tx-list-unity">
                            {transactions.length > 0 ? (
                                transactions.slice().reverse().map((tx, idx) => (
                                    <motion.div
                                        key={tx.id}
                                        className="tx-item-unity"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                            <div style={{
                                                width: '44px',
                                                height: '44px',
                                                borderRadius: '12px',
                                                background: tx.type === 'credit' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: tx.type === 'credit' ? '#10b981' : '#f8fafc'
                                            }}>
                                                {tx.type === 'credit' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                                            </div>
                                            <div className="tx-main">
                                                <span className="tx-title">{tx.type === 'credit' ? 'Wallet Top-up' : tx.conceptName || 'Concept Purchase'}</span>
                                                <span className="tx-date">{tx.date}</span>
                                            </div>
                                        </div>
                                        <div className={`tx-amt ${tx.type === 'credit' ? 'plus' : 'minus'}`}>
                                            {tx.type === 'credit' ? '+' : '-'}₹{tx.amount}
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div style={{
                                    padding: '60px',
                                    textAlign: 'center',
                                    background: 'rgba(255,255,255,0.02)',
                                    borderRadius: '24px',
                                    border: '1px dashed rgba(255,255,255,0.1)'
                                }}>
                                    <History size={48} color="#1e293b" style={{ marginBottom: '16px' }} />
                                    <p className="empty-msg" style={{ color: '#64748b' }}>No transaction records found in your Unity history.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div >
        </div >
    );
};

export default Wallet;
