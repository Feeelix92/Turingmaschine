import { CellProps } from "../../interfaces/CommonInterfaces";

export default function Cell(props: CellProps) {
  return (
    <td className="px-6 py-4">
      <input
        type="text"
        name="value"
        id="valueInput"
        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300"
        value={props.value}
      />
    </td>
  );
}
