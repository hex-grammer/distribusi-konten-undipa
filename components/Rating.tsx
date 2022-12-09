import React from "react";
import { AiTwotoneStar } from "react-icons/ai";

type Prop = {
  leftText: string;
  rightText: string;
  value: number;
  setValue: Function;
};

function Rating({
  leftText = "Kiri",
  rightText = "Kanan",
  value,
  setValue,
}: Prop) {
  return (
    <div className="flex whitespace-nowrap items-center justify-between w-fit py-1">
      <div className="text-red-500 text-sm">{leftText}</div>
      <div className="w-[60%] flex justify-around items-center mx-4">
        {[...Array(5)].map((e, i) => (
          <AiTwotoneStar
            key={i}
            // style={{ cursor: "pointer" }}
            onClick={() => setValue(i + 1)}
            className={`${
              value > i ? "text-orange-500" : "text-gray-400"
            } mx-1`}
            // color={value > i ? "text-orange-400" : "text-gray-400"}
          />
        ))}
      </div>
      <div className="text-green-600 text-sm">{rightText}</div>
    </div>
  );
}

export default Rating;
