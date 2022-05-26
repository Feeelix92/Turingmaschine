import React, { ChangeEvent, Component } from "react";
import { CellProps } from "../../interfaces/CommonInterfaces";
import EditField from "./EditField";
import {
  eingabeAlphabetOptionen,
  EingabelphabetOption,
} from "../../data/Alphabet";

export default class Class extends Component<{}, CellProps> {
  wrapperRef: React.RefObject<HTMLInputElement>;

  constructor(props: CellProps) {
    super(props);
    this.state = {
      value: 0,
      showEdit: false,
      options: eingabeAlphabetOptionen,
    };

    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
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

  changeFieldValue(event: ChangeEvent) {
    if (event.target != null && event.target instanceof HTMLInputElement) {
      this.setState({
        value: event.target.value,
      });
    }
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event: MouseEvent) {
    if (this.wrapperRef) {
      if (
        this.wrapperRef != null &&
        this.wrapperRef.current != null &&
        event.target != null &&
        event.target instanceof Node
      ) {
        if (!this.wrapperRef.current.contains(event.target)) {
          this.setState({
            showEdit: false,
          });
        }
      }
    }
  }

  render() {
    const show = this.state.showEdit;

    return (
      <td ref={this.wrapperRef} className="px-6 py-4">
        <input
          type="text"
          name="value"
          id="valueInput"
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300"
          value={this.state.value}
          onChange={this.changeFieldValue.bind(this)}
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
