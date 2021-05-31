    import axios from 'axios';
    
    const getTable = async () => {
        const response = await axios.get("https://huy1010.github.io/datajson/feast.json").catch((err) => console.log("error: ", err));
        return response.data;
    };

    export default getTable;