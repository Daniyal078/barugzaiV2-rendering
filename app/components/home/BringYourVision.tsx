const servicesData = [
    {
        id: 1,
        title: "Warranty",
        description:
            "Barugzai build comes with a 2-year interior warranty. Every detail, every finish, fully covered REALITY",
    },
    {
        id: 2,
        title: "After-sales",
        description:
            "Our relationship doesn’t end at delivery. We’re available for any adjustments, servicing, or support after your vehicle is with you.",
    },
    {
        id: 3,
        title: "REGISTRATION & EXPORT",
        description:
            "Whether you’re registering your vehicle in the UAE or exporting it internationally, we handle the full process and guide you every step of the way",
    },
]

export default function BringYourVision() {
    return (
        <section className="bg-secondary pt-16">
            <div className='bg-white rounded-2xl py-10'>
                <div className='pb-10 px-6 mx-auto max-w-7xl'>

                    <div className='uppercase text-4xl text-center font-nexa text-black font-light'>BRINGING YOUR VISION TO
                        <br className="max-sm:hidden" /> <span className="text-primary">REALITY</span>
                    </div>

                </div>

                <div className='mx-auto max-w-7xl px-6'>
                    <div className='grid md:grid-cols-3 gap-5'>
                        {servicesData.map((service, index) => (
                            <div key={index} className="max-w-4xl flex flex-col items-center justify-center mx-auto">
                                <div key={service.id} className='bg-neutral-200 lg:p-8 p-3 space-y-4 rounded-2xl'>
                                    <div className='uppercase lg:text-2xl font-nexa text-lg font-light'>{service.title}</div>
                                    <p className="lg:text-base text-sm">{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
