import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import AppointmentsRow from "./AppointmentsRow";

const AppointmentsTable = ({
  userRole,
  appointments,
  onCancel,
  onComplete,
}) => {
  const { calculateAge, slotDateFormat } = useContext(AppContext);

  // Table columns configuration
  const getColumnConfig = () => {
    if (userRole === "admin") {
      return {
        className: "grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr]",
        headers: [
          "#",
          "Patient",
          "Age",
          "Date & Time",
          "Doctor",
          "Fees",
          "Actions",
        ],
      };
    } else {
      return {
        className: "grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr]",
        headers: [
          "#",
          "Patient",
          "Payment",
          "Age",
          "Date & Time",
          "Fees",
          "Actions",
        ],
      };
    }
  };

  const columnConfig = getColumnConfig();

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      {/* Desktop Table Headers */}
      <div
        className={`hidden sm:grid ${columnConfig.className} gap-4 bg-gray-50 py-4 px-6 border-b border-gray-200`}
      >
        {columnConfig.headers.map((header, index) => (
          <div key={index} className="font-medium text-gray-700 text-sm">
            {header}
          </div>
        ))}
      </div>

      {/* Table Body */}
      <div className="max-h-[70vh] overflow-y-auto">
        {appointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <p className="text-lg mb-2">No appointments found</p>
            <p className="text-sm">
              When appointments are scheduled, they will appear here
            </p>
          </div>
        ) : (
          appointments.map((appointment, index) => (
            <AppointmentsRow
              key={appointment._id || index}
              appointment={appointment}
              index={index}
              userRole={userRole}
              onCancel={onCancel}
              onComplete={onComplete}
              calculateAge={calculateAge}
              slotDateFormat={slotDateFormat}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AppointmentsTable;
