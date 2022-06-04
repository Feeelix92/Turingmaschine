import React, { Component } from "react";
import { eingabeAlphabetOptionen } from "../../data/Alphabet";
import {
  Cell,
  Direction,
  directions,
  status,
  TableProps,
  Zustand,
} from "../../interfaces/CommonInterfaces";
import Row from "./Row";

export default class Table extends Component<{}, TableProps> {
  constructor(props: TableProps) {
    super(props);
    this.state = {
      header: ["Zustand", "Lese", "Neuer Zustand", "Schreibe", "Gehe nach"],
      alphabet: eingabeAlphabetOptionen,
      rows: [
        {
          cells: [
            {
              value: new Zustand(status[0].value, status[0].label),
              editField: false,
            },
            { value: "1", editField: true },
            {
              value: new Zustand(status[0].value, status[0].label),
              editField: false,
            },
            { value: "0", editField: true },
            {
              value: new Direction(directions[0].value, directions[0].label),
              editField: false,
            },
          ],
          isFinal: false,
        },
      ],
    };
  }

  addRow() {
    // create flat copy of all existing rows
    const newRows = this.state.rows.slice(0, this.state.rows.length);

    // add new row to existing rows
    newRows.push({
      cells: [
        {
          value: new Zustand(status[0].value, status[0].label),
          editField: false,
        },
        { value: "1", editField: true },
        {
          value: new Zustand(status[0].value, status[0].label),
          editField: false,
        },
        { value: "0", editField: true },
        {
          value: new Direction(directions[0].value, directions[0].label),
          editField: false,
        },
      ],
      isFinal: false,
    });

    // update the rows in state with our new rows-array
    this.setState({
      rows: newRows,
    });
  }

  deleteRow(i: React.Key) {
    // create flat copy of all existing rows
    const newRows = this.state.rows.slice(0, this.state.rows.length);

    // delete element at index
    newRows.splice(i as number, 1);

    // update the rows in state with our new rows-array
    this.setState({
      rows: newRows,
    });
  }

  updateRow(i: React.Key, cells: Cell[]) {
    // create flat copy of all existing rows
    const newRows = this.state.rows.slice(0, this.state.rows.length);

    // overwrite rows at certain index with new value
    newRows[i as number].cells = cells;

    // update the rows in state with our new rows-array
    this.setState({
      rows: newRows,
    });
  }

  setFinal(i: React.Key) {
    // create flat copy of all existing rows
    const newRows = this.state.rows.slice(0, this.state.rows.length);

    // overwrite rows at certain index with new value
    newRows[i as number].isFinal = !newRows[i as number].isFinal;

    if (newRows[i as number].isFinal) {
      alert("Als Finalzustand markiert!");
    } else {
      alert("Finalzustand entfernt!");
    }

    // update the rows in state with our new rows-array
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
              <div className="flex w-full items-center text-left text-sm px-2 font-medium text-gray-900 py-4">
                <div className="w-1/2">Wenn...</div>
                <div className="w-1/2">Dann...</div>
              </div>
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
                      setFinal={this.setFinal.bind(this)}
                    />
                  ))}
                </tbody>
              </table>
              <button
                className="w-full bg-transparent hover:bg-gray-100 text-gray-900 font-semibold hover:text-gray-900 py-2 px-4 border border-gray-900 hover:border-transparent rounded"
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
