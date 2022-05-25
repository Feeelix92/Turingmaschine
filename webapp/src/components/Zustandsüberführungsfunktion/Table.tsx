import React, { Component } from "react";
import { TableProps } from "../../interfaces/CommonInterfaces";
import Row from "./Row";

export default class Table extends Component<{}, TableProps> {
  constructor(props: TableProps) {
    super(props);
    this.state = {
      header: ["Status", "Lese", "Neuer Status", "Schreibe", "Gehe nach"],
      rows: Array(5).fill(null),
    };
  }

  addRow() {
    this.setState({
      rows: this.state.rows.concat(null),
    });
  }

  deleteRow(i: number) {
    const newRows = this.state.rows;

    newRows.splice(i, 1);

    this.setState({
      rows: newRows,
    });
  }

  render() {
    const loadedRows = this.state.rows;

    return (
      <div className="flex flex-wrap flex-col">
        <table className="table-fixed border-separate border border-slate-500">
          <thead>
            <tr>
              {this.state.header.map((value, key: React.Key) => (
                <th key={key} className="border border-slate-600">
                  {value}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loadedRows.map((value, key: React.Key) => (
              <Row key={key} onClick={(i: number) => this.deleteRow(i)} />
            ))}
          </tbody>
        </table>
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={() => this.addRow()}
        >
          Zeile hinzufügen
        </button>
      </div>
    );
  }
}
