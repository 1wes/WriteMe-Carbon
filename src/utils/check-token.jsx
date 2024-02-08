import axios from './axios';

const checkToken=()=>{

    return axios.get("/api/user/check-token")
}
export default checkToken;