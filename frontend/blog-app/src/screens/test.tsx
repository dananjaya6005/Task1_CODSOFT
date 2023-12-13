import { FormOutlined, CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons/lib/icons";
import blog1img from "../Images/blog1Img.jpeg";
import { Button, FloatButton, ConfigProvider } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import { useState } from "react";
import { useTransition, animated } from "@react-spring/web";

const samplePost = [
  {
    title: "Be challenged and encouraged with our featured article",
    description:
      "This year, we have been fortunate to establish strong partnerships with church planters and catalysts both in the U.S. and abroad. In the United States, Exponential, the largest gathering of church planters in the world, has been giving us opportunities to change the conversation on church planting. We lead their main church planting programming at…",
    image: blog1img,
    date: "2021-05-10",
  },
  {
    title: " 🙂 Be challenged and encouraged with our featured article",
    description:
      "This year, we have been fortunate to establish strong partnerships with church planters and catalysts both in the U.S. and abroad. In the United States, Exponential, the largest gathering of church planters in the world, has been giving us opportunities to change the conversation on church planting. We lead their main church planting programming at…",
    image: blog1img,
    date: "2021-05-10",
  },
];

export default function TopHeaderCard() {
  const [indexForSlide, setIndexForSlide] = useState(0);

  const transitions = useTransition(indexForSlide, {
    from: { opacity: 0, transform: "translate3d(-100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(50%,0,0)" },
  });

  function handleIndexForSlideRight() {
    setTimeout(() => {
      setIndexForSlide(indexForSlide + 1);
    }, 500); // Delay of 0.5s
  }

  function handleIndexForSlideLeft() {
    setTimeout(() => {
      setIndexForSlide(indexForSlide - 1);
    }, 500); // Delay of 0.5s
  }

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#0369a1",
          },
        }}
      >
        <StyleProvider hashPriority="high">
          <div className="flex justify-center items-center ">
            <Button
              onClick={() => {
                handleIndexForSlideLeft();
              }}
              style={{ marginRight: "30px" }}
              type="primary"
              shape="circle"
              icon={<CaretLeftOutlined />}
            />
            {transitions((style, i) => (
              <animated.div
                key={i}
                style={{
                  ...style,
                  width: "50%",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <img
                  className="w-1/2 object-contain rounded-md"
                  src={samplePost[i].image}
                  alt="image"
                />
                <div className="m-4 grid 2xl:my-10">
                  <h4 className="text-xl font-bold text-gray-800 2xl:text-3xl">
                    {samplePost[i].title.length > 45
                      ? samplePost[i].title.substring(0, 45) + "..."
                      : samplePost[i].title}
                  </h4>
                  <div className="flex flex-row justify-between 2xl:my-3">
                    <p className="text-sm my-1 text-gray-500 italic 2xl:text-xl">
                      by A.M Dhanjaya{" "}
                    </p>
                    <p className="text-xs my-1 text-gray-500 italic 2xl:text-base">
                      {samplePost[i].date}
                    </p>
                    <div></div>
                  </div>
                  <div className="mt-1">
                    {" "}
                    <p className="text-sm 2xl:text-lg">
                      {samplePost[i].description.length > 200
                        ? samplePost[i].description.substring(0, 200) + "..."
                        : samplePost[i].description}
                    </p>
                  </div>
                  <a className="flex justify-end " href="">
                    Read more
                  </a>
                </div>
              </animated.div>
            ))}
            <Button
              onClick={() => {
                handleIndexForSlideRight();
              }}
              style={{ marginLeft: "30px" }}
              type="primary"
              shape="circle"
              icon={<CaretRightOutlined />}
            />
          </div>
          <div>
            <FloatButton
              shape="circle"
              badge={{ dot: true }}
              icon={<FormOutlined />}
            />
          </div>
        </StyleProvider>
      </ConfigProvider>
    </>
  );
}
