import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import { useBiografStore } from "../store/biografStore"
import { useAuthStore } from "../store/authStore"
import toast from "react-hot-toast"

const BiografDetail = () => {
  const { user } = useAuthStore()
  const { biograf, fetchBiograf, fetchMusic, deleteBiograf, musics, isLoading } = useBiografStore()
  const navigate = useNavigate()
  const params = useParams()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetchBiograf(params.id)
  }, [fetchBiograf, params.id])

  useEffect(() => {
    if (biograf?.music?.length > 0) {
      fetchMusic(biograf.music)
    }
  }, [biograf, fetchMusic])

  if (isLoading) {
    return <p>Loading...</p>
  }

  const handleDelete = async () => {
    const { message } = await deleteBiograf(params.id)
    toast.success(message)
    navigate("/")
  }

  return (
    <div className="min-h-screen text-[#252422] bg-[#f5f5f5] px-4 md:px-12 pb-10">
      <p className="cursor-pointer py-3" onClick={() => navigate("/")}>
        &larr; Back
      </p>

      <div className="flex flex-col md:flex-row">
        <div className="md:basis-[30%] md:mr-6 mx-auto w-full">
          <img
            src={biograf?.image}
            alt="biograf_img"
            className="max-h-[50vh] mx-auto"
          />
        </div>

        <div className="mt-6 md:mt-0 md:max-w-4xl basis-[65%]">
          <div className="flex justify-between items-center">
            {user && (
              <div className="text-2xl font-bold -mt-2 relative flex justify-end">
                <span
                  onClick={() => setOpen(!open)}
                  className="cursor-pointer tracking-widest"
                >
                  ...
                </span>
                {open && (
                  <div className="absolute bg-[#f5f5f5] shadow-md pb-2 px-5 text-base font-normal right-0 top-10">
                    <p onClick={handleDelete} className="text-red-500 cursor-pointer">Delete</p>
                  </div>
                )}
              </div>
            )}
          </div>
            
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold">{biograf?.title}</h1>

          <p className="mt-2 font-semibold text-lg md:text-xl">
            Description: <span className="md:text-lg"> {biograf?.description}</span>
          </p>
        </div>
      </div>
      
      <div className="music mt-6">
        <h2 className="text-2xl font-bold">Music List:</h2>
        {musics.length > 0 ? (
          musics.map((music, index) => (
            <div>
              <p key={index}>{music.title}</p> 
              <audio controls src={music.link}></audio>

            </div>
            
            
          ))
        ) : (
          <p>Loading music...</p>
        )}
      </div>
    </div>
  )
}

export default BiografDetail;
