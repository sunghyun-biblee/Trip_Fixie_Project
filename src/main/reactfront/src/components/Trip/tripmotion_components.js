import { motion } from "framer-motion";
import { Li, TripWrapper } from "./trip_place_components";
import { AreaSelectBtn, Mainitem } from "./TripComponents";

export const MotionTripWrapper = motion(TripWrapper);
export const Motionitem = motion(Mainitem);
export const MotionAreaSelectBtn = motion(AreaSelectBtn);
export const MotionLi = motion(Li);
