import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faInstagram,
  faSkype,
  faTelegram,
  faTiktok,
  faTwitch,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { faStar } from "@fortawesome/free-regular-svg-icons";

function App() {
  const [siteList, setSiteList] = useState([]);
  const [bonusList, setBonusList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideInterval = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://link.redirect-links.xyz/api/site"
        );
        setSiteList(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching site data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://link.redirect-links.xyz/api/bonus"
        );
        setBonusList(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching site data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    startSlideTimer();
    return () => stopSlideTimer();
  }, [bonusList]);

  const startSlideTimer = () => {
    stopSlideTimer();
    slideInterval.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === bonusList.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
  };

  const stopSlideTimer = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    startSlideTimer();
  };

  return (
    <div className="App">
      <div className="App-header">
        <div className="navbar flex flex-col lg:flex-row lg:justify-between p-5">
          <h1 className="pt-7 text-2xl font-bold">Yılmaz Vegas</h1>
          <ul className="pt-7 flex flex-wrap justify-center gap-3">
            <li className="py-2 px-3 mb-7 text-white rounded-md bg-[#2277ff]">
              <a href="https://t.me/yilmazvegasduyuru" className="flex gap-1">
                <FontAwesomeIcon icon={faTelegram} className="mt-1" />
                <span>Telegram</span>
              </a>
            </li>
            <li className="py-2 px-3 mb-7 text-white rounded-md bg-[#ff22bb]">
              <a
                href="https://www.instagram.com/yilmazvegas"
                className="flex gap-1"
              >
                <FontAwesomeIcon icon={faInstagram} className="mt-1" />
                <span>Instagram</span>
              </a>
            </li>
            <li className="py-2 px-3 mb-7 text-white rounded-md bg-[#000]">
              <a
                href="https://www.tiktok.com/@ylmazvegas2?_t=8nuymuht3ru&_r=1"
                className="flex gap-1"
              >
                <FontAwesomeIcon icon={faTiktok} className="mt-1" />
                <span>TikTok</span>
              </a>
            </li>
            <li className="py-2 px-3 mb-7 text-white rounded-md bg-[#ff2222]">
              <a
                href="https://youtube.com/@yilmazvegas?si=fPNaFKy9a_MCLwNh"
                className="flex gap-1"
              >
                <FontAwesomeIcon icon={faYoutube} className="mt-1" />
                <span>YouTube</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-between">
        <div className="w-[90%] lg:w-60 bg-gray-900 text-white  lg:h-1/2 flex flex-col items-center p-4 rounded-2xl mx-auto lg:mx-0">
            {bonusList[0] && (
              <>
                <div className="flex flex-col items-center mt-6 mb-8">
                  <img
                    src={bonusList[0].data.logo}
                    alt="Logo"
                    className="h-10 mb-4"
                  />
                  <span className="bg-red-600 text-sm px-2 py-1 rounded-full flex gap-2">
                    <FontAwesomeIcon icon={faStar} className="mt-1" />
                    VIP
                  </span>
                </div>

                <div className="text-center mt-4 mb-8">
                  <span className="block text-2xl font-bold">
                    {bonusList[0].name}
                  </span>
                  <img
                    src={bonusList[0].data.logo}
                    alt="Logo"
                    className="my-4 py-14 lg:rotate-90 w-full"
                  />
                  <span className="block text-md mt-2">
                    {bonusList[0].data.text}
                  </span>
                </div>
                <a
                  href={bonusList[1].data.url}
                  className="mt-auto bg-red-600 text-white px-6 py-2 rounded-full"
                >
                  GİRİŞ YAP
                </a>
              </>
            )}
          </div>

          <div className="w-[90%] lg:w-4/6 mx-auto lg:mx-0">
            <div className="slider relative overflow-hidden w-full rounded-full my-9">
              <div
                className="slider-inner flex transition-transform ease-out duration-1000"
                style={{ transform: `translateX(${-currentIndex * 100}%)` }}
              >
                {bonusList.map((slide, index) => (
                  <div className="slide min-w-full" key={index}>
                    <a href={slide.data.url}>
                    <img
                      src={slide.data.gif}
                      alt="logo"
                      className="w-full h-auto"
                    />
                    </a>
                  </div>
                ))}
              </div>
              <div className="absolute w-full flex justify-center bottom-0 pb-2">
                {bonusList.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 mx-1 rounded-full cursor-pointer ${
                      currentIndex === index ? "bg-white" : "bg-gray-400"
                    }`}
                    onClick={() => goToSlide(index)}
                  ></div>
                ))}
              </div>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
              {siteList.map((site, index) => (
                <div
                  key={index}
                  className="bg-[#030712] p-4 text-white rounded-lg"
                >
                  <a href={site.siteUrl} className="text-left">
                    <img src={site.data.logo} alt="logo" />
                    <p>{site.data.ornekdata}</p>
                    <p className="text-gray-500">SİZE ÖZEL PROMOSYONLAR</p>
                    <p className="w-full text-center bg-[#2dbcb4] my-5 py-3 rounded-full">
                      Giriş Yap
                    </p>
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="w-[90%] lg:w-60 bg-gray-900 text-white h-auto lg:h-1/2 flex flex-col items-center p-4 rounded-2xl mx-auto lg:mx-0">
            {bonusList[1] && (
              <>
                <div className="flex flex-col items-center mt-6 mb-8">
                  <img
                    src={bonusList[1].data.logo}
                    alt="Logo"
                    className="h-10 mb-4"
                  />
                  <span className="bg-red-600 text-sm px-2 py-1 rounded-full flex gap-2">
                    <FontAwesomeIcon icon={faStar} className="mt-1" />
                    VIP
                  </span>
                </div>

                <div className="text-center mt-4 mb-8">
                  <span className="block text-2xl font-bold">
                    {bonusList[1].name}
                  </span>
                  <img
                    src={bonusList[1].data.logo}
                    alt="Logo"
                    className="my-4 py-14 lg:rotate-90 w-full"
                  />
                  <span className="block text-md mt-2">
                    {bonusList[1].data.text}
                  </span>
                </div>
                <a
                  href={bonusList[1].data.url}
                  className="mt-auto bg-red-600 text-white px-6 py-2 rounded-full"
                >
                  GİRİŞ YAP
                </a>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="bg-[#282c34] text-white text-center py-3">
        ® YILMAZVEGAS tüm hakları saklıdır.
      </div>
    </div>
  );
}

export default App;
