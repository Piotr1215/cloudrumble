import * as React from "react";
import StarSvg from "../../icons/star.svg";
import StarEmptySvg from "../../icons/starEmpty.svg";
import InfiniteAutoplaySwipe from "../../components/infinityAutoplaySwipe";
import useScreenSize from "../../hooks/useScreenSize";

const data = [
  {
    name: "Tandy B",
    date: "Feb 4, 2024 1:00 am",
    rating: 4,
    comment:
      "Quick and efficient service. Joining online was easy and information and confirmation came through straight away.",

    image: "/img/person.png",
  },
  {
    name: "Tandy C",
    date: "Feb 4, 2024 1:00 am",
    rating: 4,
    comment:
      "Quick and efficient service. Joining online was easy and information and confirmation came through straight away.",

    image: "/img/person.png",
  },
  {
    name: "Tandy D",
    date: "Feb 4, 2024 1:00 am",
    rating: 4,
    comment:
      "Quick and efficient service. Joining online was easy and information and confirmation came through straight away.",

    image: "/img/person.png",
  },
  {
    name: "Tandy E",
    date: "Feb 4, 2024 1:00 am",
    rating: 4,
    comment:
      "Quick and efficient service. Joining online was easy and information and confirmation came through straight away.",

    image: "/img/person.png",
  },
];

function Reviews() {
  const screenSize = useScreenSize();
  return (
    <div className="flex flex-col  items-center space-y-6 mb-20">
      <main className="container lg:px-12 ">
        <span className="minecustom-badge">Testimonials</span>
        <h2 className="lg:text-3xl">Clients</h2>
        <p className="text-text-400">
          More than 100+ happy clients
          <br />
        </p>

        <InfiniteAutoplaySwipe
          Comp={Card}
          data={data}
          number={screenSize === "sm" ? 1 : screenSize === "md" ? 2 : 3}
        />
      </main>
    </div>
  );
}

function Card({ item }) {
  return (
    <div className="max-w-96 border my-6 border-gray-500 rounded-2xl p-4 shadow-lg  dark:shadow-gray-800">
      <div className="flex flex-row justify-between items-start text-sm space-x-2 mb-2">
        <div className="flex flex-row items-start space-x-2">
          <img alt="" src={item.image} className="w-16 rounded-full h-16" />
          <div className="flex flex-col items-start space-y-[2px]">
            <p className="font-semibold mb-0">{item.name}</p>
            <span className="text-xs">{item.date}</span>
            <Rating rating={item.rating} />
          </div>
        </div>
      </div>
      <p className="text-sm text-left">&quot;{item.comment}&quot;</p>
    </div>
  );
}

function Rating({ rating }) {
  let missingStars = 5 - rating;
  return (
    <div className="flex flex-row items-center space-x-[2px]">
      {Array.from({ length: rating }, (_, i) => (
        <StarSvg className="w-6 h-6 " key={i} />
      ))}
      {Array.from({ length: missingStars }, (_, i) => (
        <StarEmptySvg className="w-6 h-6 " key={i} />
      ))}
    </div>
  );
}

export default Reviews;
