import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { spaceXdata } from "../redux/CreateSlice";
export const Api = () => {
  const dispatch = useDispatch();

  const fatchSpaceData = async () => {
    await axios
      .get("https://api.spaceXdata.com/v3/launches?limit=100")
      .then((res) => {
        dispatch(spaceXdata(res?.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fatchSpaceData();
  }, []);
  return <></>;
};
