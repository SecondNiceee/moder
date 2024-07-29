import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import cl from "./FileInput.module.css";
import file from "../../../images/icons/file.svg";
let counter = 0;
const FileInput = ({ className, files, setFiles , fileError, photosNames  }) => {
  const [images, setImages] = useState([]);
  
  
  const addFiles = useCallback( (newFiles) => {
    let localImages = []
    newFiles.forEach((event) => {
      resizeImage(event, 400, 400, 0.6).then((value) => {
        // reader.readAsDataURL(value);
        localImages.push(URL.createObjectURL(value))
        if (localImages.length === newFiles.length){
          setImages([...images, ...localImages])
        }
      })
    })
    // eslint-disable-next-line
  } , [ files] )
  
  useEffect( () => {
    addFiles(files)
    // eslint-disable-next-line
  } , [] )



  function resizeImage(file, maxWidth, maxHeight, quality) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }

                if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob((blob) => {
                    resolve(new File([blob], file.name, { type: 'image/png', lastModified: new Date().getTime() }));
                }, 'image/png');
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });
}

//Usage
  // const file = document.querySelector('input[type="file"]').files[0];
  // resizeImage(file, 800, 600, 0.8).then((resizedFile) => {
  //     console.log(resizedFile);
  // });

  console.log(images)

  const myRef = useRef(null);

  var device = navigator.userAgent.toLowerCase();


  const photoStyle = useMemo( () => {
    if (fileError){
      return ({
        display : 'flex',
        border : '1px solid #FF6767'
      })
    }
    if (images.length === 0){
      return {
        display : 'flex'
      }
    }
    return {}
  }  , [fileError, images] )



//   function hideKeyboard(element) {
//     element.attr('readonly', 'readonly'); // Force keyboard to hide on input field.
//     element.attr('disabled', 'true'); // Force keyboard to hide on textarea field.
//     setTimeout(function() {
//         element.blur();  //actually close the keyboard
//         // Remove readonly attribute after keyboard is hidden.
//         element.removeAttr('readonly');
//         element.removeAttr('disabled');
//     }, 100);
// }
  
  const textRef = useRef(null)
  
  return (
    <>
    <input style={{
      position : 'absolute',
      bottom : '0',
      left : '0',
      opacity : '0'
    }} value={"привет"} ref={textRef} type="text" />
    <div

      htmlFor="file"
      style={photoStyle}
      className={className ? [cl.FileInput, className].join(" ") : cl.FileInput}
    >
      {images.map((e, i) => {
        return (
          <div key={i} className={cl.imageFeetContainer}>
            <div
              onClick={() => {
                setFiles(
                  [...files].filter((obj) => {
                    return files.indexOf(obj) !== images.indexOf(e);
                  })
                );
                setImages(
                  [...images].filter((obj) => {
                    return images.indexOf(obj) !== images.indexOf(e);
                  })
                );
                

              }}
              className={[cl.removeIcon, "_icon-trash"].join(" ")}
            />

            <img className={cl.imageFeet} src={e} alt="" />
          </div>
        );
      })}

      <label
        style={images.length === 5 ? { display: "none" } : {}}
        className={images.length !== 0 ? cl.ActiveMainLabel : cl.MainLabel}
        htmlFor="file"
      >
        <input
        
          ref={myRef}
          onChange={(event) => {
            if (event.target.files && event.target.files[0]) {
              if (event.target.files.length + files.length > 5){
                window.Telegram.WebApp.showAlert('Максимум 5 файлов')
              }
              else{
                let newFiles = [];
                for (let i = 0; i < event.target.files.length; i++) {
                  let photo = event.target.files[i]
                  let blob = photo.slice(0 , photo.size , 'image/png')
                  let newFile = new File([blob], 'nick' + String(counter) + '.png', {type: 'image/png'});
                  counter += 1
                  newFiles.push(newFile);
                }
                setFiles([...files, ...newFiles]);
                addFiles(newFiles)

              }
            }

            // hideKeyboard(myRef.current)
            
          }}
          type="file"
          multiple={device.includes("android") ? false : true}
          name="file"
          id="file"
          accept="image/*"
          className={cl.none}
        />

        <div className={cl.fileImageContainer}>
          <img className={cl.fileImage} src={file} alt="" />
        </div>
        <p>Добавить фото</p>
      </label>
      
    </div>
    {/* {images.map( (e, i) => {
      return <p>{e}</p>
    }) } */}
    {fileError ? 
      <p className={cl.fileError}>Добавьте хотя бы один пример работы</p>
      :
      <> </>
    }

    </>

  );
};

export default memo(FileInput);
