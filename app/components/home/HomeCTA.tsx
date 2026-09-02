import Link from "next/link";

interface HomeCTAProps {
    bg: string;
    mobBg: string;
    title: string;
    SubTitle: string;
}

export default function HomeCTA({
    bg,
    title,
    SubTitle,
    mobBg,
}: HomeCTAProps) {
    return (
        <section className="relative w-full md:h-[900px] h-[700px] max-h-[900px] flex items-center justify-center overflow-hidden">
            <div
                className="absolute inset-0 z-0 bg-cover bg-black bg-center bg-no-repeat md:hidden"
                style={{ backgroundImage: `url('${mobBg}')` }}
            />

            <div
                className="absolute inset-0 z-0 bg-cover bg-black bg-center bg-no-repeat hidden md:block"
                style={{ backgroundImage: `url('${bg}')` }}
            />

            <div className="relative z-10 max-w-4xl px-6 text-center text-white">
                <div
                    className="font-nexa"
                    dangerouslySetInnerHTML={{ __html: title }}
                />

                <p className="text-gray-300 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed mt-2">
                    {SubTitle}
                </p>

                <div className="pt-10">
                    <Link
                        href="/cars-for-sale"
                        className="inline-block px-12 py-4 border border-white/40 rounded-xl text-[10px] md:text-xs tracking-[0.3em] uppercase font-semibold font-nexa transition-all hover:border-[#c5a059]"
                    >
                        START YOUR BUILD
                    </Link>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-24 md:h-32 bg-gradient-to-t from-[#111] to-transparent z-10 pointer-events-none" />
        </section>
    );
}