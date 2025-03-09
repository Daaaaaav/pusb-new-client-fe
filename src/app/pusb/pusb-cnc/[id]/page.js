import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // React Router for navigation
import { FiInstagram } from "react-icons/fi";
import CardCnCActivityContainer from "./components/CardCnCActivityContainer";
import { GetPUSBCNCById } from "./api/pusb-cnc"; // Adjust API path as needed
import { CNC } from "./types/pusb-cnc-type";
import Loader from "./components/shared/Loader";

const Page = ({ match }) => {
  const cncId = match.params.id; // Extract ID from React Router

  const [cnc, setCnc] = useState<CNC | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetPUSBCNCById(cncId);
        setCnc(data);
      } catch (error) {
        console.error("Error fetching CNC data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [cncId]);

  if (loading) {
    return (
      <main className="w-full min-h-screen flex justify-center items-center">
        <Loader />
      </main>
    );
  }

  if (!cnc) {
    return (
      <main className="w-full min-h-screen flex justify-center items-center">
        <p className="text-red-500">CNC data not found.</p>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen">
      <section className="w-full p-8">
        <div className="space-y-2 text-center">
          <h2 className="text-5xl font-extrabold">{cnc.short_name}</h2>
          <div className="w-full flex justify-center items-center">
            <span className="w-1/5 flex justify-center items-center">
              <span className="h-px flex-1 bg-white"></span>
              <span className="shrink-0 px-6 font-serif text-lg font-semibold dark:text-gray-400">
                {cnc.full_name}
              </span>
              <span className="h-px flex-1 bg-white"></span>
            </span>
          </div>
        </div>

        <div className="mx-auto max-w-screen-2xl py-8 lg:px-8">
          <div className="grid grid-cols-1 lg:h-[70vh] lg:grid-cols-2">
            <div className="relative z-10 lg:py-8 lg:ml-20">
              <div className="relative h-72 sm:h-96 lg:h-full">
                <img
                  alt={cnc.short_name}
                  src={cnc.image}
                  className="absolute inset-0 h-100 w-100 object-fit lg:rounded-xl"
                  width={500}
                  height={500}
                />
              </div>
            </div>

            <div className="relative w-[500px] flex items-center bg-gray-200 lg:rounded-r-xl">
              <span className="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 lg:bg-gray-200 rounded-l-xl"></span>

              <div className="p-8 sm:p-16 lg:p-24">
                <h2
                  className="text-3xl text-gray-900 font-bold sm:text-5xl"
                  style={{ fontFamily: "Protest Strike" }}
                >
                  {cnc.short_name}
                </h2>
                <p className="text-base font-semibold text-black">
                  {cnc.category} CnC
                </p>
                <p className="mt-4 text-gray-600">{cnc.description}</p>
                <div className="mt-4">
                  <div className="w-full flex items-center gap-4 mt-2 text-black">
                    <span className="text-sm text-gray-900 font-bold">
                      Get in Touch:
                    </span>
                    <Link to={cnc.instagram}>
                      <FiInstagram className="w-5 h-5 hover:scale-110 transition-all duration-300" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-8 lg:px-16">
        <h1 className="text-4xl font-semibold lg:text-5xl mb-4 lg:mb-0 py-8">
          <span className="italic">Workplan</span>
          <span className="font-bold"> {cnc.short_name}</span>
        </h1>
        <CardCnCActivityContainer id={cncId} />
      </section>
    </main>
  );
};

export default Page;
