import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useBiografStore } from "../store/biografStore";

const AddMusic = () => {
    const [title, setTitle] = useState("");
    const [musicFile, setMusicFile] = useState(null);
    const { isLoading, error, addMusic } = useBiografStore()
    
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setMusicFile(e.target.files[0]);
    };
    

    const handleSubmit = async(e) => {
        e.preventDefault()

        if (!title.trim() || !musicFile) {
            toast.error("Заповніть всі обов'язкові поля");
            return;
        }

        const {message} = await addMusic(title, musicFile)
        toast.success(message)
        navigate("/")
    }

    return (
        <div className="min-h-screen text-[#252422] bg-[#f5f5f5] px-4 md:px-12 pb-16">
            <h2 className="text-center font-semibold pt-8 md:text-2xl w-full max-w-xl mx-auto">
                Add music to site
            </h2>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center w-full max-w-xl mx-auto space-y-4 mt-10"
            >
                <div className="flex flex-col w-full">
                    <label className="md:text-lg">Music Name</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500"
                        disabled={isLoading}
                    />
                </div>

                <div className="flex flex-col w-full">
                    <label className="md:text-lg">Upload Music File</label>
                    <input
                        type="file"
                        accept="audio/*"
                        onChange={handleFileChange}
                        className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500"
                        disabled={isLoading}
                    />
                </div>

                <button
                    type="submit"
                    className={`w-full py-2 font-medium rounded-lg transition ${
                        isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#403D39] text-[#FFFCF2]"
                    }`}
                    disabled={isLoading}
                >
                    {isLoading ? "Uploading..." : "Upload Music"}
                </button>
            </form>
        </div>
    );
};

export default AddMusic;
