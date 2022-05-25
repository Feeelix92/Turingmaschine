import { Component } from "react";
import { RowProps } from "../../interfaces/CommonInterfaces";
import Cell from "./Cell";

export default class Row extends Component<{}, RowProps> {
  constructor(props: RowProps) {
    super(props);
    this.state = {
      cells: Array(5).fill(null),
    };
  }

  render() {
    const loadedCells = this.state.cells;

    return (
      <tr>
        {loadedCells.map((value: String, index: React.Key) => (
          <Cell key={index} />
        ))}
        <td className="px-2 py-4 text-right">
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={this.props.onClick}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}
