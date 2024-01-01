import React, {useState, useRef, useEffect, useMemo} from "react";
import { useQuery, gql } from '@apollo/client';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { GridReadyEvent, GridApi, ColumnApi, ColDef } from "ag-grid-community";
import { Athlete, fetchLargeData } from "../api";

type AgGridApi = {
  grid?: GridApi;
  column?: ColumnApi;
};

function Grid() {
  const [rowData, setRowData] = useState<Athlete[]>([]);
  const apiRef = useRef<AgGridApi>({
    grid: undefined,
    column: undefined
  });
  const onGridReady = (params: GridReadyEvent) => {
    apiRef.current.grid = params.api;
    apiRef.current.column = params.columnApi;
  };


const columnDefs: ColDef[] = [
    {
      headerName: "ID",
      field: "id",
      width: 70
    },
    {
      headerName: "Athlete",
      field: "athlete",
      width: 200,
      editable: true
    },
    {
      headerName: "Country",
      field: "country",
    },
    {
      headerName: "Age",
      field: "age",
    },
    {
      headerName: "Date",
      field: "date",
    },
    {
      headerName: "Sport",
      field: "sport",
    },
  ];
  const paginationPageSizeSelector = useMemo(() => {
    return [20, 200, 500, 1000];
  }, []);

  useEffect(() => {
    fetchLargeData().then((d) => {
      setRowData(d)
      console.log(d);
    })
  }, []);

  return (
    <div style={{ height: "80vh" }}>
      <div
        style={{ height: "100%", width: "100%" }}
        className="ag-theme-balham"
      >
        <AgGridReact
          rowSelection="multiple"
          columnDefs={columnDefs}
          rowData={rowData}
          pagination={true}
          paginationPageSize={200}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </div>
  );
}

export default Grid;
