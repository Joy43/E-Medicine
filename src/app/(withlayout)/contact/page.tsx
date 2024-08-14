'use client'
import { useState, ChangeEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone: string;
}

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://portfollio-server-seven.vercel.app/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          phone: "",
        });

        toast.success("Submitted your message successfully. Please check your email for details.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Error submitting form. Do you have this issue?", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Please try clicking the Send Email button again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden py-6 sm:py-12">
      <div className="bg-white max-w-4xl mx-auto w-full">
        <div className="grid grid-cols-6 h-full">
          <div className="bg-blue-900 p-10 col-span-2">
            <h2 className="mb-10 font-bold text-2xl text-blue-100 relative before:block before:absolute before:bg-sky-300 before:w-20 before:h-1 before:-skew-y-3 before:-bottom-4">
              Let's Contact
            </h2>
            <p className="font-bold text-blue-100 py-8 border-b border-blue-700">
              Location Address
              <span className="font-normal text-xs text-blue-300 block">
                Mirpur-2 Dhaka, Bangladesh
              </span>
            </p>
            <p className="font-bold text-blue-100 py-8 border-b border-blue-700">
              Phone Number
              <span className="font-normal text-xs text-blue-300 block">
                +880179244541
              </span>
            </p>
            <p className="font-bold text-blue-100 py-8 border-b border-blue-700">
              Email Address
              <span className="font-normal text-xs text-blue-300 block">
                ssjoy43@gmail.com
              </span>
            </p>
            <p className="font-bold text-blue-100 py-8 border-b border-blue-700">
              Web Address
              <span className="font-normal text-lg text-blue-300 block">
                <a href="https://portfollio-react.vercel.app/">Visited Now</a>
              </span>
            </p>
          </div>
          <div className="bg-blue-50 p-14 col-span-4">
            <h2 className="mb-14 font-bold text-4xl text-blue-900 relative before:block before:absolute before:bg-sky-300 before:w-20 before:h-1 before:-skew-y-3 before:-bottom-4">
              Entrer en contact
            </h2>
            <div className="grid gap-6 mb-6 grid-cols-2">
              <div className="flex flex-col">
                <input
                  className="py-4 bg-white text-black rounded-full px-6 placeholder:text-xs"
                  aria-placeholder="Votre nom"
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col">
                <input
                  className="py-4 bg-white text-black rounded-full px-6 placeholder:text-xs"
                  aria-placeholder="Votre nom"
                  placeholder="Phone number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  type="number"
                />
              </div>
            </div>
            <form>
              <div className="grid gap-6 mb-6 grid-cols-2">
                <div className="flex flex-col">
                  <input
                    className="py-4 bg-white text-black rounded-full px-6 placeholder:text-xs"
                    aria-placeholder="Votre nom"
                    placeholder="Email Adresse"
                    value={formData.email}
                    onChange={handleInputChange}
                    type="text"
                    name="email"
                  />
                </div>
                <div className="flex flex-col">
                  <input
                    className="py-4 bg-white text-black rounded-full px-6 placeholder:text-xs"
                    aria-placeholder="Votre nom"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    type="text"
                    name="subject"
                  />
                </div>
              </div>
              <div className="mb-6">
                <textarea
                  className="w-full text-black rounded-2xl placeholder:text-xs px-6 py-4"
                  placeholder="Please message here"
                  rows={8}
                  value={formData.message}
                  onChange={handleInputChange}
                  name="message"
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="rounded-full bg-blue-900 text-white font-bold py-4 px-6 min-w-40 hover:bg-blue-800 transition-all"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ContactUs;
