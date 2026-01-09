import axios from "axios"


const axiosPublic = axios.create({
    // baseURL: 'https://pet-server-tawny.vercel.app',
    baseURL: 'https://pet-server-tawny.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic
}
export default useAxiosPublic