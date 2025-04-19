import React from 'react';
import './Category.css';

export default function Category({ key,title, subtitle, imageSrc}) {
  return (
    <a href={key}>
      <div className="card-category">
        <div className="icon-card-cat">
          <img src={imageSrc} alt="" />
        </div>
        <div className="body-card-cat">
          <h4>
            <strong>{title}</strong>
          </h4>
          <h5>
            <strong>{subtitle}</strong>
          </h5>
        </div>
      </div>
    </a>
  );
}
