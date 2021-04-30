import { Dimensions } from "react-native";

const window = Dimensions.get("window");
const WIDTH = window.width;
const HEIGHT = window.height;

const ASPECT_RATIO = WIDTH / HEIGHT;
const LATITUDE_DELTA = 0.35;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Images = [
  { uri: "https://besplatka.ua/aws/746x-/88/88/95/67/prodam-g_a_r_a_zh-photo-64eb.jpg" },
  { uri: "https://besplatka.ua/aws/746x-/79/61/39/29/prodam-garazh-gk-kirovec-photo-6298.png" },
  { uri: "https://besplatka.ua/aws/746x-/88/46/87/64/prodam-garazh-saltovka-531-i-mikroraion-ploshchad-25-kv-m-photo-cf0e.jpg" },
  { uri: "https://besplatka.ua/aws/746x-/84/40/04/73/prodam-garazh-v-pyatihatkah-photo-3dd5.jpg" },
  { uri: "https://besplatka.ua/aws/746x-/82/40/26/88/prodam-garazh-photo-02ec.jpg" },
  { uri: "https://besplatka.ua/aws/746x-/25/71/19/71/prodam-otlichnyi-garazh-na-saltovke-photo-0ef8.jpg" },
  { uri: "https://besplatka.ua/aws/746x-/84/77/70/55/prodam-3-garazha-v-gk-zarya-ot-2000-do-3200-na-perekr-photo-ff41.jpg" }
]

export const INITIAL_POSITION = {
  latitude: 49.924447,
  longitude: 36.367339,
  latitudeDelta: 1,
  longitudeDelta: 1
};

export const COORDS = [
  {
    id: 123456,
    identifier: "121",
    title: "Best Place",
    description: "Большой кирпичный гараж",
    price: '2999$',
    image: Images[0],
    data: {
      id: 13,
      name: "Гараж зеленый"
    },
    location: {
      latitude: 49.9854,
      longitude: 36.3653,
      longitudeDelta: LONGITUDE_DELTA,
      latitudeDelta: LATITUDE_DELTA
    }
  },
  {
    title: "Second Best Place",
    description: "Маленький гараж",
    identifier: "122",
    price: '3123$',
    image: Images[1],
    data: {
        id: 1231123,
        name: "Гараж 1128"
      },
    location: {
      latitude: 49.9811,
      longitude: 36.3552,
      longitudeDelta: LONGITUDE_DELTA,
      latitudeDelta: LATITUDE_DELTA
    }
  },
  {
    title: "my Best Place",
    description: "Маленький гараж",
    identifier: "127",
    price: '3333$',
    image: Images[2],
    data: {
        id: 1231123,
        name: "Гараж 11428"
      },
    location: {
      latitude: 49.9811,
      longitude: 36.3553,
      longitudeDelta: LONGITUDE_DELTA,
      latitudeDelta: LATITUDE_DELTA
    }
  },
  {
    title: "Third Best Place",
    description: "Место на паркинге",
    identifier: "123",
    price: '3499$',
    image: Images[3],
    location: {
      latitude: 49.9801,
      longitude: 36.3553,
      longitudeDelta: LONGITUDE_DELTA,
      latitudeDelta: LATITUDE_DELTA
    }
  },
  {
    title: "Fourth Best Place",
    description: "Гараж шмараж",
    identifier: "124",
    price: '3500$',
    image: Images[4],
    location: {
      latitude: 49.9831,
      longitude: 36.3662,
      longitudeDelta: LONGITUDE_DELTA,
      latitudeDelta: LATITUDE_DELTA
    }
  },
  {
    title: "Best Place",
    description: "This is the best place in Portland",
    identifier: "125",
    price: '2000$',
    image: Images[5],
    data: {
      id: 123123,
      name: "Гараж 128"
    },
    location: {
      latitude: 49.9814,
      longitude: 36.3667,
      longitudeDelta: LONGITUDE_DELTA,
      latitudeDelta: LATITUDE_DELTA
    }
  }
];
