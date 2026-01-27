import React from "react";
import AppointmentActions from "./AppointmentActions";

const AppointmentsRow = ({
  appointment,
  index,
  userRole,
  onCancel,
  onComplete,
  calculateAge,
  slotDateFormat,
}) => {
  const isAdmin = userRole === "admin";
  const rowClass = isAdmin
    ? "sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr]"
    : "sm:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr]";

  return (
    <div
      className={`
        flex flex-col sm:grid ${rowClass} 
        gap-3 sm:gap-4 
        p-4 sm:p-6 
        border-b border-gray-100 
        hover:bg-gray-50 
        transition-colors duration-150
      `}
    >
      {/* Index */}
      <div className="hidden sm:block">{index + 1}</div>

      {/* Patient Info */}
      <div className="flex items-center gap-2">
        <img
          className="w-8 rounded-full "
          src={appointment.userData.image}
          alt={appointment.userData.name}
        />
        <p>{appointment.userData.name}</p>
        <div>
          <p className="text-xs text-gray-500 sm:hidden">
            Age: {calculateAge(appointment.userData.dob)}
          </p>
        </div>
      </div>

      {/* Payment Method (Doctor only) */}
      {!isAdmin && (
        <div>
          <span
            className={`
            inline-block px-2 rounded-full text-sm font-medium
            ${
              appointment.payment
                ? "bg-blue-100 text-blue-800 border border-blue-200"
                : "bg-green-100 text-green-800 border border-green-200"
            }
          `}
          >
            {appointment.payment ? "Online" : "CASH"}
          </span>
        </div>
      )}

      {/* Age */}
      <div className="hidden sm:block">
        {calculateAge(appointment.userData.dob)}
      </div>

      {/* Date & Time */}
      <div className="text-gray-700">
        <p className="font-medium">{slotDateFormat(appointment.slotDate)}</p>
        <p className="text-sm text-gray-500">{appointment.slotTime}</p>
      </div>

      {/* Doctor Info (Admin only) */}
      {isAdmin && (
        <div className="flex items-center gap-3">
          <img
            className="w-10 h-10 rounded-full object-cover border border-gray-200"
            src={appointment.docData.image}
            alt={appointment.docData.name}
          />
          <p className="font-medium text-gray-800">
            {appointment.docData.name}
          </p>
        </div>
      )}

      {/* Fees */}
      <div className="font-semibold text-gray-800">$ {appointment.amount}</div>

      {/* Actions */}
      <AppointmentActions
        appointment={appointment}
        userRole={userRole}
        onCancel={onCancel}
        onComplete={onComplete}
      />
    </div>
  );
};

export default AppointmentsRow;
