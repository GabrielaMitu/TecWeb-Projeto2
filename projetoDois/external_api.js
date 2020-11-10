const axios = require("axios");
const BASE_URL = "https://rapidapi.com/api-sports/api/covid-193"
module.exports = {
    getCompatibility: (country) => axios({
    method:"GET",
    url:"https://covid-193.p.rapidapi.com/statistics",
    headers:{
    "content-type":"application/octet-stream",
    "x-rapidapi-host":"covid-193.p.rapidapi.com",
    "x-rapidapi-key":"766086636dmsh77c84dc0a496b5bp1d67e4jsne48fe28337f8",
    "useQueryString":true
    }
    })
}