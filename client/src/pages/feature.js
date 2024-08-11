const iconRender = (val) => {
    switch (val) {
        case "task":
            return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                </svg>
            )
        case "euro-circle":
            return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 7.756a4.5 4.5 0 100 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        case "fire":
            return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                </svg>
            )
        default:
            return <>No Icon</>;
    }
    }
     
    const FeatureItem = ({ title, description, icon }) => {
    return (
        <div className="flex gap-5 sm:gap-6  items-start">
            <div className="min-w-max flex">
                <span className="p-4 rounded-md bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
                    {
                        iconRender(icon)
                    }
                </span>
            </div>
            <div className="space-y-1">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                    {description}
                </p>
            </div>
        </div>
    )
    }
    const features = [
    {
        id: 1,
        title: "Health Score",
        description: "A value between 1 and 100 based on your financial health which you fill up in the form",
        icon: "task"
    },
    {
        id: 2,
        title: "Wallet",
        description: "a place where you store your money and track your expenses with the help of an intitutive graph",
        icon: "euro-circle"
    },
    {
        id: 3,
        title: "Recommendations",
        description: "Based on your data, and updations you give to the data, you get the required recommendations",
        icon: "fire"
    },
    {
        id: 3,
        title: "ChatBot",
        description: "Ask anything about your Financial life here to your personalised chatBot",
        icon: "task"
    },
    {
        id: 3,
        title: "Graphs",
        description: "Visualize your daily expenses you entered in the wallet page as logs",
        icon: "task"
    },
    ]
    const Features = () => {
    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 space-y-16">
                <div className="space-y-4 max-w-2xl">
                    <span className="text-blue-600 dark:text-blue-400 font-semibold pl-6 relative before:absolute before:top-1/2 before:left-0 before:w-5 before:h-px before:bg-blue-600 dark:before:bg-blue-500 before:rounded-full">
                        Why Us
                    </span>
                    <h1 className="font-bold text-gray-800 dark:text-white text-3xl">We help you to grow your business</h1>
                </div>
                <div className="mx-auto flex flex-col md:flex-row gap-10 xl:gap-14">
                    <div className="md:w-1/2 md:flex-1 flex flex-col space-y-5 md:gap-y-6 md:py-4 xl:py-6">
                        {
                            features.map(feature => (
                                <FeatureItem key={feature.id} {...feature} />
                            ))
                        }
                    </div>
                    <div className="md:w-1/2 md:flex-1 lg:flex xl:w-[45%]  bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-1.5 shadow-xl shadow-gray-200/50 dark:shadow-none rounded-md">
                        <div className="relative lg:w-full h-full">
                            <img src="/features.png" width={2240} alt="system engineers celebrating successful-code-" className="absolute inset-0 rounded h-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
    }
    export default Features