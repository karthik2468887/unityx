export const SUBJECTS = [
    {
        id: 's1',
        name: 'Mathematics',
        icon: 'Calculator',
        chapters: [
            {
                id: 'c1',
                name: 'Calculus',
                concepts: [
                    { id: 'con1', name: 'Limits & Continuity', price: 5, time: '8 min', rating: 4.8 },
                    { id: 'con2', name: 'Derivatives', price: 10, time: '15 min', rating: 4.9 },
                    { id: 'con3', name: 'Integration', price: 10, time: '12 min', rating: 4.7 }
                ]
            },
            {
                id: 'c2',
                name: 'Algebra',
                concepts: [
                    { id: 'con4', name: 'Linear Equations', price: 2, time: '5 min', rating: 4.5 },
                    { id: 'con5', name: 'Quadratic Equations', price: 5, time: '10 min', rating: 4.6 }
                ]
            }
        ]
    },
    {
        id: 's2',
        name: 'Physics',
        icon: 'Zap',
        chapters: [
            {
                id: 'c3',
                name: 'Mechanics',
                concepts: [
                    { id: 'con6', name: 'Newton\'s Laws', price: 5, time: '12 min', rating: 4.9 },
                    { id: 'con7', name: 'Circular Motion', price: 5, time: '8 min', rating: 4.4 }
                ]
            }
        ]
    },
    {
        id: 's3',
        name: 'Biology',
        icon: 'Dna',
        chapters: [
            {
                id: 'c4',
                name: 'Genetics',
                concepts: [
                    { id: 'con8', name: 'Mendel\'s Laws', price: 5, time: '10 min', rating: 4.7 },
                    { id: 'con9', name: 'DNA Replication', price: 8, time: '15 min', rating: 4.8 }
                ]
            }
        ]
    },
    {
        id: 's4',
        name: 'Chemistry',
        icon: 'FlaskConical',
        chapters: [
            {
                id: 'c5',
                name: 'Organic Chem',
                concepts: [
                    { id: 'con10', name: 'Hydrocarbons', price: 5, time: '12 min', rating: 4.6 },
                    { id: 'con11', name: 'Functional Groups', price: 10, time: '20 min', rating: 4.9 }
                ]
            }
        ]
    },
    {
        id: 's5',
        name: 'Computer Science',
        icon: 'Code2',
        chapters: [
            {
                id: 'c6',
                name: 'Python Programming',
                concepts: [
                    { id: 'con12', name: 'Python Basics', price: 2, time: '10 min', rating: 4.8, description: 'Learn variables, data types, and basic operators in Python.' },
                    { id: 'con13', name: 'Control Statements', price: 5, time: '15 min', rating: 4.9, description: 'Master if-else conditions and loops for logic control.' },
                    { id: 'con16', name: 'Functions & Modules', price: 5, time: '12 min', rating: 4.7, description: 'Reusable code blocks and organizing Python projects.' },
                    { id: 'con17', name: 'Object-Oriented Programming', price: 10, time: '20 min', rating: 4.9, description: 'Classes, objects, inheritance, and polymorphism.' }
                ]
            }
        ]
    },
    {
        id: 's6',
        name: 'Economics',
        icon: 'TrendingUp',
        chapters: [
            {
                id: 'c7',
                name: 'Microeconomics',
                concepts: [
                    { id: 'con14', name: 'Supply & Demand', price: 5, time: '8 min', rating: 4.5 },
                    { id: 'con15', name: 'Market Equilibrium', price: 5, time: '10 min', rating: 4.6 }
                ]
            }
        ]
    }
];

export const CHAPTERS = SUBJECTS.flatMap(s => s.chapters.map(c => ({ ...c, subjectId: s.id })));
export const CONCEPTS = CHAPTERS.flatMap(ch => ch.concepts.map(con => ({ ...con, chapterId: ch.id, subjectId: ch.subjectId, subjectName: SUBJECTS.find(s => s.id === ch.subjectId)?.name })));

// Modules for horizontal card layout on Modules page
export const MODULES = [
    {
        id: 'mod1',
        title: 'Python Basics',
        category: 'Programming',
        description: 'Learn variables, data types, and basic operators in Python.',
        progress: 0,
        conceptIds: ['con12'],
        demoVideoUrl: '/videos/python-basics-demo.mp4',
        teacherName: 'Dr. Rajesh Kumar',
        teacherRating: 4.8
    },
    {
        id: 'mod2',
        title: 'Control Statements',
        category: 'Programming',
        description: 'Master if-else conditions and loops for logic control.',
        progress: 0,
        conceptIds: ['con13'],
        demoVideoUrl: '/videos/control-statements-demo.mp4',
        teacherName: 'Prof. Ananya Sharma',
        teacherRating: 4.9
    },
    {
        id: 'mod3',
        title: 'Functions & Modules',
        category: 'Programming',
        description: 'Reusable code blocks and organizing Python projects.',
        progress: 0,
        conceptIds: ['con16'],
        demoVideoUrl: '/videos/functions-demo.mp4',
        teacherName: 'Dr. Vikram Singh',
        teacherRating: 4.7
    },
    {
        id: 'mod4',
        title: 'Object-Oriented Programming',
        category: 'Advanced',
        description: 'Classes, objects, inheritance, and polymorphism.',
        progress: 0,
        conceptIds: ['con17'],
        demoVideoUrl: '/videos/oop-demo.mp4',
        teacherName: 'Prof. Priya Mehta',
        teacherRating: 4.9
    }
];

export const USER_STATS = {
    walletBalance: 25,
    purchasedConcepts: []
};

export const PENDING_UPLOADS = [
    {
        id: 'p1',
        mentor: 'Rahul Sharma',
        subject: 'Mathematics',
        concept: 'Complex Numbers',
        price: 5,
        timestamp: '2 hours ago'
    },
    {
        id: 'p2',
        mentor: 'Ananya Iyer',
        subject: 'Physics',
        concept: 'Wave Optics',
        price: 10,
        timestamp: '5 hours ago'
    }
];
