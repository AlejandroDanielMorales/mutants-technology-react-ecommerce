import React from 'react';
import "./ServiceCard.css"

export default function ServiceCard({ title, description, image, alt }) {
    return (
        <div className="card about">
            <div className="card-about-img">
                <img src={image} alt={alt} />
            </div>
            <div className="card-about-body">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}
