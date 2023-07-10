import {} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CamKetBar from "./Bar/CamKetBar";
import SystemRecommendBar from "./Bar/SystemRecommendBar";
import YourPreferBar from "./Bar/YourPreferBar";
import Carousel from "./Bar/Carousel";
import { useStateContext } from "../../../contexts/ContextProvider";
import axiosClient from "../../../axios";
import axios from "axios";
import { api } from "../../../api";

const Home = () => {
  const { currentUser, userToken, setCurrentUser, setUserToken } =
    useStateContext();
  const [eatenCalories, setEatenCalories] = useState(0);
  const [calories, setCalories] = useState(1500);
  const [plan, setPlan] = useState(3);
  const [willEatCalories, setSetWillEatCalories] = useState(calories - plan);
  const [twoday, setTwoday] = useState([]);
  const [today, setToday] = useState([]);
  const [likeList, setLikeList] = useState([]);
  const [dislikeList, setDislikeList] = useState([]);
  const [countDiet, setCountDiet] = useState(0);
  const mifflin_cal = (w, h, a, activity, g) => {
    if (g == "male") {
      return Math.floor((10 * w + 6.25 * h - 5 * a + 5) * activity);
    } else {
      return Math.floor((10 * w + 6.25 * h - 5 * a - 161) * activity);
    }
  };
  const BMI_Score = (w, h) => {
    return (w / (h / 100) ** 2).toFixed(2);
  };

  const Rank_BMI = (score, calo) => {
    if (score <= 18.5) {
      return calo + 300;
    } else if (score > 18.5 && score <= 24.99) {
      return calo;
    } else if (score >= 25 && score <= 29.99) {
      return calo - 300;
    } else {
      return calo - 500;
    }
  };
  useEffect(() => {
    if (userToken && currentUser.id) {
      if (
        currentUser.weight &&
        currentUser.height &&
        currentUser.age &&
        currentUser.activity &&
        currentUser.gender
      ) {
        setCalories(
          mifflin_cal(
            currentUser.weight,
            currentUser.height,
            currentUser.age,
            currentUser.activity,
            currentUser.gender
          )
        );
      }
    }
  }, [userToken, currentUser]);
  function getTopOccurrences(arr, m) {
    const counter = {};
    for (const item of arr) {
      const key = item.id + "-" + item.name;
      counter[key] = (counter[key] || 0) + 1;
    }

    const sortedOccurrences = Object.entries(counter)
      .filter(([key, count]) => count > 1) // Filter occurrences with count > 1
      .sort((a, b) => b[1] - a[1]);
    const topOccurrences = sortedOccurrences.slice(0, m);

    const result = topOccurrences.map(([key]) => {
      const [id, name] = key.split("-");
      return { id: parseInt(id), name };
    });

    return result;
  }
  function getTopOccurrencesToday(arr, m) {
    const counter = {};
    for (const item of arr) {
      const key = item.id + "-" + item.name;
      counter[key] = (counter[key] || 0) + 1;
    }

    const sortedOccurrences = Object.entries(counter)
      .filter(([key, count]) => count >= 1) // Filter occurrences with count >= 1
      .sort((a, b) => b[1] - a[1]);
    const topOccurrences = sortedOccurrences.slice(0, m);

    const result = topOccurrences.map(([key]) => {
      const [id, name] = key.split("-");
      return { id: parseInt(id), name };
    });

    return result;
  }
  useEffect(() => {
    let timer;
    const fetchData = () => {
      if (userToken && currentUser.id) {
        axios
          .get(`${api}/ingredients/get-high-star-list/${currentUser.id}`)
          .then((response) => {
            console.log(response.data);
            setLikeList(response.data.likedlist);
            setDislikeList(response.data.dislikedlist);
          });
        axios
          .get(`${api}/users/today-eaten-calories-by-user/${currentUser.id}`)
          .then((response) => {
            console.log(response.data);
            setEatenCalories(response.data.eatencalories);
            setCalories(Rank_BMI( BMI_Score(currentUser.weight, currentUser.height), response.data.caloriesperday));
            setSetWillEatCalories(response.data.calorieswilleat);
            setPlan(response.data.plan);
            setCountDiet(response.data.countdiet);
          });
        axiosClient
          .post(`${api}/order-items/delivery-last-2-days-by-user`)
          .then((response) => {
            setTwoday(
              getTopOccurrences(
                response.data.flatMap((item) =>
                  item.meal.ingredients.map((ingredient) => {
                    return { id: ingredient.id, name: ingredient.name };
                  })
                ),
                3
              )
            );
          });
        axiosClient
          .post(`${api}/order-items/delivery-today-by-user`)
          .then((response) => {
            setToday(
              getTopOccurrencesToday(
                response.data.flatMap((item) =>
                  item.meal.ingredients.map((ingredient) => {
                    return { id: ingredient.id, name: ingredient.name };
                  })
                ),
                3
              )
            );
          });
      }
    };
    const delayedFetchData = () => {
      clearTimeout(timer);
      timer = setTimeout(fetchData, 500); // Adjust the delay as needed (in milliseconds)
    };
    delayedFetchData();
    return () => {
      clearTimeout(timer);
    };
  }, [
    userToken,
    currentUser,
    // eatenCalories,
    // twoday,
    // today,
    // likeList,
    // dislikeList,
    // countDiet,
    // willEatCalories,
    // plan,
    // calories,
  ]);
  const sliderdata = [
    {
      id: 1,
      title:
        "Bạn muốn mua thành phần ăn? HFS luôn cung cấp những thực phẩm chất lượng.",
      img: "https://www.ucsfhealth.org/-/media/project/ucsf/ucsf-health/education/hero/top-ten-foods-for-health-2x.jpg",
      url: "/nutrient",
    },
    {
      id: 2,
      title:
        "Không biết chọn ăn gì? HFS đã cung cấp những thành phần ăn có sẵn.",
      img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhbHRoeSUyMGZvb2R8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
      url: "/meal",
    },
    {
      id: 3,
      title: "Bạn muốn có xuất ăn phù hợp cho riêng mình? Hãy để HFS giúp bạn.",
      img: "https://cdn.w600.comps.canstockphoto.com/creative-vector-illustration-of-eps-vector_csp59060588.jpg",
      url: "/diet-recommend",
    },
  ];
  return (
    <>
      <Carousel data={sliderdata} />
      <CamKetBar />
      <SystemRecommendBar data={{}} />
      <YourPreferBar
        twoday={twoday}
        today={today}
        eatenCalories={eatenCalories}
        willEatCalories={Math.round(calories/plan)}
        calories={calories}
        likeList={likeList}
        dislikeList={dislikeList}
        countDiet={countDiet}
        plan={plan}
      />
    </>
  );
};

export default Home;
