import { useState } from "react";

const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p className="text">
        {
        text.length < 400
        ?
        text
        :
        <>
        {isReadMore  ? text.slice(0, 400) : text}
        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore  ? "...read more" : " show less"}
        </span>
        </>
        }
       
      </p>
    );
  };
export default ReadMore  