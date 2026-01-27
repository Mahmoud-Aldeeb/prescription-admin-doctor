import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [about, setAbout] = useState("");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!docImg) {
        return toast.error("Please upload doctor image");
      }
      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("speciality", speciality);
      formData.append("about", about);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      formData.forEach((value, key) => {
        console.log(key, value);
      });

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        {
          headers: {
            aToken,
          },
        }
      );
      if (data.success) {
        toast.success("Doctor added successfully");
        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setExperience("1 Year");
        setFees("");
        setSpeciality("General physician");
        setAbout("");
        setDegree("");
        setAddress1("");
        setAddress2("");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="m-5 w-full ">
      <h3 className="mb-3 text-lg font-medium">Add Doctor</h3>
      <div className="bg-white px-8 py-8 border border-gray-300 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="w-16"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="image"
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p>
            Upload Doctor <br /> Picture
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="name">Doctor Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                className="border rounded px-3 py-3"
                id="name"
                type="text"
                placeholder="Name"
                required
                value={name}
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="email">Doctor Email</label>
              <input
                className="border rounded px-3 py-3"
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="Email"
                required
                value={email}
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="password">Doctor Password</label>
              <input
                className="border rounded px-3 py-3"
                id="password"
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="experience">Experience</label>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="border rounded px-3 py-3"
                id="experience"
              >
                <option value="1">1 Year</option>
                <option value="2">2 Year</option>
                <option value="3">3 Year</option>
                <option value="4">4 Year</option>
                <option value="5">5 Year</option>
                <option value="6">6 Year</option>
                <option value="7">7 Year</option>
                <option value="8">8 Year</option>
                <option value="9">9 Year</option>
                <option value="10">10 Year</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="fees">Fees</label>
              <input
                className="border rounded px-3 py-3"
                id="fees"
                type="number"
                placeholder="fees"
                required
                onChange={(e) => setFees(e.target.value)}
                value={fees}
              />
            </div>
          </div>
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="speciality">Speciality</label>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="border rounded px-3 py-3"
                id="speciality"
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="education">Education</label>
              <input
                className="border rounded px-3 py-3"
                id="education"
                type="text"
                placeholder="Education"
                required
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="address">Address</label>
              <input
                className="border rounded px-3 py-3"
                id="address"
                type="text"
                placeholder="address 1"
                required
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
              />
              <input
                className="border rounded px-3 py-3"
                id="address"
                type="text"
                placeholder="address 2"
                required
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <label className="mt-4 mb-2" htmlFor="about">
            About Doctor
          </label>
          <textarea
            className="w-full border rounded px-4 pt-2"
            type="text"
            placeholder="Write about doctor"
            required
            id="about"
            rows={5}
            onChange={(e) => setAbout(e.target.value)}
            value={about}
          />
        </div>
        <button
          type="submit"
          className="bg-primary px-10 py-3 mt-4 text-white rounded-full"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
