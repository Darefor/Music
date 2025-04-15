import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useBiografStore } from "../store/biografStore";
import { useNavigate } from "react-router";
import SearchableInput from "../components/InputSearch"

const AddBiograf = () => {
    const [image, setImage] = useState("")
    const [music, setMusic] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const { isLoading, error, addBiograf } = useBiografStore()
    const navigate = useNavigate()

    const { musics, fetchMusics } = useBiografStore();

    useEffect(() => {
      fetchMusics();
    }, [fetchMusics]);
      
    const handleImageChange = (e) => {
        const file = e.target.files[0]

        let reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onloadend = function (){
            setImage(reader.result)
            
        }
    }

    const handleMusicSelect = (selectedMusic) => {
        // console.log("Selected music:", selectedMusic);

        setMusic((prevMusic) => {
            if (!prevMusic.includes(selectedMusic._id)) {
                return [...prevMusic, selectedMusic._id]; // Додаємо новий _id до масиву
            }
            return prevMusic; // Уникнення дублікатів
        });
        // const musicDb[] = selectedMusic
        // setMusic(selectedMusic._id); // Зберігаємо тільки _id
      };

    const handleSubmit = async(e) => {
        e.preventDefault()

        if(!title || !description){
            toast.error("Please file in require info")
            return;
        }


        const {message} = await addBiograf(image, title, music, description)
        toast.success(message)
        navigate("/")
    }
    return (
    <div className="min-h-screen text-[#252422] bg-[#f5f5f5] px-4 md:px-12 pb-16">
        <h2 className="flex-center font-semibold pt-8 md:text-2xl w-full max-w-xl mx-auto">Add biograf to site</h2>

        <form 
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center w-full max-w-xl mx-auto space-y-4 mt-10"
        >

            <div className="flex flex-col w-full">
                <label className="md:text-lg">Music artist Image: </label>
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange}
                    className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500" />
            </div>

            <div className="flex flex-col w-full">
                <label className="md:text-lg">Title*: </label>
                <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500"
                />
            </div>
            
            <SearchableInput value={music} options={musics ? musics.musics : []} onSelect={handleMusicSelect} />
            <span>{music}</span>
            {/* {console.log(musics)} */}
            {/* <input type="text" value={value} /> */}


            <div className="flex flex-col w-full">
                <label className="md:text-lg">Description: </label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500"
                />
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <button 
                type="submit" 
                disabled={isLoading}
                className={`w-full py-2 font-medium rounded-lg transition ${
                    isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#403D39] text-[#FFFCF2]"
                }`}
            >
                {isLoading ? "Please wait..." : "Add biograf"}
                
            </button>
        </form> 
        
    </div>
        
        
    )
}

export default AddBiograf