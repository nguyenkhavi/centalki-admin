import Card from "components/card";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { useMemo, useState } from "react";

import { BsPlus } from "react-icons/bs";
import InputField from "components/fields/InputField";
import { useApproveTeacher } from "state/user";
import { toast } from "react-toastify";
const ComplexTable = (props) => {
  const { columnsData, tableData, onRefresh } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 1000;

  const [email, setEmail] = useState("");
  const { mutate: approveTeacher } = useApproveTeacher({
    onError: (error) => {
      toast.error(error.message || "Something went wrong!");
    },
    onSuccess: (data, vari) => {
      toast.success(`Add ${vari.email} to teachers suceed!`);
      setEmail();
      onRefresh();
    },
  });

  const _handleChangeEmail = ({ target }) => setEmail(target.value);

  const _handleSubmit = () => {
    if (!email) return;
    approveTeacher({ email });
  };

  return (
    <Card extra={"w-full h-full p-4 sm:overflow-x-auto"}>
      <div class="relative flex items-center justify-start gap-4">
        <div class="text-xl font-bold text-navy-700 dark:text-white">
          Approve new teacher
        </div>
        <InputField
          variant="auth"
          extra="mb-3"
          placeholder="New teacher's email"
          id="email"
          type="text"
          value={email}
          onChange={_handleChangeEmail}
        />
        <button
          onClick={_handleSubmit}
          className={`dark:active:bg-white/10"} linear flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-xl font-bold text-brand-500 transition duration-200 hover:cursor-pointer hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20`}
        >
          <BsPlus className="h-6 w-6" />
        </button>
      </div>

      <div class="mt-8 h-full overflow-x-scroll xl:overflow-hidden">
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={index}
                    className="border-b border-gray-200 pb-[10px] pr-28 text-start dark:!border-navy-700"
                  >
                    <p className="text-xs tracking-wide text-gray-600">
                      {column.render("Header")}
                    </p>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.id === "earnings") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </p>
                      );
                    } else if (cell.column.id === "createdAt") {
                      data = (
                        <p className="flex items-center gap-2 text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value.toLocaleString("en", {
                            day: "2-digit",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      );
                    } else
                      data = (
                        <p className="flex items-center gap-2 text-sm font-bold text-navy-700 dark:text-white">
                          {/* {cell.column.id === "name" && <Checkbox />} */}
                          {cell.value}
                        </p>
                      );
                    return (
                      <td
                        className="pb-[18px] pt-[14px] sm:text-[14px]"
                        {...cell.getCellProps()}
                        key={index}
                      >
                        {data}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ComplexTable;
