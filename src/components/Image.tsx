import { useEffect, useState } from "react";
import axios from "axios";

interface ImageProps {
  word: string;
}

const Image = ({ word }: ImageProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!word) return;

    const fetchImages = async () => {
      try {
        setError("");
        setImages([]); // clear previous results

        const response = await axios.get("https://api.pexels.com/v1/search", {
          params: { query: word, per_page: 9 }, // exactly 9 photos
          headers: {
            Authorization: "Hn2kOcGUDO9CTmXaTym13NejE1wvf0G50RsvhjL8J4ypYZPRzuLOHsSa", // 🔑 your Pexels API key
          },
        });

        if (response.data.photos.length > 0) {
          const urls = response.data.photos.map((photo: any) => photo.src.medium);
          setImages(urls);
        } else {
          setError("No images found for this word.");
        }
      } catch (err) {
        setError("Failed to fetch images.");
      }
    };

    fetchImages();
  }, [word]);

  return (
    <div className="mt-5">
      {images.length > 0 ? (
        <div className="text-black text-center mt-9 bg-[var(--primary-color)] p-3 rounded-xl w-[70%] mx-auto mb-9">
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {images.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={word}
              className="rounded-lg shadow-lg w-full h-30 object-cover"
            />
          ))}
        </div>
        </div>
       
      ) : (
        <p className="text-center text-gray-600">{error}</p>
      )}
    </div>
  );
};

export default Image;
