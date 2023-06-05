import ComplexTable from "./components/TeacherTable";
import { useGetUsers } from "state/user";
import { useMemo } from "react";

const columnsDataComplex = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "EMAIL",
    accessor: "email",
  },
  {
    Header: "TOTAL EARNINGS",
    accessor: "earnings",
  },
  {
    Header: "RATING",
    accessor: "rating",
  },
  {
    Header: "COMPLETED SESSIONS",
    accessor: "sessions",
  },
];

const TeacherManagement = () => {
  const { data = [], refetch } = useGetUsers({});
  const tableData = useMemo(
    () =>
      data.map((item) => ({
        name: item.displayName,
        email: item.email,
        earnings: item.detail?.currentEarnings || "",
        rating: `${item.detail.average || 0} (${
          item.detail.ratingCount || 0
        } reviews)`,
        sessions: `${item.detail?.totalCompletedSession || 0}`,
      })),
    [data]
  );
  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1">
        <ComplexTable
          onRefresh={refetch}
          columnsData={columnsDataComplex}
          tableData={tableData}
        />
      </div>
    </div>
  );
};

export default TeacherManagement;
