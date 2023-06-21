import { Carousel } from "@material-tailwind/react";
import img1 from '../../assets/slider-img/slide1.png';
import img2 from '../../assets/slider-img/slide-2.png';
import img3 from '../../assets/slider-img/slide-3.png';
import { Fade, Slide } from "react-awesome-reveal";

 
export default function Slider() {
  return (
  <div className="mt-16   w-full mx-auto">
   <Slide>  <Carousel
      className=""
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "bg-white w-8" : "bg-white/50 w-4"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      <img
        src={img1}
        alt="image 1"
        className="h-full w-full object-contain"
      />
      <img
        src={img2}
        alt="image 2"
        className="h-full w-full object-contain"
      />
      <img
        src={img3}
        alt="image 3"
        className="h-full w-full object-contain "
      />
    </Carousel>
    </Slide> 
  </div>
  );
}