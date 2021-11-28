import { useEffect, useRef, useState } from "react";

export const useClickOutside = (init) => {
  const refOutsideClick = useRef(null);
  const [visible, setVisible] = useState(init);

  const handleClickOutside = (event) => {
    if (
      refOutsideClick.current &&
      !refOutsideClick.current.contains(event.target)
    ) {
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [refOutsideClick]);


  return { visible, setVisible, refOutsideClick };
};
