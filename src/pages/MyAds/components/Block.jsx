import React, { memo, useCallback } from 'react';
import MyFirstBlock from '../../../components/MyAds/MyFirstBlock';
import { useInView } from 'react-intersection-observer';

const Block = ({e, i, setSecondPage, setSliderAcitve }) => {
    const clickHandler = useCallback( (p) => {
        if (
            p.target.closest(".FirstMain__bottom-right") === null &&
            p.target.closest(".first__photos") === null
          ) {
            //  setTask(e);
            setSecondPage({ isActive: true, task: e, index: i });
          }
        
    } , [setSecondPage]) 
    console.warn(e)
    return (
        <>
          <div 
            // style={{
            //   minHeight : 177
            // }}
              className="block"
              onClick={(p) => {
                    clickHandler(p)
                }}
            >
              <MyFirstBlock
    
                {...e}
                setSlideActive={setSliderAcitve}
                myAdsFunc={(value) => {
                  setSecondPage({ isActive: true, task: e, index: i });
                }}
                isButton={true}
              />
            </div>
           

    </>

    );
};

export default memo(Block);