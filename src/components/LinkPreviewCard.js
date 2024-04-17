import React from 'react';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';


const LinkPreviewCard = ({link}) => {
    const {imageData, name, description, url, openInNewWindow = false} = link;

    let imageBase64 = "data:image/jpeg;base64," + imageData;

    const stripHtmlTags = (str) => {
        return str ? str.replace(/<[^>]*>/g, '') : '';
    }

    return (
        <Link to={url} target={openInNewWindow ? "_blank" : "_self"}>
            <Card style={{width: '18rem'}}>
                <Card.Img variant="top" src={imageBase64}/>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{stripHtmlTags(description)}</Card.Text>
                </Card.Body>
            </Card>
        </Link>
    );
};

export default LinkPreviewCard;