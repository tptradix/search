import axios from "axios";

export async function getComment(phone) {
    try {
        const request = await axios.get(`https://alexeysalvatov.pythonanywhere.com/rew/get?phone=${phone}&admin=admin_salvatov`)
        return request.data
    } catch {
        return '500 Server Error'
    }
}
