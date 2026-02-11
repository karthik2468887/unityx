import React, { createContext, useContext, useState } from 'react';
import { SUBJECTS, PENDING_UPLOADS, MODULES } from '../data/mockData';
import { useWallet } from './WalletContext';

const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
    const [subjects, setSubjects] = useState(SUBJECTS);
    const [pendingUploads, setPendingUploads] = useState(PENDING_UPLOADS);

    // Add a new submission to the pending queue
    const addPendingUpload = (uploadData) => {
        const newId = `p${Date.now()}`;
        const newUpload = {
            id: newId,
            mentor: 'Current Mentor', // In real app, get from user context
            timestamp: new Date().toLocaleDateString(),
            ...uploadData
        };
        setPendingUploads(prev => [newUpload, ...prev]);
        return newId;
    };

    // Internal helper to update subjects list (reused by approve and direct publish)
    const updateSubjectsList = (data) => {
        setSubjects(prevSubjects => {
            const updatedSubjects = [...prevSubjects];

            // Check if it's a new subject
            if (data.subject === 'other' || !updatedSubjects.find(s => s.id === data.subject)) {
                const newSubjectId = `s${Date.now()}`;
                updatedSubjects.push({
                    id: newSubjectId,
                    name: data.customSubject || data.subject,
                    icon: data.customIcon || 'Book',
                    chapters: [
                        {
                            id: `c${Date.now()}`,
                            name: data.chapter,
                            concepts: [
                                {
                                    id: `con${Date.now()}`,
                                    name: data.concept,
                                    price: parseInt(data.price),
                                    time: '10 min',
                                    rating: 5.0,
                                    previewUrl: data.previewUrl,
                                    videoUrl: data.videoUrl
                                }
                            ]
                        }
                    ]
                });
            } else {
                // Add to existing subject
                const subjectIndex = updatedSubjects.findIndex(s => s.id === data.subject);
                const chapterIndex = updatedSubjects[subjectIndex].chapters.findIndex(c => c.name === data.chapter);

                if (chapterIndex !== -1) {
                    updatedSubjects[subjectIndex].chapters[chapterIndex].concepts.push({
                        id: `con${Date.now()}`,
                        name: data.concept,
                        price: parseInt(data.price),
                        time: '10 min',
                        rating: 5.0,
                        previewUrl: data.previewUrl,
                        videoUrl: data.videoUrl
                    });
                } else {
                    updatedSubjects[subjectIndex].chapters.push({
                        id: `c${Date.now()}`,
                        name: data.chapter,
                        concepts: [
                            {
                                id: `con${Date.now()}`,
                                name: data.concept,
                                price: parseInt(data.price),
                                time: '10 min',
                                rating: 5.0,
                                previewUrl: data.previewUrl,
                                videoUrl: data.videoUrl
                            }
                        ]
                    });
                }
            }
            return updatedSubjects;
        });
    };

    // Approve an upload and move it to the official subjects list
    const approveUpload = (uploadId) => {
        const upload = pendingUploads.find(u => u.id === uploadId);
        if (!upload) return false;

        updateSubjectsList(upload);

        // Remove from pending
        setPendingUploads(prev => prev.filter(u => u.id === uploadId));
        return true;
    };

    // Admin bypass: Publish without pending queue
    const publishDirectly = (uploadData) => {
        updateSubjectsList(uploadData);
        return true;
    };

    const rejectUpload = (uploadId) => {
        setPendingUploads(prev => prev.filter(u => u.id === uploadId));
    };

    // Flatten data for easier consumption
    const chapters = subjects.flatMap(s => s.chapters.map(c => ({ ...c, subjectId: s.id, subjectName: s.name })));
    const concepts = chapters.flatMap(chap => chap.concepts.map(con => ({
        ...con,
        concept: con.concept || con.name,
        chapterId: chap.id,
        chapterName: chap.name,
        subjectId: chap.subjectId,
        subjectName: chap.subjectName
    })));

    // Link to WalletContext for unified purchase state
    const { isPurchased, purchaseConcept } = useWallet();
    const isConceptPurchased = (id) => isPurchased(id);
    const unlockConcept = (id) => {
        const concept = concepts.find(c => c.id === id);
        if (concept) return purchaseConcept(concept);
        return false;
    };

    return (
        <ContentContext.Provider value={{
            subjects,
            chapters,
            concepts,
            modules: MODULES,
            pendingUploads,
            addPendingUpload,
            approveUpload,
            publishDirectly,
            rejectUpload,
            isConceptPurchased,
            unlockConcept
        }}>
            {children}
        </ContentContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useContent = () => {
    const context = useContext(ContentContext);
    if (!context) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
};
