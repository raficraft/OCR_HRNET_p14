import { useState, useRef, createRef, useEffect } from "react";
import { SortCell } from "./../../components/Table/SortCell";
import { Rowidentitie } from "./../../components/Table/RowIdentie";
import Style from "./Employee.module.scss";
import { filterData, sortBy } from "../../../js/tools/utils";
import { debounce } from "./../../../js/tools/utils";

export const DataTable = ({ dataEmployees }) => {
  const trKeys = Object.keys(dataEmployees[0]);

  //number of item in the employee table
  const lengthArrayEmployees = Object.keys(dataEmployees).length;

  let [dataRow, setDataRow] = useState(dataEmployees);

  //Dynamical State based to key dataEmployees
  const [sortCellData, setSortCellData] = useState(
    trKeys.map((item) => ({ [item]: false }))
  );

  const [numberOfLinePerPage, setnumberOfLinePerPage] =
    useState(lengthArrayEmployees);
  const [pageNumber, setPageNumber] = useState(1);

  //Dynamical Ref based to key dataEmployees
  const thRef = useRef(trKeys.map(() => createRef()));

  //Redifine state order and call sortBy function
  const sortData = (e, item) => {
    setSortCellData({ [item]: !sortCellData[item] });
    sortBy(dataRow, item, sortCellData);
  };

  const handleSelectChange = (e) => {
    dataRow = dataEmployees;
    setnumberOfLinePerPage(e.target.value);
    setDataRow(dataRow.slice(0, parseInt(e.target.value)));
  };

  /**
   *
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
        <label forhtml="selectEntries">
          Show
          <select
            id="selectEntries"
            value={numberOfLinePerPage}
            onChange={handleSelectChange}
          >
            <option value="1">1</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
          entries
        </label>

        <input type="search" onKeyUp={handleSearch} />
      </header>

      <table className={Style.table_content}>
        <thead>
          <tr>{thHead}</tr>
        </thead>
        <tbody>
          <RowIdentities />
        </tbody>
      </table>
      <div>
        <p>PAGINATION</p>
        {paginateButton(pageNumber)}
      </div>
    </div>
  );
};
