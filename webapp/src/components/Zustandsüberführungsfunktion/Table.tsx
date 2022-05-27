import React, { Component } from "react";
import { TableProps } from "../../interfaces/CommonInterfaces";
import Row from "./Row";

export default class Table extends Component<{}, TableProps> {
  constructor(props: TableProps) {
    super(props);
    this.state = {
      header: ["Status", "Lese", "Neuer Status", "Schreibe", "Gehe nach"],
      rows: [0],
    };
  }

  addRow() {
    this.setState({
      rows: this.state.rows.concat(null),
    });
  }

  deleteRow(i: React.Key) {
    console.log(i);
    const newRows = this.state.rows;

    console.log(newRows);

    newRows.splice(i as number, 1);

    console.log(newRows);

    this.setState({
      rows: newRows,
    });
  }

  render() {
    const loadedRows = this.state.rows;

    return (
      <div className="flex flex-wrap flex-col relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
            <tr>
              {this.state.header.map((value, key: React.Key) => (
                <th key={key} scope="col" className="px-6 py-3">
                  {value}
                </th>
              ))}
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {loadedRows.map((index: number, key: React.Key) => (
              <Row key={key} deleteRow={() => this.deleteRow(key)} />
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
