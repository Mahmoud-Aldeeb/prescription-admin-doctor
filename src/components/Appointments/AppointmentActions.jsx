import React from "react";
import { assets } from "../../assets/assets";

const AppointmentActions = ({
  appointment,
  userRole,
  onCancel,
  onComplete,
}) => {
  const isAdmin = userRole === "admin";

  if (appointment.cancelled) {
    return (
      <div>
        <span className="px-3 py-1.5 bg-red-50 text-red-700 text-xs font-medium rounded-full border border-red-200">
          Cancelled
        </span>
      </div>
    );
  }

  if (appointment.isCompleted) {
    return (
      <div>
        <span className="px-3 py-1.5 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-200">
          Completed
        </span>
      </div>
    );
  }

  // Active appointment actions
  return (
    <div className="flex items-center gap-2 justify-center sm:justify-start">
      {/* Cancel Button */}
      <button
        onClick={() => onCancel(appointment._id)}
        className="
          flex 
        "
        title="Cancel Appointment"
      >
        <img
          className="w-10 cursor-pointer"
          src={assets.cancel_icon}
          alt="Cancel"
        />
      </button>

      {/* Complete Button (Doctor only) */}
      {!isAdmin && (
        <button
          onClick={() => onComplete(appointment._id)}
          className="
            flex 
          "
          title="Complete Appointment"
        >
          <img
            className="w-10 cursor-pointer"
            src={assets.tick_icon}
            alt="Complete"
          />
        </button>
      )}
    </div>
  );
};

export default AppointmentActions;
