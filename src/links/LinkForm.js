import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import FlashMessage from "../components/FlashMessage";
import InputField from "../components/InputField";
import InputCheck from "../components/InputCheck";
import Editor from "../components/Editor";
import axios from "axios";

const LinkForm = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [link, setLink] = useState({
        name: "",
        url: "",
        description: "",
        imageData: [],
        inChrome: false,
        inFirefox: false,
        active: false,
        openInNewWindow: false
    });

    const [sentState, setSent] = useState(false);
    const [historyData, setHistoryData] = useState([]);
    const [successState, setSuccess] = useState(false);
    const [file, setFile] = useState(null);
    const [msg, setMsg] = useState(null);
    const [progress, setProgress] = useState({started: false, pc: 0});

    useEffect(() => {
        const storedHistory = JSON.parse(localStorage.getItem(`linkHistory/${id}`)) || [];
        setHistoryData(storedHistory);
        if (id) {
            axios
                .get(`http://localhost:8080/api/links/${id}`)
                .then((response) => {
                    setLink(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [id]);

    function deleteHistory() {
        localStorage.clear();
    }

    function handleUpload(e) {
        e.preventDefault();

        if (!file) {
            setMsg(<span style={{color: 'red'}}>Prosím nahrajte obrázek!!</span>);
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        Object.keys(link).forEach(key => {
            formData.append(key, link[key]);
        });

        const config = {
            onUploadProgress: progressEvent => {
                const percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
                setProgress({started: true, pc: percentCompleted});
            },
        };

        let axiosRequest = (id)
            ? axios.put(`http://localhost:8080/api/links/${id}`, formData, config)
            : axios.post('http://localhost:8080/api/links', formData, config);

        setMsg("Uploading...");

        axiosRequest.then(response => {
            setSent(true);
            setSuccess(true);
            if (id) {
                const updatedHistory = [...historyData, {...response.data, date: new Date().toDateString()}];
                setHistoryData(updatedHistory);
                localStorage.setItem(`linkHistory/${id}`, JSON.stringify(updatedHistory));
                localStorage.setItem('linkUpdated', Date.now()); // AsyncStorage - set the current date when a link is updated.
            }
            setMsg("    Obrázek nahrán uspěšně");
        }).catch(error => {
            setSent(true);
            setSuccess(false);
            setMsg("Obrázek se nenahrál");
            console.log(error.message);
        });
    }

    const handleEditorChange = (value) => {
        setLink({...link, description: value});
    };
    const handleGoBack = () => {
        navigate(-1);
    };


    return (
        <div className="container">
            <h1>{id ? "Upravit" : "Vytvořit"} link</h1>
            <hr/>

            {sentState && (
                <FlashMessage
                    theme={successState ? "success" : ""}
                    text={successState ? "Uložení linku proběhlo úspěšně." : ""}
                />
            )}
            <form onSubmit={handleUpload} encType={"multipart/form-data"}>
                <div className="row">
                    <div className="col-md-6">
                        <InputField
                            label="Název"
                            type="text"
                            name="name"
                            value={link.name}
                            handleChange={(e) => setLink({...link, name: e.target.value})}
                        />
                        <InputField
                            label="URL"
                            type="text"
                            name="url"
                            value={link.url}
                            handleChange={(e) => setLink({...link, url: e.target.value})}
                        />
                        <p>Popis:</p>
                        <Editor
                            label="Popis"
                            type="text"
                            name="description"
                            value={link.description}
                            handleChange={handleEditorChange}
                        />
                        <br/>
                    </div>
                    <div className="col-md-6">
                        <InputCheck
                            type="checkbox"
                            name="inChrome"
                            label="Chrome"
                            value={link.inChrome}
                            handleChange={(e) => setLink({...link, inChrome: e.target.checked})}
                            checked={link.inChrome}
                        />
                        <InputCheck
                            type="checkbox"
                            name="inFirefox"
                            label="Firefox"
                            value={link.inFirefox}
                            handleChange={(e) => setLink({...link, inFirefox: e.target.checked})}
                            checked={link.inFirefox}
                        />
                        <InputCheck
                            type="checkbox"
                            name="active"
                            label="Active"
                            value={link.active}
                            handleChange={(e) => setLink({...link, active: e.target.checked})}
                            checked={link.active}
                        />
                        <InputCheck
                            type="checkbox"
                            name="openInNewWindow"
                            label="Otevřít odkaz v novém okně"
                            value={link.openInNewWindow}
                            handleChange={(e) => setLink({...link, openInNewWindow: e.target.checked})}
                            checked={link.openInNewWindow}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <input type="file" onChange={(e) => {
                            setFile(e.target.files[0])
                        }}/>
                        {progress.started && <progress max="100" value={progress.pc}></progress>}
                        {msg && <span>{msg}</span>}
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-6">
                        <button type="button" className="btn btn-secondary ml-2" onClick={handleGoBack}>Zpět</button>
                    </div>
                    <div className="col-md-6 d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary">Odeslat</button>
                    </div>
                </div>
            </form>
            {id && (
                <div className="mt-4">
                    <h2>Historie změn</h2>
                    <div className="col d-flex justify-content-end">
                        <button className="btn btn-danger btn-sm" onClick={deleteHistory}>Vymazat historii</button>
                    </div>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Datum</th>
                            <th>Název</th>
                            <th>URL</th>
                            <th>Popis</th>
                            <th>Chrome</th>
                            <th>Firefox</th>
                            <th>Aktivní</th>
                            <th>Otevřít v novém okně</th>
                        </tr>
                        </thead>
                        <tbody>
                        {historyData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.date}</td>
                                <td>{item.name}</td>
                                <td>{item.url}</td>
                                <td>{item.description}</td>
                                <td>{item.inChrome ? 'Ano' : 'Ne'}</td>
                                <td>{item.inFirefox ? 'Ano' : 'Ne'}</td>
                                <td>{item.active ? 'Ano' : 'Ne'}</td>
                                <td>{item.openInNewWindow ? 'Ano' : 'Ne'}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default LinkForm;