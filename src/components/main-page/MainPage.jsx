import React, { useEffect, useState } from "react";
import { Table } from "semantic-ui-react";
import callApi from "../../api-service/ApiService";
import DetailsPage from "../details-page/DetailsPage";

const MainPage = () => {
  const [tableData, setTableData] = useState([]);
  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    callApi("GET", "raw", {})
      .then((resp) => {
        setTableData(resp);
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
              return (
                <Table.Row
                  key={index}
                  onClick={() => setModalState(!modalState)}
                >
                  <Table.Cell>{item?.ServiceName}</Table.Cell>
                  <Table.Cell>{item?.ResourceGroup}</Table.Cell>
                  <Table.Cell>{item?.Cost}</Table.Cell>
                  <Table.Cell>{item?.ConsumedQuantity}</Table.Cell>
                  <Table.Cell>
                    <DetailsPage modalState={modalState} />
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
