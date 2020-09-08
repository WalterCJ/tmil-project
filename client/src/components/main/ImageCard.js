import React from "react";

const formatDate = (myDate) => {
  return `${myDate.getFullYear()}-${myDate.getMonth() + 1}-${myDate.getDate()}`;
};

const ImageCard = ({ activity: { image_url, title, createdAt }, size }) => {
  return (
    <div className={`item + ${size}`}>
      <img src={image_url} alt="" />
      <div className="publication-details">
        <span className="card-title">{title}</span>
        <span className="date"> {formatDate(new Date(createdAt))}</span>
      </div>
    </div>
  );
};

export default ImageCard;
