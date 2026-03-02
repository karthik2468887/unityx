import React, { createContext, useContext, useState, useEffect } from 'react';
import { MODULES, SUBJECTS } from '../data/mockData';
import { useWallet } from './WalletContext';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
    const { user } = useAuth();
    const [dbConcepts, setDbConcepts] = useState([]);
    const [pendingUploads, setPendingUploads] = useState([]);

    const fetchConcepts = async () => {
        const { data, error } = await supabase
            .from('concepts')
            .select('*');

        if (!error && data) {
            setDbConcepts(data.filter(c => c.is_approved !== false));
            if (user?.role === 'admin') {
                setPendingUploads(data.filter(c => c.is_approved === false));
            }
        }
    };

    useEffect(() => {
        fetchConcepts();
    }, [user]);

    const subjects = [...SUBJECTS]; // Start with the predefined subjects structure
    const subjectMap = {};

    // Initialize map with existing subjects
    subjects.forEach(s => {
        subjectMap[s.name] = s;
    });

    dbConcepts.forEach(c => {
        const subjName = c.subject || 'General';

        // If it's a new subject not in mockData, add it dynamically
        if (!subjectMap[subjName]) {
            const newSubject = {
                id: `sub_${subjName.toLowerCase().replace(/\s+/g, '')}`,
                name: subjName,
                icon: 'Book',
                chapters: [{
                    id: `ch_${subjName.toLowerCase()}_1`,
                    name: 'Main Concepts',
                    concepts: []
                }]
            };
            subjects.push(newSubject);
            subjectMap[subjName] = newSubject;
        }

        // Add the database concept into the subject's first chapter
        subjectMap[subjName].chapters[0].concepts.push({
            id: c.id,
            name: c.title,
            concept: c.title,
            description: c.description,
            price: parseFloat(c.price || 0),
            time: '10 min',
            rating: 5.0,
            previewUrl: c.preview_url,
            videoUrl: c.full_video_url,
            subjectId: subjectMap[subjName].id,
            subjectName: subjName,
            chapterId: subjectMap[subjName].chapters[0].id,
            chapterName: subjectMap[subjName].chapters[0].name,
            mentorId: c.created_by,
        });
    });

    const chapters = subjects.flatMap(s => s.chapters.map(ch => ({ ...ch, subjectId: s.id, subjectName: s.name })));
    const concepts = chapters.flatMap(chap => chap.concepts);

    const addPendingUpload = async (uploadData) => {
        const newRecord = {
            title: uploadData.concept,
            description: "No description",
            price: uploadData.price,
            subject: uploadData.subject,
            full_video_url: uploadData.videoUrl, // From bucket
            created_by: user?.uid || "demo",
            is_approved: false
        };
        const { error } = await supabase.from('concepts').insert([newRecord]);
        if (error) {
            console.warn("DB Insert failed due to RLS, simulating pending upload locally:", error);
            setPendingUploads(prev => [...prev, { id: `simulated_pending_${Date.now()}`, ...newRecord }]);
            return true;
        }
        fetchConcepts();
        return true;
    };

    const approveUpload = async (uploadId) => {
        await supabase.from('concepts').update({ is_approved: true }).eq('id', uploadId);
        fetchConcepts();
        return true;
    };

    const publishDirectly = async (uploadData) => {
        const newRecord = {
            title: uploadData.concept,
            description: "No description",
            price: uploadData.price,
            subject: uploadData.subject,
            full_video_url: uploadData.videoUrl,
            created_by: user?.uid || "demo",
            is_approved: true
        };
        const { error } = await supabase.from('concepts').insert([newRecord]);
        if (error) {
            console.warn("DB Insert failed due to RLS, simulating publish locally:", error);
            const simulatedRecord = { id: `simulated_${Date.now()}`, ...newRecord };
            setDbConcepts(prev => [...prev, simulatedRecord]);
            return true;
        }
        fetchConcepts();
        return true;
    };

    const rejectUpload = async (uploadId) => {
        await supabase.from('concepts').delete().eq('id', uploadId);
        fetchConcepts();
    };

    const { isPurchased, purchaseConcept } = useWallet();
    const isConceptPurchased = (id) => isPurchased(id);
    const unlockConcept = (id) => {
        const concept = concepts.find(c => c.id === id);
        if (concept) return purchaseConcept(concept);
        return false;
    };

    const dynamicModules = [
        ...MODULES,
        ...dbConcepts.map(c => ({
            id: c.id,
            title: c.title,
            category: c.subject || 'General',
            description: c.description || 'No description provided.',
            progress: 0,
            conceptIds: [c.id],
            demoVideoUrl: c.full_video_url || c.preview_url,
            teacherName: 'FyuGen Mentor', // Or try to resolve mentorName if available
            teacherRating: 5.0
        }))
    ];

    return (
        <ContentContext.Provider value={{
            subjects,
            chapters,
            concepts,
            modules: dynamicModules,
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

