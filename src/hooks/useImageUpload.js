import axios from "axios";

const imageUpload = async(formData) => {
    try {
        const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_KEY}`,formData)

    return res.data.data.url
    } catch (error) {
        console.log(error);
    }
}

export default imageUpload