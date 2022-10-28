import "./styles/App.scss";
import React, { useState, useEffect, useCallback } from "react";
import { getRewards } from "./api/mockApi";
import Table from "./components/Table";
import { arrangeTransaction } from "./utils/utils";
import BounceLoader from "react-spinners/ClipLoader";
import usePagination from "./components/usePagination";

function App() {
  const [loading, setLoading] = useState(false);
  const [customerData, setCustomerData] = useState([]);
  const [searchId, setSearchId] = useState("");
  //use pagination takes two parameters first data array and number of items in a page
  const pagination = usePagination(customerData, 4);
  console.log(customerData);
  useEffect(() => {
    setLoading(true);
    //getRewards can also get specific id to make apicall
    getRewards()
      .then((data) => {
        setCustomerData(arrangeTransaction(data));
      })
      .finally(() => setLoading(false));
  }, []);

  function handlerSearchByID(event) {
    if (event.target.value !== "") {
      setSearchId(event.target.value);
    } else {
      setSearchId("");
    }
  }

  const handlePrevPage = useCallback(() => {
    pagination.setPage((prevState) => {
      if (prevState > 0) {
        return prevState - 1;
      }
      return prevState;
    });
  }, []);

  const handleNextPage = useCallback(() => {
    pagination.setPage((prevState) => {
      if (prevState < pagination.totalPages) {
        return prevState + 1;
      }
      return prevState;
    });
  }, [pagination]);

  return (
    <div className="container">
      {loading ? (
        <BounceLoader
          color="#36d7b7"
          loading={loading}
          cssOverride={{
            display: "block",
            margin: "40% auto",
          }}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <>
          <header className="header">Customer Reward Table</header>
          <form className="form">
            <label className="form__label">Search by Id</label>
            <input
              className="form__input"
              onChange={handlerSearchByID}
              list="IDs"
            />
            <datalist id="IDs">
              {customerData.map((elem) => {
                return <option key={elem.userId} value={elem.userId}></option>;
              })}
            </datalist>
          </form>
          {/* dynamic table compenent */}
          <Table
            dataTable={
              searchId === ""
                ? pagination.data.map((customer) => {
                    return {
                      ...customer,
                      id: customer.userId,
                    };
                  })
                : customerData
                    .filter((elem) => elem.userId === Number(searchId))
                    .map((customer) => {
                      return {
                        ...customer,
                        id: customer.userId,
                      };
                    })
            }
            tableColumns={[
              { header: "userId", dataProperty: "userId" },
              { header: "Name", dataProperty: "name" },
              {
                header: "Rewards Per Month",
                dataProperty: "rewardsPerMonth",
                renderData: (dataValue) => {
                  return (
                    <Table
                      className="alt"
                      key={dataValue.id}
                      dataTable={dataValue.map((elem, index) => {
                        return {
                          ...elem,
                          id: index,
                        };
                      })}
                      tableColumns={[
                        { header: "Month", dataProperty: "month" },
                        { header: "Rewards", dataProperty: "reward" },
                        {
                          header: "Transactions",
                          dataProperty: "transactionData",
                          renderData: (dataValue) => {
                            return (
                              <Table
                                className="alt"
                                key={dataValue.id}
                                dataTable={dataValue.map((elem) => {
                                  return {
                                    ...elem,
                                    id: elem.transactionId,
                                  };
                                })}
                                tableColumns={[
                                  {
                                    header: "Date",
                                    dataProperty: "dateOfTransfer",
                                    renderData: (dataValue) =>
                                      `${dataValue.getDate()} / ${dataValue.getFullYear()}`,
                                  },
                                  {
                                    header: "Hour",
                                    dataProperty: "dateOfTransfer",
                                    renderData: (dataValue) =>
                                      dataValue.toLocaleTimeString("en-us", {
                                        timeZoneName: "short",
                                      }),
                                  },
                                  {
                                    header: "Payment",
                                    dataProperty: "amount",
                                    renderData: (dataValue) => `$${dataValue}`,
                                  },
                                  {
                                    header: "Reward",
                                    dataProperty: "transactionReward",
                                    renderData: (dataValue) => `${dataValue}`,
                                  },
                                ]}
                              />
                            );
                          },
                        },
                      ]}
                    />
                  );
                },
              },
              { header: "Total Reward", dataProperty: "totalRewards" },
            ]}
          />
          <button onClick={handlePrevPage} disabled={pagination.page <= 0}>
            Prev
          </button>
          <button
            onClick={handleNextPage}
            disabled={pagination.page === pagination.totalPages - 1}
          >
            Next
          </button>
        </>
      )}
    </div>
  );
}

export default App;
