import { useEffect, useState } from "react"
// import { useParams, useNavigate } from "react-router"
import { useBiografStore } from "../store/biografStore"
import { useAuthStore } from "../store/authStore"
import toast from "react-hot-toast"


const MusicList = () => {
  const { user } = useAuthStore()
  // const navigate = useNavigate()
  const [openMenuId, setOpenMenuId] = useState(null)

  const { musics, fetchMusics, isLoading, deleteMusic } = useBiografStore()

  useEffect(() => {
    fetchMusics()
  }, [fetchMusics])

  if (isLoading) {
    return <p>Loading...</p>
  }

  const handleDelete = async (id) => {
    try {
      const { message } = await deleteMusic(id)
      toast.success(message)
      fetchMusics() 
      setOpenMenuId(null)
    } catch (error) {
      toast.error("Failed to delete music.")
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen text-[#252422] bg-[#f5f5f5] px-4 md:px-12 pb-10">
      <div className="music mt-6">
        <h2 className="text-2xl font-bold">Music List:</h2>
        {Array.isArray(musics.musics) ? (
          musics.musics.map((music, index) => (
            <div className="border-2 m-2" key={music._id}>
              <p>{music.title}</p>
              <audio controls src={music.link}></audio>

              {user && (
                <div className="text-2xl font-bold -mt-2 relative flex justify-end">
                  <span
                    onClick={() =>
                      setOpenMenuId(openMenuId === music._id ? null : music._id)
                    }
                    className="cursor-pointer tracking-widest"
                  >
                    ...
                  </span>
                  {openMenuId === music._id && (
                    <div className="absolute bg-[#f5f5f5] shadow-md pb-2 px-5 text-base font-normal right-0 top-10">
                      <p
                        onClick={() => handleDelete(music._id)} 
                        className="text-red-500 cursor-pointer"
                      >
                        Delete
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No music found.</p>
        )}
      </div>
    </div>
  )
}

export default MusicList
