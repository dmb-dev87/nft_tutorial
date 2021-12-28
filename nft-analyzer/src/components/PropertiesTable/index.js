import "./PropertiesTable.css";
import { useTable } from "react-table";

function Table({ columns, data, triggerFilter }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });


  // Render the UI for your table
  return (
    <table {...getTableProps()} className="tableProperties">
      <thead className="theadProperties">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} className="trProperties">
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} className="thProperties"><div>{column.render("Header")}</div></th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} className="tbodyProperties">
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} onClick={triggerFilter} className="inactive">
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function PropertiesTable({ property, filters, setFilters }) {

  const triggerFilter = (e) => {
    let parentNode = e.target.parentNode;
    let cellValue = parentNode.childNodes[0].innerText;
    if (parentNode.className === "inactive") {
      parentNode.className = "active";
      setFilters([...filters, cellValue]);
    } else if (parentNode.className === "active") {
      parentNode.className = "inactive";
      const newFilters = filters.filter((filter) => filter !== cellValue);
      setFilters(newFilters);
    }
  };
  const columns = [
    {
      Header: `${property.name}`,
      accessor: "name",
    },
    {
      Header: `${property.propertyRate.toFixed(2)} %`,
      accessor: "absoluteRate",
      Cell: ({ value }) => value.toFixed(4),
    },
  ];

  return (
    <div>
      <Table data={property.values} columns={columns} triggerFilter={triggerFilter} />
    </div>
  );
}

export default PropertiesTable;
