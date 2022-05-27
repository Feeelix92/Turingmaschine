import React, { Component } from "react";
import { eingabeAlphabetOptionen } from "../../data/Alphabet";
import { TableProps } from "../../interfaces/CommonInterfaces";
import Row from "./Row";

export default class Table extends Component<{}, TableProps> {
  constructor(props: TableProps) {
    super(props);
    this.state = {
      header: ["Status", "Lese", "Neuer Status", "Schreibe", "Gehe nach"],
      rows: [["q1", "1", "q1", "0", "Rechts"]],
      alphabet: eingabeAlphabetOptionen,
    };
  }

  addRow() {
    const newRows = this.state.rows.slice(0, this.state.rows.length);

    newRows.push(["qx", "0", "qy", "0", "Links"]);

    this.setState({
      rows: newRows,
    });
  }

  deleteRow(i: React.Key) {
    const newRows = this.state.rows.slice(0, this.state.rows.length);

    newRows.splice(i as number, 1);

    this.setState({
      rows: newRows,
    });
  }

  updateRow(i: React.Key, cells: string[]) {
    const newRows = this.state.rows.slice(0, this.state.rows.length);

    newRows[i as number] = cells;

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
            {loadedRows.map((value: string[], key: React.Key) => (
              <Row
                key={key}
                index={key}
                cells={value}
                alphabet={this.state.alphabet}
                deleteRow={() => this.deleteRow(key)}
                updateRow={this.updateRow.bind(this)}
              />
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
