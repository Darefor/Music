import { Link } from "react-router"

const MusicList = () => {
    const musics = ["", "", "", "", "", ""]
    return (
        <div className="text[#252422] bg-[#F5F5F5] px-4 md:px-12 pb-20">
            <h1 className="py-6 text-xl md:text-2xl lg:text-3xl w-full mx-auto max-w-6xl ">Reaer&rsqo;s favorite</h1>
        
            <div className="flex flex-wrap justify-center gap-5 lg:gap-8 max-w-6xl mx-auto">
                {musics.map((music, index) => (
                    <Link key={index} to={"/book/123"}>
                        <div className="cursor-pointer w-36 md:w-40 xl:w-44 shadow sm hover:shadow-rm rounded-b-md ">
                            <div>
                                <img />
                            </div>

                            <div>
                                <h2>The Nice Book</h2>
                                <p>John Doe</p>
                            </div>

                        </div>

                    </Link>
                ))}
            </div>
        
        </div>
    )
}

export default MusicList