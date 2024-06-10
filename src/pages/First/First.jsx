import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion, transform } from "framer-motion";

import BackButton from "../../constants/BackButton";

import MainButton from "../../constants/MainButton";
import useListner from "../../hooks/useListner";
import AllTasks from "./AllTasks";
import { useDispatch, useSelector } from "react-redux";
import { changeMenuActive } from "../../store/menuSlice";
import Responce from "./Responce";


let step = 0

const First = () => {
  const dispatch = useDispatch();

  const [isDetailsActive, setDetailsActive] = useState({
    id: 0,
    isOpen: false,
  });


  useEffect(() => {

    function forward(){
      console.log('вызов forward')
      if (step === 0){
        step += 1
      }
    }


    BackButton.hide();
    MainButton.hide();
    if (isDetailsActive.isOpen) {
      MainButton.show();
      MainButton.onClick(forward)
      if (step === 0){
        MainButton.setText("ОТКЛИКНУТЬСЯ");
      }
      if (step === 1){
        MainButton.setText("Далее");
      }
    }
  });


  const isMenuActive = useSelector((state) => state.menu.value);

  const setMenuActive = useCallback(
    (set) => {
      dispatch(changeMenuActive(set));
    },
    [dispatch]
  );

  const style = useMemo(() => {
    console.log('вызов style')
    switch (step){
      case 0:
        return {
          transform : 'translateX(0%)'
        }
      case 1:
        return{
          transform : 'translateX(-100%)'
        }
    }
  } , [step])

  useListner({
    isMenuActive,
    setMenuActive,
    setDetailsActive,
    isDetailsActive,
  });

  const ordersInformation = useSelector(
    (state) => state.information.orderInformations
  );


  return (
    <motion.div
      style={isMenuActive ? { opacity: "0.3" } : {}}
      className="First"
      onClick={() => {
        if (isMenuActive) {
          setMenuActive(false);
        }
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1, duration: 0 }}
    >
      <div className="first-wrapper"
      style={style}>

        <AllTasks
          ordersInformation={ordersInformation}
          isDetailsActive={isDetailsActive}
          setDetailsActive={setDetailsActive}
          setMenuActive={setMenuActive}
          isMenuActive={isMenuActive}
        />


        <Responce orderInformation ={ ordersInformation[isDetailsActive.id]}  />
      </div>

    </motion.div>
  );
};

export default First;
