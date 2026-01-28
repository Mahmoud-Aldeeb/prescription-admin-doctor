// import React, { useContext, useState } from "react";
// import { assets } from "../../assets/assets";
// import { AdminContext } from "../../context/AdminContext";
// import { toast } from "react-toastify";
// import axios from "axios";

// const AddDoctor = () => {
//   const [docImg, setDocImg] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [experience, setExperience] = useState("1 Year");
//   const [fees, setFees] = useState("");
//   const [speciality, setSpeciality] = useState("General physician");
//   const [about, setAbout] = useState("");
//   const [degree, setDegree] = useState("");
//   const [address1, setAddress1] = useState("");
//   const [address2, setAddress2] = useState("");

//   const { backendUrl, aToken } = useContext(AdminContext);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (!docImg) {
//         return toast.error("Please upload doctor image");
//       }
//       const formData = new FormData();
//       formData.append("image", docImg);
//       formData.append("name", name);
//       formData.append("email", email);
//       formData.append("password", password);
//       formData.append("experience", experience);
//       formData.append("fees", Number(fees));
//       formData.append("speciality", speciality);
//       formData.append("about", about);
//       formData.append("degree", degree);
//       formData.append(
//         "address",
//         JSON.stringify({ line1: address1, line2: address2 }),
//       );

//       formData.forEach((value, key) => {
//         console.log(key, value);
//       });

//       const { data } = await axios.post(
//         `${backendUrl}/api/admin/add-doctor`,
//         formData,
//         {
//           headers: {
//             aToken: aToken,
//           },
//         },
//       );
//       if (data.success) {
//         toast.success("Doctor added successfully");
//         setDocImg(false);
//         setName("");
//         setEmail("");
//         setPassword("");
//         setExperience("1 Year");
//         setFees("");
//         setSpeciality("General physician");
//         setAbout("");
//         setDegree("");
//         setAddress1("");
//         setAddress2("");
//       } else {
//         toast.error(data.message);
//       }
//     } catch (err) {
//       toast.error(err.message);
//       console.log(err);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="m-5 w-full ">
//       <h3 className="mb-3 text-lg font-medium">Add Doctor</h3>
//       <div className="bg-white px-8 py-8 border border-gray-300 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
//         <div className="flex items-center gap-4 mb-8 text-gray-500">
//           <label htmlFor="doc-img">
//             <img
//               className="w-16"
//               src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
//               alt="image"
//             />
//           </label>
//           <input
//             onChange={(e) => setDocImg(e.target.files[0])}
//             type="file"
//             id="doc-img"
//             hidden
//           />
//           <p>
//             Upload Doctor <br /> Picture
//           </p>
//         </div>
//         <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
//           <div className="w-full lg:flex-1 flex flex-col gap-4">
//             <div className="flex-1 flex flex-col gap-1">
//               <label htmlFor="name">Doctor Name</label>
//               <input
//                 onChange={(e) => setName(e.target.value)}
//                 className="border rounded px-3 py-3"
//                 id="name"
//                 type="text"
//                 placeholder="Name"
//                 required
//                 value={name}
//               />
//             </div>
//             <div className="flex-1 flex flex-col gap-1">
//               <label htmlFor="email">Doctor Email</label>
//               <input
//                 className="border rounded px-3 py-3"
//                 onChange={(e) => setEmail(e.target.value)}
//                 id="email"
//                 type="email"
//                 placeholder="Email"
//                 required
//                 value={email}
//               />
//             </div>
//             <div className="flex-1 flex flex-col gap-1">
//               <label htmlFor="password">Doctor Password</label>
//               <input
//                 className="border rounded px-3 py-3"
//                 id="password"
//                 type="password"
//                 placeholder="Password"
//                 required
//                 onChange={(e) => setPassword(e.target.value)}
//                 value={password}
//               />
//             </div>
//             <div className="flex-1 flex flex-col gap-1">
//               <label htmlFor="experience">Experience</label>
//               <select
//                 onChange={(e) => setExperience(e.target.value)}
//                 value={experience}
//                 className="border rounded px-3 py-3"
//                 id="experience"
//               >
//                 <option value="1">1 Year</option>
//                 <option value="2">2 Year</option>
//                 <option value="3">3 Year</option>
//                 <option value="4">4 Year</option>
//                 <option value="5">5 Year</option>
//                 <option value="6">6 Year</option>
//                 <option value="7">7 Year</option>
//                 <option value="8">8 Year</option>
//                 <option value="9">9 Year</option>
//                 <option value="10">10 Year</option>
//               </select>
//             </div>
//             <div className="flex-1 flex flex-col gap-1">
//               <label htmlFor="fees">Fees</label>
//               <input
//                 className="border rounded px-3 py-3"
//                 id="fees"
//                 type="number"
//                 placeholder="fees"
//                 required
//                 onChange={(e) => setFees(e.target.value)}
//                 value={fees}
//               />
//             </div>
//           </div>
//           <div className="w-full lg:flex-1 flex flex-col gap-4">
//             <div className="flex-1 flex flex-col gap-1">
//               <label htmlFor="speciality">Speciality</label>
//               <select
//                 onChange={(e) => setSpeciality(e.target.value)}
//                 value={speciality}
//                 className="border rounded px-3 py-3"
//                 id="speciality"
//               >
//                 <option value="General physician">General physician</option>
//                 <option value="Gynecologist">Gynecologist</option>
//                 <option value="Dermatologist">Dermatologist</option>
//                 <option value="Pediatricians">Pediatricians</option>
//                 <option value="Neurologist">Neurologist</option>
//                 <option value="Gastroenterologist">Gastroenterologist</option>
//               </select>
//             </div>
//             <div className="flex-1 flex flex-col gap-1">
//               <label htmlFor="education">Education</label>
//               <input
//                 className="border rounded px-3 py-3"
//                 id="education"
//                 type="text"
//                 placeholder="Education"
//                 required
//                 onChange={(e) => setDegree(e.target.value)}
//                 value={degree}
//               />
//             </div>
//             <div className="flex-1 flex flex-col gap-1">
//               <label htmlFor="address">Address</label>
//               <input
//                 className="border rounded px-3 py-3"
//                 id="address"
//                 type="text"
//                 placeholder="address 1"
//                 required
//                 onChange={(e) => setAddress1(e.target.value)}
//                 value={address1}
//               />
//               <input
//                 className="border rounded px-3 py-3"
//                 id="address"
//                 type="text"
//                 placeholder="address 2"
//                 required
//                 onChange={(e) => setAddress2(e.target.value)}
//                 value={address2}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-col">
//           <label className="mt-4 mb-2" htmlFor="about">
//             About Doctor
//           </label>
//           <textarea
//             className="w-full border rounded px-4 pt-2"
//             type="text"
//             placeholder="Write about doctor"
//             required
//             id="about"
//             rows={5}
//             onChange={(e) => setAbout(e.target.value)}
//             value={about}
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-primary px-10 py-3 mt-4 text-white rounded-full"
//         >
//           Add Doctor
//         </button>
//       </div>
//     </form>
//   );
// };

// export default AddDoctor;

import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null);
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
  const [isUploading, setIsUploading] = useState(false);

  const { backendUrl, aToken } = useContext(AdminContext);

  const validateImage = (file) => {
    if (!file) {
      toast.error("Please select an image");
      return false;
    }

    const MAX_SIZE = 4 * 1024 * 1024; // 4MB
    if (file.size > MAX_SIZE) {
      toast.error(`Image size is too large. Maximum size is 4MB`);
      return false;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid image type. Allowed: JPEG, JPG, PNG, GIF, WebP");
      return false;
    }

    const allowedExtensions = ["jpeg", "jpg", "png", "gif", "webp"];
    const fileExtension = file.name.toLowerCase().split(".").pop();

    if (!allowedExtensions.includes(fileExtension)) {
      toast.error(
        `Invalid file extension. Allowed: ${allowedExtensions.join(", ")}`,
      );
      return false;
    }

    return true;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (validateImage(file)) {
      setDocImg(file);
      toast.success("Image selected successfully");
    } else {
      setDocImg(null);
      e.target.value = "";
    }
  };

  const ImageInfo = () => {
    if (!docImg) return null;

    const sizeInMB = (docImg.size / (1024 * 1024)).toFixed(2);

    return (
      <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
        <p className="text-sm text-gray-700">
          <span className="font-medium">Selected Image:</span> {docImg.name}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Size:</span> {sizeInMB} MB
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Type:</span> {docImg.type}
        </p>
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!docImg) {
        toast.error("Please upload doctor image");
        return;
      }

      if (!validateImage(docImg)) {
        return;
      }

      if (
        !name ||
        !email ||
        !password ||
        !fees ||
        !degree ||
        !address1 ||
        !about
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email address");
        return;
      }

      if (password.length < 8) {
        toast.error("Password must be at least 8 characters");
        return;
      }

      setIsUploading(true);

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
        JSON.stringify({ line1: address1, line2: address2 }),
      );

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        {
          headers: {
            aToken: aToken,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (data.success) {
        toast.success("Doctor added successfully");

        // إعادة تعيين الحقول
        setDocImg(null);
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

        document.getElementById("doc-img").value = "";
      } else {
        toast.error(data.message || "Failed to add doctor");
      }
    } catch (err) {
      console.error("Error:", err);

      if (err.response) {
        const errorMessage =
          err.response.data?.message || err.response.statusText;

        if (err.response.status === 400) {
          toast.error(`Validation error: ${errorMessage}`);
        } else if (err.response.status === 413) {
          toast.error("File is too large. Please select a smaller image");
        } else if (err.response.status === 500) {
          toast.error("Server error. Please try again later");
        } else {
          toast.error(errorMessage);
        }
      } else if (err.request) {
        toast.error("Network error. Please check your connection");
      } else {
        toast.error(err.message || "Something went wrong");
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="m-5 w-full">
      <h3 className="mb-3 text-lg font-medium">Add Doctor</h3>

      <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-md">
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-medium">Image Requirements:</span>
        </p>
        <ul className="text-xs text-gray-500 list-disc pl-5 space-y-1">
          <li>Maximum size: 4MB</li>
          <li>Allowed types: JPEG, JPG, PNG, GIF, WebP</li>
        </ul>
      </div>

      <div className="bg-white px-8 py-8 border border-gray-300 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-4 text-gray-500">
          <label
            htmlFor="doc-img"
            className="cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img
              className="w-20 h-20 object-cover rounded-md border-2 border-dashed border-gray-300"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt={docImg ? "Doctor preview" : "Upload area"}
            />
          </label>
          <div>
            <input
              onChange={handleImageChange}
              type="file"
              id="doc-img"
              hidden
              accept=".jpg,.jpeg,.png,.gif,.webp,image/jpeg,image/jpg,image/png,image/gif,image/webp"
            />
            <div>
              <p className="font-medium">Upload Doctor Picture</p>
              <p className="text-sm text-gray-400">Click to select an image</p>
            </div>
          </div>
        </div>

        <ImageInfo />

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600 mt-6">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="name" className="flex items-center gap-1">
                Doctor Name <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                className="border rounded px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                id="name"
                type="text"
                placeholder="Enter doctor name"
                required
                value={name}
                disabled={isUploading}
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="email" className="flex items-center gap-1">
                Doctor Email <span className="text-red-500">*</span>
              </label>
              <input
                className="border rounded px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="doctor@example.com"
                required
                value={email}
                disabled={isUploading}
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="password" className="flex items-center gap-1">
                Doctor Password <span className="text-red-500">*</span>
                <span className="text-xs text-gray-400">
                  (min 8 characters)
                </span>
              </label>
              <input
                className="border rounded px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                id="password"
                type="password"
                placeholder="••••••••"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isUploading}
                minLength="8"
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="experience">Experience</label>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="border rounded px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                id="experience"
                disabled={isUploading}
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
                <option value="4 Years">4 Years</option>
                <option value="5 Years">5 Years</option>
                <option value="6 Years">6 Years</option>
                <option value="7 Years">7 Years</option>
                <option value="8 Years">8 Years</option>
                <option value="9 Years">9 Years</option>
                <option value="10+ Years">10+ Years</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="fees" className="flex items-center gap-1">
                Fees <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  className="border rounded px-3 py-3 pl-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  id="fees"
                  type="number"
                  placeholder="100"
                  required
                  onChange={(e) => setFees(e.target.value)}
                  value={fees}
                  disabled={isUploading}
                  min="0"
                />
              </div>
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="speciality" className="flex items-center gap-1">
                Speciality <span className="text-red-500">*</span>
              </label>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="border rounded px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                id="speciality"
                disabled={isUploading}
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Orthopedic">Orthopedic</option>
                <option value="Psychiatrist">Psychiatrist</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="education" className="flex items-center gap-1">
                Education/Degree <span className="text-red-500">*</span>
              </label>
              <input
                className="border rounded px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                id="education"
                type="text"
                placeholder="e.g., MBBS, MD, etc."
                required
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                disabled={isUploading}
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="address1" className="flex items-center gap-1">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                className="border rounded px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                id="address1"
                type="text"
                placeholder="Street, Building No."
                required
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                disabled={isUploading}
              />
              <input
                className="border rounded px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-2"
                id="address2"
                type="text"
                placeholder="City, State, Zip Code"
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                disabled={isUploading}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-6">
          <label className="mb-2 flex items-center gap-1" htmlFor="about">
            About Doctor <span className="text-red-500">*</span>
          </label>
          <textarea
            className="w-full border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="text"
            placeholder="Write about doctor's qualifications, experience, specialties..."
            required
            id="about"
            rows={5}
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            disabled={isUploading}
          />
          <p className="text-xs text-gray-400 mt-1">Minimum 50 characters</p>
        </div>

        <button
          type="submit"
          className={`px-10 py-3 mt-6 text-white rounded-full font-medium transition-all ${
            isUploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary hover:bg-blue-700"
          }`}
          disabled={isUploading}
        >
          {isUploading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Adding Doctor...
            </div>
          ) : (
            "Add Doctor"
          )}
        </button>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            <span className="text-red-500">*</span> Required fields
          </p>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;
