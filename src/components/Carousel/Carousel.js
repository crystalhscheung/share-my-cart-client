import axios from "axios";
import { useEffect, useState } from "react";
import { useSnapCarousel } from "react-snap-carousel";
import { Link } from "react-router-dom";

export default function Carousel() {
  const { scrollRef } = useSnapCarousel();
  const [itemImages, setItemImages] = useState(null);
  const url = process.env.REACT_APP_API_URL;
  console.log(url);

  useEffect(() => {
    const getAllItemImages = async () => {
      try {
        const { data } = await axios.get(`${url}/items/images`);
        setItemImages(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllItemImages();
  }, [url]);

  return (
    <>
      <ul
        ref={scrollRef}
        style={{
          display: "flex",
          overflow: "auto",
          scrollSnapType: "x mantory",
        }}>
        {itemImages &&
          itemImages.map((item) => (
            <li key={item.id}>
              <Link to={`/items/${item.id}`}>
                <img
                  src={`http://localhost:8080/images/${item.images}`}
                  style={{
                    objectFit: "scale-down",
                    height: "25rem",
                    width: "25rem",
                  }}
                  alt={item.name}
                />
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}
