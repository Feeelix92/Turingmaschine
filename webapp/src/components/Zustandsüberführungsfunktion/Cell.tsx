import { Component } from "react";
import { CellProps } from "../../interfaces/CommonInterfaces";
import EditField from "./EditField";
import {
  eingabeAlphabetOptionen,
  EingabelphabetOption,
} from "../../data/Alphabet";

export default class Class extends Component<{}, CellProps> {
  constructor(props: CellProps) {
    super(props);
    this.state = {
      value: 0,
      showEdit: false,
      options: eingabeAlphabetOptionen,
    };
  }

  editMode() {
    this.setState({
      showEdit: !this.state.showEdit,
    });
  }

  chooseOption(option: string | number) {
    this.setState({
      value: option,
    });
  }

  render() {
    const show = this.state.showEdit;

    return (
      <td className="px-6 py-4">
        <input
          type="text"
          name="value"
          id="valueInput"
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300"
          value={this.state.value}
          onClick={this.editMode.bind(this)}
        />
        {show ? (
          <EditField
            options={this.state.options}
            updateValue={this.chooseOption.bind(this)}
          />
        ) : (
          ""
        )}
      </td>
    );
  }
}
