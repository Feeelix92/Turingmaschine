import React, { Component } from "react";
import { eingabeAlphabetOptionen } from "../../data/Alphabet";
import { Cell, TableProps } from "../../interfaces/CommonInterfaces";
import Row from "./Row";

export default class Table extends Component<{}, TableProps> {
  constructor(props: TableProps) {
    super(props);
    this.state = {
      header: ["Status", "Lese", "Neuer Status", "Schreibe", "Gehe nach"],
      alphabet: eingabeAlphabetOptionen,
      rows: [
        {
          cells: [
            { value: "q1", editField: false },
            { value: "1", editField: true },
            { value: "q1", editField: false },
            { value: "0", editField: true },
            { value: "Rechts", editField: false },
          ],
        },
      ],
    };
  }

  addRow() {
    const newRows = this.state.rows.slice(0, this.state.rows.length);

    newRows.push({
      cells: [
        { value: "q1", editField: false },
        { value: "1", editField: true },
        { value: "q1", editField: false },
        { value: "0", editField: true },
        { value: "Links", editField: false },
      ],
    });

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

  updateRow(i: React.Key, cells: Cell[]) {
    const newRows = this.state.rows.slice(0, this.state.rows.length);

    newRows[i as number].cells = cells;

    this.setState({
      rows: newRows,
    });
  }

  render() {
    const loadedRows = this.state.rows;

    return (
      <div className="flex flex-col">
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <table className="min-w-full w-full">
                <thead className="flex border-b w-full">
                  <tr className="flex w-full">
                    {this.state.header.map((value, key: React.Key) => (
                      <th
                        key={key}
                        scope="col"
                        className="text-sm px-2 font-medium text-gray-900 py-4 w-1/6 text-left border-r"
                      >
                        {value}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="flex flex-col items-center justify-between overflow-y-auto max-h-44">
                  {loadedRows.map((value, key: React.Key) => (
                    <Row
                      key={key}
                      index={key}
                      cells={value.cells}
                      alphabet={this.state.alphabet}
                      deleteRow={() => this.deleteRow(key)}
                      updateRow={this.updateRow.bind(this)}
                    />
                  ))}
                </tbody>
              </table>
              <button
                className="w-full bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                onClick={() => this.addRow()}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
