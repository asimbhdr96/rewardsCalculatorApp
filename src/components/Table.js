import "../styles/Table.scss";

const Table = (props) => {
  const { dataTable, tableColumns, className } = props;
  // dataTable should be an array of objects
  // value of dataProperty must be a string
  // tableColumns should be an array of objects that must contain header and dataProperty

  return (
    <table className="table">
      <thead className={"table__head" + `${className ? `${className}` : ""}`}>
        <tr>
          {tableColumns.map((dataColumn) => {
            return <th key={dataColumn.header}>{dataColumn.header}</th>;
          })}
        </tr>
      </thead>
      <tbody className={"table__body" + `${className ? `${className}` : ""}`}>
        {dataTable.length === 0 ? (
          <tr>
            <td colSpan={tableColumns.length}>No Result</td>
          </tr>
        ) : (
          dataTable.map((dataRow) => {
            return (
              <tr key={dataRow.id}>
                {tableColumns.map((dataColumn) => {
                  if (dataColumn.renderData) {
                    return (
                      <td key={dataColumn.header}>
                        {dataColumn.renderData(
                          dataRow[dataColumn.dataProperty]
                        )}
                      </td>
                    );
                  }
                  return (
                    <td key={dataColumn.header}>
                      {dataRow[dataColumn.dataProperty]}
                    </td>
                  );
                })}
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};
export default Table;
