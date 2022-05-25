import { Component } from "react";
import { CellProps } from "../../interfaces/CommonInterfaces";

export default class Cell extends Component<{}, CellProps> {
  render() {
    return (
      <td className="border border-slate-700">
        <p>Cell</p>
        <input
          type="text"
          name="value"
          id="valueInput"
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300"
        />
      </td>
    );
  }
}
