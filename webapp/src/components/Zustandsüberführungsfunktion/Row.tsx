import { Component } from "react";
import { RowProps } from "../../interfaces/CommonInterfaces";
import Cell from "./Cell";

export default class Row extends Component<{}, RowProps> {
  constructor(props: RowProps) {
    super(props);
    this.state = {
      cells: Array(5).fill("Cell"),
    };
  }

  render() {
    const loadedCells = this.state.cells;

    return (
      <tr className="bg-white hover:bg-gray-20 dark:hover:bg-gray-200">
        {loadedCells.map((value: string, index: React.Key) => (
          <Cell key={index} />
        ))}
        <td className="px-6 py-4 text-right">
          <a
            href="#"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            onClick={this.props.onClick}
          >
            Delete
          </a>
        </td>
      </tr>
    );
  }
}
