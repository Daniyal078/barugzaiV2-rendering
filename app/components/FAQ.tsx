"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import RevealAnimation from "./RevealAnimation";

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQProps {
    faqs: FAQItem[];
    subHeading: string;
};

export default function FAQ({ faqs, subHeading }: FAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="w-full bg-secondary py-20 px-4 md:px-8 lg:px-16 flex justify-center font-sans antialiased">
            <div className="max-w-6xl w-full">
                <div className='px-6 mx-auto max-w-7xl space-y-6 mb-10'>
                    <RevealAnimation
                        key={1}
                        duration={0.5}
                        delay={0.2}
                        className="text-center max-w-4xl flex flex-col items-center justify-center mx-auto"
                    >
                        <h2 className='uppercase md:text-4xl text-2xl tracking-[5px] text-center text-white font-light'>Frequently Asked
                            <span className="text-primary"> Questions</span>
                        </h2>
                    </RevealAnimation>
                    <RevealAnimation
                        key={2}
                        duration={0.5}
                        delay={0.2}
                        className="text-center max-w-4xl flex flex-col items-center justify-center mx-auto"
                    >
                        <p className="text-white/70 text-[15px] sm:text-[16px] max-w-2xl mx-auto leading-relaxed">{subHeading}</p>
                    </RevealAnimation>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={index}
                                className={`rounded-lg border transition-all duration-300 overflow-hidden ${isOpen
                                    ? "border-[#031C3C] bg-[#3b3b3b] shadow-[0_12px_30px_-10px_rgba(3,28,60,0.06)]"
                                    : "border-slate-200/10 bg-[#1a1a1a] hover:bg-slate-50/50"}`}
                            >

                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex items-center justify-between px-6 sm:px-8 py-5 text-left focus:outline-none transition-colors"
                                >
                                    <h3 className={`text-[16px] sm:text-[17.5px] font-semibold tracking-tight transition-colors pr-4 text-white/80`}>
                                        {faq.question}
                                    </h3>


                                    <div className={`w-8 h-8 rounded-full  flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen
                                        ? "bg-white text-black rotate-180" : "bg-primary/70 text-white"}`}>
                                        <ChevronDown size={16} strokeWidth={3} />
                                    </div>
                                </button>


                                <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                    }`}>
                                    <div className="overflow-hidden">
                                        <div className="px-6 sm:px-8 pb-6 text-[14.5px] sm:text-[15px] leading-relaxed text-white/70 font-normal">
                                            <div className="pt-2 border-t border-slate-100">
                                                {faq.answer}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}