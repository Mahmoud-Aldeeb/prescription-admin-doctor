import React, { useContext, useEffect, useMemo, useRef } from "react";
import { AdminContext } from "../../context/AdminContext.jsx";
import { DoctorContext } from "../../context/DoctorContext.jsx";
import AppointmentsTable from "./AppointmentsTable";

const Appointments = () => {
  // Contexts
  const {
    aToken,
    appointments: adminAppointments,
    getAllAppointments,
    cancelAppointment,
  } = useContext(AdminContext);

  const {
    dToken,
    appointments: doctorAppointments,
    getAppointments,
    completeAppointment,
    cancelAppointment: cancelDocAppointment,
  } = useContext(DoctorContext);

  const hasFetched = useRef({ admin: false, doctor: false });

  const userRole = useMemo(() => {
    if (aToken) return "admin";
    if (dToken) return "doctor";
    return null;
  }, [aToken, dToken]);

  useEffect(() => {
    if (aToken && !hasFetched.current.admin) {
      getAllAppointments();
      hasFetched.current.admin = true;
    }
  }, [aToken, getAllAppointments]);

  useEffect(() => {
    if (dToken && !hasFetched.current.doctor) {
      getAppointments();
      hasFetched.current.doctor = true;
    }
  }, [dToken, getAppointments]);

  const currentAppointments = useMemo(() => {
    if (userRole === "admin") {
      return adminAppointments;
    } else if (userRole === "doctor") {
      return doctorAppointments;
    }
    return [];
  }, [userRole, adminAppointments, doctorAppointments]);

  const handleCancel = (id) => {
    if (userRole === "admin") {
      cancelAppointment(id);
    } else {
      cancelDocAppointment(id);
    }
  };

  const handleComplete = (id) => {
    if (userRole === "doctor") {
      completeAppointment(id);
    }
  };

  if (!userRole) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <section className="w-full max-w-6xl m-5">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          {userRole === "admin" ? "All Appointments" : "My Appointments"}
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          {userRole === "admin"
            ? "View and manage all appointments in the system"
            : "View and manage your upcoming appointments"}
        </p>
      </div>

      <AppointmentsTable
        userRole={userRole}
        appointments={currentAppointments}
        onCancel={handleCancel}
        onComplete={handleComplete}
      />
    </section>
  );
};

export default Appointments;
