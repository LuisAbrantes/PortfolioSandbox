import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
    BookOpen, // for courses
    Users, // for extracurricular
    Award, // for honors
    Calendar, // for events
    Code2 // for hackathons
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Move certificates array outside component
const certificatesData = [
    {
        id: 1,
        title: 'PennApps XXV - Hackathon',
        institution: 'University of Pennsylvania - Penn Engineering',
        date: '2024',
        type: 'hackathons',
        hours: 40
    },
    {
        id: 2,
        title: 'Introduction to Artificial Intelligence',
        institution:
            'Federal Institute of Science and Technology of São Paulo - IFSP',
        date: '2024',
        type: 'courses',
        hours: 80
    },
    {
        id: 3,
        title: 'Physics on Vacation - FIFE',
        institution: 'University of Campinas - UNICAMP',
        date: '2024',
        type: 'courses',
        hours: 47
    },
    {
        id: 4,
        title: 'Programming Every Day',
        institution: 'GitHub',
        date: '2025',
        type: 'extracurricular',
        description: 'One day, one interaction with GitHub'
    },
    {
        id: 5,
        title: 'GitTogether SJC Community Member',
        institution: 'GitHub Community',
        date: '2024 2025',
        type: 'extracurricular',
        description:
            'Active member of the GitTogether SJC community, participating in local GitHub events and contributing to the tech community development in São José dos Campos.'
    },
    {
        id: 6,
        title: 'Linux Network Administration Fundamentals',
        institution:
            'Federal Institute of Science and Technology of São Paulo - IFSP',
        date: '2022',
        type: 'courses',
        hours: 60
    },
    {
        id: 7,
        title: 'Gran Prix SENAI Hackathon',
        institution: 'National Service for Industrial Learning - SENAI',
        date: '2023',
        type: 'hackathons',
        hours: 40
    },
    {
        id: 8,
        title: 'Introduction to Databases and SQL',
        institution:
            'Federal Institute of Science and Technology of São Paulo - IFSP',
        date: '2023',
        type: 'courses',
        hours: 36
    },
    {
        id: 9,
        title: 'National English Language Olympiad - OBLI - Bronze Medal 1',
        institution: 'Seleta Educação',
        date: '2024.1',
        type: 'honors',
        hours: 2
    },
    {
        id: 10,
        title: 'National English Language Olympiad - OBLI - Bronze Medal 2',
        institution: 'Seleta Educação',
        date: '2024.2',
        type: 'honors',
        hours: 2
    },
    {
        id: 11,
        title: 'Introduction to Network Architecture and Protocols',
        institution:
            'Federal Institute of Science and Technology of São Paulo - IFSP',
        date: '2022',
        type: 'courses',
        hours: 100
    },
    {
        id: 12,
        title: 'Coorganized the 1st National English Language Olympiad - OBLI in my Campus',
        institution:
            'Institute of Federal Education, Science and Technology of São Paulo',
        date: '2024',
        type: 'extracurricular',
        hours: 15
    },
    {
        id: 13,
        title: 'The Dream School Ambassador',
        institution: 'The Dream School',
        date: '2024',
        type: 'extracurricular',
        hours: 15
    },
    {
        id: 14,
        title: 'International Relations Consultancy (ARINTER) of IFSP Ambassador',
        institution: 'ARINTER IFSP',
        date: '2024 2025',
        type: 'extracurricular',
        hours: 15
    },
    {
        id: 15,
        title: 'Representative of the organizing committee for computer events at IFSP',
        institution: 'IFSP',
        date: '2024 2025',
        type: 'extracurricular',
        hours: 10
    },
    {
        id: 16,
        title: 'Overview of Azure by a Microsoft MVP',
        institution: 'IFSP',
        date: '2022',
        type: 'events',
        hours: 1.5
    },
    {
        id: 17,
        title: 'An experience in Brazilian Brazilian Sign Language - LIBRAS',
        institution: 'IFSP',
        date: '2022',
        type: 'events',
        hours: 2
    },
    {
        id: 18,
        title: '3rd out of 4 stages in the Brazilian National History Olympiad - ONHB',
        institution: 'University of Campinas - UNICAMP',
        date: '2023',
        type: 'honors',
        hours: 24
    },
    {
        id: 19,
        title: 'Universal Design for Learning',
        institution: 'IFSP',
        date: '2022',
        type: 'events',
        hours: 2
    },
    {
        id: 20,
        title: 'Sumo Robot Battle with Arduino',
        institution: 'IFSP',
        date: '2022',
        type: 'events',
        hours: 1.5
    },
    {
        id: 21,
        title: `Saint John's Summer-Academy Online - "The Odyssey" Session`,
        institution: "Saint John's College",
        date: '2024',
        type: 'courses',
        hours: 8
    }
];

// Mover o SearchBar para fora do componente Certificates
const SearchBar = ({ setSearchQuery }) => {
    const [inputValue, setInputValue] = useState('');

    const handleClear = () => {
        setInputValue('');
        setSearchQuery('');
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
        setSearchQuery(e.target.value);
    };

    return (
        <div className="w-full max-w-md mx-auto mb-8">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search certificates..."
                    value={inputValue}
                    onChange={handleChange}
                    className="w-full px-4 py-2 pr-12 bg-dark-secondary text-dark-text rounded-lg 
                            border border-dark-hover focus:border-dark-accent focus:ring-1 
                            focus:ring-dark-accent outline-none transition-all duration-300"
                />
                {inputValue && (
                    <button
                        onClick={handleClear}
                        className="absolute right-10 top-2.5 text-dark-text hover:text-dark-accent transition-colors duration-200"
                        aria-label="Clear search"
                    >
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                )}
                <svg
                    className="absolute right-3 top-2.5 h-5 w-5 text-dark-muted pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>
        </div>
    );
};

const Certificates = () => {
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(false);
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleFilter = type => {
        setLoading(true);
        setFilter(type);
        setTimeout(() => setLoading(false), 150);
    };

    const getTypeIcon = type => {
        const iconProps = {
            size: 24,
            className: 'text-dark-accent'
        };

        switch (type) {
            case 'courses':
                return <BookOpen {...iconProps} />;
            case 'extracurricular':
                return <Users {...iconProps} />;
            case 'honors':
                return <Award {...iconProps} />;
            case 'events':
                return <Calendar {...iconProps} />;
            case 'hackathons':
                return <Code2 {...iconProps} />;
            default:
                return null;
        }
    };

    const handleViewCertificate = certificate => {
        setSelectedCertificate(certificate);
        setShowModal(true);
    };

    const handleOpenPDF = pdfPath => {
        if (pdfPath) {
            window.open(pdfPath, '_blank');
        }
    };

    const CertificateModal = ({ certificate, onClose }) => {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
                <div className="bg-dark-secondary rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                    {/* Modal Header */}
                    <div className="p-6 border-b border-dark-hover">
                        <div className="flex justify-between items-start">
                            <h2 className="text-2xl font-bold text-dark-text">
                                {certificate.title}
                            </h2>
                            <button
                                onClick={onClose}
                                className="text-dark-muted hover:text-dark-text"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Modal Content */}
                    <div className="p-6 text-dark-text">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <span className="font-semibold">
                                    Institution:
                                </span>
                                <span>{certificate.institution}</span>
                            </div>
                            {certificate.type !== 'extracurricular' && (
                                <div className="flex items-center space-x-2">
                                    <span className="font-semibold">
                                        Completion Date:
                                    </span>
                                    <span>{certificate.date}</span>
                                </div>
                            )}
                            <div className="flex items-center space-x-2">
                                <span className="font-semibold">Type:</span>
                                <span className="capitalize">
                                    {certificate.type}
                                </span>
                                {getTypeIcon(certificate.type)}
                            </div>
                            {certificate.type === 'extracurricular' ? (
                                <div className="flex items-start space-x-2">
                                    <span className="font-semibold">
                                        Description:
                                    </span>
                                    <span className="flex-1">
                                        {certificate.description}
                                    </span>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <span className="font-semibold">
                                        Course Duration:
                                    </span>
                                    <span>{certificate.hours} hours</span>
                                </div>
                            )}
                        </div>

                        {/* PDF Button */}
                        {certificate.pdfPath && (
                            <div className="mt-6">
                                <button
                                    onClick={() =>
                                        handleOpenPDF(certificate.pdfPath)
                                    }
                                    className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center space-x-2"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                    <span>Open Certificate PDF</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    CertificateModal.propTypes = {
        certificate: PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            institution: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            type: PropTypes.oneOf([
                'courses',
                'extracurricular',
                'honors',
                'events',
                'hackathons'
            ]).isRequired,
            pdfPath: PropTypes.string,
            hours: PropTypes.number,
            description: PropTypes.string
        }).isRequired,
        onClose: PropTypes.func.isRequired
    };

    // Enhanced useMemo with filtering and search only
    const { categoryCounts, filteredCertificates } = useMemo(() => {
        const counts = certificatesData.reduce((acc, cert) => {
            acc[cert.type] = (acc[cert.type] || 0) + 1;
            return acc;
        }, {});

        const filtered = certificatesData
            .filter(cert => filter === 'all' || cert.type === filter)
            .filter(
                cert =>
                    cert.title
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    cert.institution
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
            );

        return {
            categoryCounts: counts,
            filteredCertificates: filtered
        };
    }, [filter, searchQuery]);

    // Filter button component
    const FilterButton = ({ type, label }) => (
        <button
            onClick={() => handleFilter(type)}
            className={`px-6 py-2 rounded-full transition-all duration-300 flex items-center space-x-2
                ${
                    filter === type
                        ? 'bg-dark-accent text-dark-text'
                        : 'bg-dark-secondary text-dark-muted hover:bg-dark-hover'
                }`}
        >
            <span>{label}</span>
            <span className="bg-dark-hover px-2 py-0.5 rounded-full text-sm">
                {type === 'all'
                    ? certificatesData.length
                    : categoryCounts[type] || 0}
            </span>
        </button>
    );

    // Enhanced loading skeleton
    const LoadingSkeleton = () => (
        <div className="animate-pulse bg-dark-secondary rounded-xl p-6">
            <div className="flex justify-between">
                <div className="h-6 bg-dark-hover rounded w-3/4"></div>
                <div className="h-6 w-6 bg-dark-hover rounded"></div>
            </div>
            <div className="space-y-3 mt-4">
                <div className="h-4 bg-dark-hover rounded w-2/3"></div>
                <div className="h-4 bg-dark-hover rounded w-1/2"></div>
                <div className="h-4 bg-dark-hover rounded w-3/5"></div>
            </div>
            <div className="mt-6">
                <div className="h-10 bg-dark-hover rounded"></div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-dark-primary py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Updated GitHub Repository Notice */}
                <div className="bg-dark-githubBg border-l-4 border-dark-accent p-4 mb-8 rounded-md">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                        <div className="hidden sm:block">
                            <svg
                                className="h-6 w-6 text-dark-accent"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <p className="text-dark-githubText font-medium text-sm sm:text-base">
                                <span className="block sm:inline">
                                    All certificates can be validated in my
                                    GitHub repository:
                                </span>{' '}
                                <a
                                    href="https://github.com/LuisAbrantes/Certificates"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-dark-accent hover:text-dark-muted break-words"
                                >
                                    <svg
                                        className="h-4 w-4 sm:hidden"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    github.com/LuisAbrantes/Certificates
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                <h1 className="text-4xl font-bold text-dark-text text-center mb-4">
                    Academic Achievements
                </h1>
                <p className="text-xl text-dark-muted text-center mb-12">
                    My qualifications and certifications
                </p>

                {/* Mover o SearchBar para cá e passar setSearchQuery como prop */}
                <SearchBar setSearchQuery={setSearchQuery} />

                {/* Updated Filter Buttons */}
                <div className="flex justify-center gap-4 mb-12 flex-wrap">
                    <FilterButton type="all" label="All" />
                    <FilterButton type="courses" label="Courses" />
                    <FilterButton
                        type="extracurricular"
                        label="Extracurricular"
                    />
                    <FilterButton type="honors" label="Honors" />
                    <FilterButton type="events" label="Events" />
                    <FilterButton type="hackathons" label="Hackathons" />
                </div>

                {/* Animated Certificates Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        // Add faster transition for grid
                        transition={{ duration: 0.2 }}
                    >
                        {loading ? (
                            // Enhanced loading skeleton
                            Array(6)
                                .fill(0)
                                .map((_, i) => <LoadingSkeleton key={i} />)
                        ) : filteredCertificates.length === 0 ? (
                            <motion.div
                                className="col-span-full text-center py-12"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <p className="text-xl text-dark-muted">
                                    No certificates found matching your criteria
                                </p>
                            </motion.div>
                        ) : (
                            filteredCertificates.map(certificate => (
                                <motion.div
                                    key={certificate.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    // Reduce individual card animation from 0.3s to 0.2s
                                    transition={{ duration: 0.2 }}
                                    className="bg-dark-secondary rounded-xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                                >
                                    <div className="p-6 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-xl font-semibold text-dark-text">
                                                {certificate.title}
                                            </h3>
                                            {getTypeIcon(certificate.type)}
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-dark-muted">
                                                <span className="font-medium">
                                                    Institution:
                                                </span>{' '}
                                                {certificate.institution}
                                            </p>
                                            {certificate.type !==
                                                'extracurricular' && (
                                                <p className="text-dark-muted">
                                                    <span className="font-medium">
                                                        Completion:
                                                    </span>{' '}
                                                    {certificate.date}
                                                </p>
                                            )}
                                            {certificate.type !==
                                                'extracurricular' && (
                                                <p className="text-dark-muted">
                                                    <span className="font-medium">
                                                        Duration:
                                                    </span>{' '}
                                                    {certificate.hours} hours
                                                </p>
                                            )}
                                        </div>
                                        <div className="mt-auto pt-6">
                                            <button
                                                onClick={() =>
                                                    handleViewCertificate(
                                                        certificate
                                                    )
                                                }
                                                className="w-full bg-indigo-50 text-indigo-600 py-2 px-4 rounded-lg hover:bg-indigo-100 transition-colors duration-300"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Modal */}
            {showModal && selectedCertificate && (
                <CertificateModal
                    certificate={selectedCertificate}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

export default Certificates;
