import React from "react";
import { useInView } from "react-intersection-observer";

const LazyImage: any = ({ width, height, id, src, alt, ...rest }: any) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "200px 0px",
  });
  const error = (id: any) => {
    //  var doc: any = document.querySelector(id);
    var image: any = document.getElementById(id);
    image.setAttribute("style", "opacity:0;");
    // doc.append(image);
  };
  return (
    <div
      ref={ref}
      data-inview={inView}
      style={{
        position: "relative",
        paddingBottom: `${(height / width) * 100}%`,
      }}
    >
      {inView ? (
        <img
          {...rest}
          alt={alt}
          id={id}
          src={src}
          width={width}
          height={height}
          onError={() => error(id)}
        />
      ) : null}
    </div>
  );
};

export default LazyImage;
