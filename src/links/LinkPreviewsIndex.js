import React, {useState, useEffect} from "react";
import {apiGet} from "../utils/api";
import LinkPreviewCard from "../components/LinkPreviewCard";

const LinkPreviewsIndex = () => {
    const [inactiveLinks, setInactiveLinks] = useState([]);
    const [firefoxLinks, setFirefoxLinks] = useState([]);
    const [chromeLinks, setChromeLinks] = useState([]);

    const extractLinkTypes = (data) => {
        const inactiveLinks = [];
        const firefoxLinks = [];
        const chromeLinks = [];
        data.forEach((link) => {
            if (!link.active) {
                inactiveLinks.push(link);
            } else {
                if (link.inFirefox) {
                    firefoxLinks.push(link);
                }
                if (link.inChrome) {
                    chromeLinks.push(link);
                }
            }
        });
        setInactiveLinks(inactiveLinks);
        setFirefoxLinks(firefoxLinks);
        setChromeLinks(chromeLinks);
    };

    useEffect(() => {
        apiGet("/api/links").then((data) => {
            extractLinkTypes(data);
        });
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <h2>Neaktivní odkazy</h2>
                    <hr/>
                    {inactiveLinks.map((link) => (
                        <LinkPreviewCard key={link.id} link={link}/>
                    ))}
                </div>
                <div className="col-md-4">
                    <h2>Odakzy Firefox</h2>
                    <hr/>
                    {firefoxLinks.map((link) => (
                        <LinkPreviewCard key={link.id} link={link}/>
                    ))}
                </div>
                <div className="col-md-4">
                    <h2>Odkazy Chrome</h2>
                    <hr/>
                    {chromeLinks.map((link) => (
                        <LinkPreviewCard key={link.id} link={link}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LinkPreviewsIndex;