import { Link } from "react-router"
import { useBiografStore } from "../store/biografStore"
import { useEffect } from "react";

const BiografList = () => {
    const {biografs, fetchBiografs} = useBiografStore();

    // console.log(biografs)
    useEffect(() => {
        fetchBiografs()
    }, [fetchBiografs])
    return (
        <div className="text[#252422] bg-[#F5F5F5] px-4 md:px-12 pb-20">
            <h1 className="py-6 text-center text-xl md:text-2xl lg:text-3xl w-full mx-auto max-w-6xl ">Biografs</h1>
        
            <div className="flex flex-wrap justify-center gap-5 lg:gap-8 max-w-6xl mx-auto">
            {Array.isArray(biografs.biografs) ? (
                biografs.biografs.map((biograf, index) => (
                    <Link key={index} to={`/biograf/${biograf._id}`}>
                        <div className="cursor-pointer w-36 md:w-40 xl:w-44 shadow sm:hover:shadow-rm rounded-b-md">
                        <div className="h-48 md:h-52 xl:h-60 bg-gray-900 overflow-hidden">
                        <img 
                            src={biograf.image || "default-image.jpg"} 
                            alt="biograf_img" 
                            className="w-full h-full object-cover"
                        />
                    </div>


                            <div>
                            <h2 className="text-base mb-2 md:text-lg font-bold truncate">{biograf.title}</h2>
                                <div className="h-20">
                                        <p className="text-sm max-h-30 line-clamp-3 md:text-base overflow-hidden text-ellipsis break-words">{biograf.description}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    ))
                ) : (
                    <p>Loading...</p>
                )}

            </div>
        
        </div>
    )
}

export default BiografList