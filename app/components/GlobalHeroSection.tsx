import Link from "next/link";

export default function GlobalHeroSection({ bg, mobileBg, title, subTitle, text, fullHeight = false }: { bg: string, mobileBg: string, title: string, subTitle: string, text: string, fullHeight: boolean }) {
    return (
        <>
            <div className={`relative md:min-h-screen bg-cover bg-center bg-no-repeat flex flex-col justify-between items-center pt-30 py-16 px-6 text-white ${fullHeight ? "" : "h-[50vh]"}`}
                style={{ backgroundImage: `url('${bg}')` }}
            >
                <div className="absolute inset-0 bg-black/60 z-0"></div>

                <div className="relative z-10 mx-auto max-w-7xl w-full md:space-y-15 space-y-8 my-auto">
                    {title && (
                        <p className="md:text-center text-sm md:text-lg font-medium tracking-[0.2em] uppercase text-gray-300">
                            {title}
                        </p>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start border-white/10">
                        {subTitle && (
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight lg:col-span-1">
                                {subTitle}
                            </h1>
                        )}
                        {text && (
                            <div className="lg:col-span-2 text-base md:text-lg text-gray-300 leading-relaxed">
                                <p>{text}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="relative z-10 w-full flex justify-center mt-8">
                    <div className="relative z-10 w-full flex justify-center mt-8">
                        <Link href={`https://wa.me/+971505160610`} className="w-full max-w-md flex items-center justify-center md:h-14 h-8 rounded-xl bg-white text-black font-semibold text-sm tracking-[3px] uppercase transition-all duration-300 hover:bg-black hover:text-white hover:ring-1 hover:ring-white">
                            REQUEST A QUOTE
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}