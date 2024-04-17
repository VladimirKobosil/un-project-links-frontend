import React from "react";
import {Link} from "react-router-dom";

const LinkTable = ({items, deleteLink}) => {
    return (
        <>
            <div className="container">
                <h1 className="mt-5">Seznam odkazů</h1>
            </div>
            <div className="container mt-3">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Název odkazu</th>
                        <th scope="col">Url</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item, index) => (
                        <tr key={index + 1}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.name}</td>
                            <td>{item.url}</td>
                            <td>
                                <div className="btn-group" role="group">
                                    <Link
                                        to={"/links/edit/" + item.id}
                                        className="btn btn-warning btn-sm"
                                    >
                                        Upravit
                                    </Link>
                                    <button
                                        onClick={() => deleteLink(item.id)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Odstranit
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="container mt-3">
                <Link to={"/links/create"} className="btn btn-success">
                    Přidat link
                </Link>
            </div>
        </>
    );
};

export default LinkTable;