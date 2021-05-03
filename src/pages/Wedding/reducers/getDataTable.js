import axios from 'axios';
async function getData() {
    const json = await axios.get("https://buiminhhuy2001.github.io/datajson/feast.json");
    return json;
}
var data = [];
const getDataTableReducer = (state = [], action) => {
    try {
        switch(action.type) {
            case 'GET_DATA':
                getData().then(function (result) {
                    data = result.data;
                });
                return data;
            default:
                return state;
        }
    } catch (err) {
        console.log(err);
    }
}

export default getDataTableReducer;