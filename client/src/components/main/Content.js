import React, { useState, useEffect } from "react";
import ImageCard from "./ImageCard";
import axios from "axios";

function Content() {
  const size = ["small", "medium", "large", "small2", "medium2"];

  const [activities, setActivities] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:5000/activity");
      setActivities(response.data);
    };

    fetchData();
  }, []);

  return (
    <div className="masonry-container">
      {activities.map((activity, index) => (
        <ImageCard key={index} activity={activity} size={size[index]} />
      ))}
    </div>
  );
}

export default Content;
