import { Component } from "react";
import { RowProps } from "../../interfaces/CommonInterfaces";
import Cell from "./Cell";

export default class Row extends Component<{}, RowProps> {
  constructor(props: RowProps) {
    super(props);
    this.state = {
      cells: ["q1", "1", "q1", "0", "Rechts"],
    };
  }

  setCellValue(index: React.Key, value: string) {
    let cellCopy = this.state.cells.slice(0, this.state.cells.length);

    cellCopy[index as number] = value;

    this.setState({
      cells: cellCopy,
    });
  }

  render() {
    const loadedCells = this.state.cells;

    return (
      <tr className="bg-white hover:bg-gray-20 dark:hover:bg-gray-200">
        {loadedCells.map((value: string, key: React.Key) => (
          <Cell
            key={key}
            value={value}
            index={key}
            updateCellValue={this.setCellValue.bind(this)}
          />
        ))}
        <td className="px-6 py-4 text-right">
          <a
            href="#"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            onClick={this.props.deleteRow}
          >
            Delete
          </a>
        </td>
      </tr>
    );
  }
}
