import { useGetUsers } from "state/user";
import { useMemo } from "react";
import StudentTable from "./components/StudentTable";
import dayjs from "dayjs";

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
    Header: "CREATED AT",
    accessor: "createdAt",
  },
  // {
  //   Header: "TOTAL EARNINGS",
  //   accessor: "earnings",
  // },
  // {
  //   Header: "RATING",
  //   accessor: "rating",
  // },
  // {
  //   Header: "COMPLETED SESSIONS",
  //   accessor: "sessions",
  // },
];

const StudentManagement = () => {
  const { data = [], refetch } = useGetUsers({
    role: "STUDENT",
  });
  const tableData = useMemo(
    () =>
      data.map((item) => ({
        name: item.displayName,
        email: item.email,
        createdAt: item.metadata?.creationTime
          ? dayjs(item.metadata.creationTime).format("DD MMM YYYY HH:mm A")
          : "",
        // earnings: item.detail?.currentEarnings || "",
        // rating: `${item.detail.average || 0} (${
        //   item.detail.ratingCount || 0
        // } reviews)`,
        // sessions: `${item.detail?.totalCompletedSession || 0}`,
      })),
    [data]
  );
  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1">
        <StudentTable
          onRefresh={refetch}
          columnsData={columnsDataComplex}
          tableData={tableData}
        />
      </div>
    </div>
  );
};

export default StudentManagement;
