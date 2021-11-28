import { useState, useRef, createRef, useEffect } from "react";
import { SortCell } from "./../../components/Table/SortCell";
import { Rowidentitie } from "./../../components/Table/RowIdentie";
import { filterData, sortBy } from "../../../js/tools/utils";
import { debounce } from "./../../../js/tools/utils";
import Style from "./Table.module.scss";

export const DataTable = ({ dataEmployees }) => {
  const trKeys = Object.keys(dataEmployees[0]);

  //number of item in the employee table
  const lengthArrayEmployees = Object.keys(dataEmployees).length;

  const [numberOfLinePerPage, setnumberOfLinePerPage] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {}, [dataEmployees]);

  let [dataRow, setDataRow] = useState(dataEmployees);

  //Dynamical State based to key dataEmployees
  const [sortCellData, setSortCellData] = useState(
    trKeys.map((item) => ({ [item]: false }))
  );

  //Dynamical Ref based to key dataEmployees
  const thRef = useRef(trKeys.map(() => createRef()));

  //Redifine state order and call sortBy function
  const sortData = (e, item) => {
    setSortCellData({ [item]: !sortCellData[item] });
    sortBy(dataRow, item, sortCellData);
  };

  const handleSelectChange = (e) => {
    dataRow = dataEmployees;
    if (e.target.value === "all") {
      setnumberOfLinePerPage(dataRow.length);
      setDataRow(dataRow);
    } else {
      setnumberOfLinePerPage(e.target.value);
      setDataRow(dataRow.slice(0, parseInt(e.target.value)));
    }
  };

  /**
   * @param {eventHTML} e
   * @param {number} index
   * @param {string} goTo
   */

  const goToPage = (e, startIndex, pageNumber) => {
    dataRow = dataEmployees;
    const start =
      startIndex === 0 ? 0 : startIndex * parseInt(numberOfLinePerPage);
    const end = pageNumber * parseInt(numberOfLinePerPage);
    setDataRow(dataRow.slice(start, end));
  };

  //Redefines the table of employees to display those who are filtered
  const handleSearch = debounce((e) => {
    dataRow = dataEmployees;
    setDataRow(filterData(dataRow, e.target.value));
  }, 300);

  //Defines the number of pages according to the selection
  useEffect(() => {
    const paginateValue = parseInt(numberOfLinePerPage);
    setPageNumber(() => {
      return Math.ceil(lengthArrayEmployees / paginateValue);
    });
  }, [numberOfLinePerPage, lengthArrayEmployees]);

  //Creation of pagination buttons
  const paginateButton = (pageNumber) => {
    const paginate = [];
    for (let index = 0; index < pageNumber; index++) {
      let pageNumber = index + 1;
      paginate.push(
        <button
          onClick={(e) => {
            goToPage(e, index, pageNumber);
          }}
          key={index}
        >
          {pageNumber}
        </button>
      );
    }
    return paginate;
  };

  //table header cell
  const thHead = trKeys.map((item, key) => {
    return (
      <SortCell
        name={item}
        key={key}
        sortData={sortData}
        sortCellData={sortCellData[item]}
        ref={thRef.current[key]}
      />
    );
  });

  //Table rows
  const RowIdentities = () => {
    const result = dataRow.map((identitie, key) => {
      return (
        <tr key={key}>
          <Rowidentitie identitie={identitie} />
        </tr>
      );
    });
    return result;
  };

  return (
    <div className={Style.table}>
      <header>
        <div className={Style.tableSearch}>
          <label forhtml="selectEntries">Show :</label>

          <select value="5" onChange={handleSelectChange}>
            <option value="all">All</option>
            <option value="1">1</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
          <p>Entries</p>
        </div>

        <div className={Style.inputSearch}>
          <input type="search" onKeyUp={handleSearch} placeholder="search" />
        </div>
      </header>

      <table className={Style.table_content}>
        <thead>
          <tr>{thHead}</tr>
        </thead>
        <tbody>
          <RowIdentities />
        </tbody>
      </table>

      {pageNumber > 1 && (
        <div className={Style.paginate}>{paginateButton(pageNumber)}</div>
      )}
    </div>
  );
};
