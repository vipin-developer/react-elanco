import React, { useEffect, useState } from "react";
import { Table } from "semantic-ui-react";
import callApi from "../../api-service/ApiService";
import DetailsPage from "../details-page/DetailsPage";

const MainPage = () => {
  const [tableData, setTableData] = useState([]);
  const [modalState, setModalState] = useState(false);

  const aggregateArray = (arr) => {
    return arr.reduce((acc, val) => {
      const index = acc.findIndex(
        (obj) => Object.keys(obj)[0] === val.ServiceName
      );
      if (index !== -1) {
        // console.log(val.Cost);
        acc[index][val.ServiceName].TotalCost +=
          val.Cost === undefined ? 0 : val.Cost * 1;
      } else {
        acc.push({
          [val.ServiceName]: val,
        });
      }
      return acc;
    }, []);
  };

  useEffect(() => {
    callApi("GET", "raw", {})
      .then((resp) => {
        const tableData = aggregateArray(resp);
        // console.log(tableData);
        setTableData(tableData);
      })
      .catch((err) => {});
  }, []);

  return (
    <div>
      <Table color={"violet"}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>App Name</Table.HeaderCell>
            <Table.HeaderCell>Resource Group</Table.HeaderCell>
            <Table.HeaderCell>Cost</Table.HeaderCell>
            <Table.HeaderCell>Consumed Quantity</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        {tableData?.length ? (
          <Table.Body>
            {tableData.map((item, index) => {
              const obj = Object.keys(item)[0];
              return (
                <Table.Row
                  key={index}
                  onClick={() => setModalState(!modalState)}
                >
                  <Table.Cell>{item[obj]?.ServiceName}</Table.Cell>
                  <Table.Cell>{item[obj]?.ResourceGroup}</Table.Cell>
                  <Table.Cell>{item[obj]?.Cost}</Table.Cell>
                  <Table.Cell>{item[obj]?.ConsumedQuantity}</Table.Cell>
                  <Table.Cell>
                    <DetailsPage details={item[obj]} modalState={modalState} />
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        ) : (
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <div>No Data</div>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        )}
      </Table>
    </div>
  );
};

export default MainPage;
