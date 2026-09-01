'use client'
import { api_base_url } from '@/lib/utils';
import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        source: 'web'
    });

    const [carsList, setCarsList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCar, setSelectedCar] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [carsLoading, setCarsLoading] = useState(false);

    const [status, setStatus] = useState({ loading: false, success: null, error: null });
    const dropdownRef = useRef(null);
    const debounceRef = useRef(null);

    // Fetch cars from API — supports an optional search term
    const fetchCars = useCallback(async (search = '') => {
        setCarsLoading(true);
        try {
            const url = search
                ? `${api_base_url}/api/v1/cars-lookup-list?search=${encodeURIComponent(search)}`
                : `${api_base_url}/api/v1/cars-lookup-list`;
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setCarsList(data);
            }
        } catch (err) {
            console.error("Cars load karne me masla hua:", err);
        } finally {
            setCarsLoading(false);
        }
    }, []);

    // Initial load — latest 20 cars
    useEffect(() => {
        fetchCars();
    }, [fetchCars]);

    // Debounced re-fetch whenever searchTerm changes
    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        // Don't re-query while a car is already selected (input shows its title, not a live search)
        if (selectedCar) return;

        debounceRef.current = setTimeout(() => {
            fetchCars(searchTerm);
        }, 300); // 300ms debounce

        return () => clearTimeout(debounceRef.current);
    }, [searchTerm, selectedCar, fetchCars]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Server already filters by `search`, so just render carsList directly
    const filteredCars = carsList;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedCar) {
            setStatus({ loading: false, success: null, error: 'Please select a vehicle from the list.' });
            return;
        }

        setStatus({ loading: true, success: null, error: null });

        try {
            const payload = {
                ...formData,
                car_id: selectedCar.slug
            };

            const response = await fetch(`${api_base_url}/api/v1/cars/${selectedCar.slug}/leads`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({
                    loading: false,
                    success: 'Your inquiry has been submitted successfully!',
                    error: null
                });
                setFormData({ name: '', email: '', phone: '', message: '', source: 'web' });
                setSelectedCar(null);
                setSearchTerm('');
                fetchCars(); // refresh back to default latest-20 list
            } else {
                const errorMsg = data.message || 'Validation error or invalid request.';
                setStatus({ loading: false, success: null, error: errorMsg });
            }
        } catch (err) {
            setStatus({
                loading: false,
                success: null,
                error: 'Connection issue. Please check your network.'
            });
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-secondary border border-white/50 rounded-xl shadow-sm">

            {status.success && (
                <div className="mb-4 p-4 text-sm text-green-400 bg-green-950/50 border border-green-500/30 rounded-lg">
                    {status.success}
                </div>
            )}
            {status.error && (
                <div className="mb-4 p-4 text-sm text-red-400 bg-red-950/50 border border-red-500/30 rounded-lg">
                    {status.error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter Your Name *"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-white/50 focus:outline-none focus:ring-2 focus:ring-primary/30 text-white/70 placeholder-white/30 bg-neutral-800"
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter Your Email Address *"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-white/50 focus:outline-none focus:ring-2 focus:ring-primary/30 text-white/70 placeholder-white/30 bg-neutral-800"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Searchable Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <input
                            type="text"
                            placeholder="Search & Choose vehicle *"
                            value={selectedCar ? selectedCar.title : searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                if (selectedCar) {
                                    setSelectedCar(null);
                                }
                            }}
                            onFocus={() => setIsDropdownOpen(true)}
                            required={!selectedCar}
                            className="w-full px-4 py-3 rounded-lg border border-white/50 focus:outline-none focus:ring-2 focus:ring-primary/30 text-white/70 placeholder-white/30 bg-neutral-800 text-left cursor-text"
                        />

                        {selectedCar && (
                            <button
                                type="button"
                                onClick={() => { setSelectedCar(null); setSearchTerm(''); fetchCars(); }}
                                className="absolute right-3 top-3 text-white/40 hover:text-white/80"
                            >
                                ✕
                            </button>
                        )}

                        {isDropdownOpen && (
                            <ul className="absolute z-50 w-full mt-1 max-h-60 overflow-y-auto rounded-lg border border-white/50 bg-neutral-900 shadow-xl divide-y divide-white/10">
                                {carsLoading ? (
                                    <li className="px-4 py-2 text-white/40 italic">Searching...</li>
                                ) : filteredCars.length > 0 ? (
                                    filteredCars.map(car => (
                                        <li
                                            key={car.slug}
                                            onClick={() => {
                                                setSelectedCar(car);
                                                setIsDropdownOpen(false);
                                            }}
                                            className="px-4 py-2 text-white/70 hover:bg-primary/20 cursor-pointer transition-colors"
                                        >
                                            {car.title}
                                        </li>
                                    ))
                                ) : (
                                    <li className="px-4 py-2 text-white/40 italic">
                                        No vehicle found...
                                    </li>
                                )}
                            </ul>
                        )}
                    </div>

                    <div className="flex rounded-lg border border-white/50 bg-neutral-800 overflow-hidden focus-within:ring-1 focus-within:ring-primary/30">
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone Number (e.g. +971...)"
                            className="w-full px-4 py-3 focus:outline-none bg-transparent text-white/70 placeholder-white/30"
                        />
                    </div>
                </div>

                <div>
                    <textarea
                        rows={4}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your Query / Feedback *"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-white/50 focus:outline-none focus:ring-2 focus:ring-primary/30 text-white/70 placeholder-white/30 bg-neutral-800 resize-y"
                    ></textarea>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={status.loading}
                        className={`px-6 py-3 bg-primary hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md transform hover:-translate-y-0.5 active:translate-y-0 ${status.loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {status.loading ? 'Submitting...' : 'Submit Form'}
                    </button>
                </div>
            </form>
        </div>
    );
}