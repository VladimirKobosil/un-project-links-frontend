import {useEffect, useState} from "react";
import {apiDelete, apiGet} from "../utils/api";
import LinkTable from "./LinkTable";

const LinkIndex = () => {
    const [links, setLinks] = useState([]);

    useEffect(() => {
        apiGet("/api/links").then((data) => setLinks(data));
    }, []);

    const deleteLink = async (id) => {
        const confirmed = window.confirm("Opravdu chcete tento odkaz smazat?");
        if (!confirmed) return;
        try {
            await apiDelete("/api/links/" + id);
        } catch (error) {
            console.log(error.message);
            alert(error.message)
        }
        setLinks(links.filter((item) => item.id !== id));
    };

    return (
        <div>
            <LinkTable
                deleteLink={deleteLink}
                items={links}/>
        </div>
    );
};

export default LinkIndex;