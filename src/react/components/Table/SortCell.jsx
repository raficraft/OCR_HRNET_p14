import { RiArrowUpSFill, RiArrowDownSFill } from "react-icons/ri";
import React, { useRef, useImperativeHandle, forwardRef } from "react";

export const SortCell = forwardRef(({ name, sortData, sortCellData }, ref) => {
  const thRef = useRef();

  useImperativeHandle(ref, () => ({
    get th() {
      return thRef.current;
    },
  }));

  return (
    <th onClick={(e) => sortData(e, name)} ref={thRef} data-name={name}>
      {name}
      <span className="sortArrow">
        {sortCellData ? <RiArrowDownSFill /> : <RiArrowUpSFill />}
      </span>
    </th>
  );
});

SortCell.displayName = "SortCell";
