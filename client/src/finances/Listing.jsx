import { useEffect, useState } from "react";

import Buckets from "./buckets/Buckets";
import Vaults from "./vaults/Vaults";
import { Card } from "primereact/card";
import ResumeAccounts from "./components/ResumeAccounts";
import { Divider } from "primereact/divider";

import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react";

const Listing = (props) => {
  const [monthSelected, setMonthSelected] = useState(new Date().getMonth() + 1);
  const [yearSelected, setYearSelected] = useState(new Date().getFullYear());
  const [beforeMonth, setBeforeMonth] = useState([]);
  const [afterMonth, setAfterMonth] = useState([]);

  const listMonth = () => {
    const arrayMonth = [];
    for (let i = -6; i <= 6; i++) {
      const date = new Date(yearSelected, monthSelected + i, 0);
      arrayMonth.push({
        month: date.toLocaleString("default", { month: "long" }),
        year: date.getFullYear(),
        monthNumbered: date.getMonth() + 1,
      });
    }
    setBeforeMonth(
      arrayMonth.filter((item, index) => {
        return index >= 0 && index <= 5;
      })
    );
    setAfterMonth(
      arrayMonth.filter((item, index) => {
        return index >= 7 && index <= 13;
      })
    );
  };

  const urlAPIBuckets = `${import.meta.env.VITE_BACKEND_ADRESS}:${import.meta.env.VITE_BACKEND_PORT}/buckets/${yearSelected}/${monthSelected}`;
  const urlAPIVault = `${import.meta.env.VITE_BACKEND_ADRESS}:${import.meta.env.VITE_BACKEND_PORT}/vaults/${yearSelected}/${monthSelected}`;

  const [monthName, setMonthName] = useState();

  const [buckets, setBuckets] = useState([]);
  const [bucketsTotalAssigned, setBucketsTotalAssigned] = useState();
  const [vaultsTotalAssigned, setVaultsTotalAssigned] = useState();
  const [vaults, setVaults] = useState([]);

  const fetchBuckets = async () => {
    try {
      const fetchGet = await fetch(urlAPIBuckets),
        fetchResponse = await fetchGet.json();
      return fetchResponse.data;
    } catch (error) {
      console.error("An error occurred while executing fetchData() : ", error);
    }
  };
  const fetchVaults = async () => {
    try {
      const fetchGet = await fetch(urlAPIVault),
        fetchResponse = await fetchGet.json();
      return fetchResponse.data;
    } catch (error) {
      console.error("An error occurred while executing fetchData() : ", error);
    }
  };

  useEffect(() => {
    if (monthSelected === 13) {
      setMonthSelected(1);
      setYearSelected(yearSelected + 1);
    } else if (monthSelected === 0) {
      setMonthSelected(12);
      setYearSelected(yearSelected - 1);
    } else if (monthSelected > 0 && monthSelected < 13) {
      fetchBuckets().then((data) => {
        setBuckets(data);
        const calculate = data.reduce(
          (total, objet) => total + objet.monthly.assigned,
          0
        );
        setBucketsTotalAssigned(calculate);
      });
      fetchVaults().then((data) => {
        setVaults(data);
        const calculate = data.reduce(
          (total, objet) => total + objet.monthly.assigned,
          0
        );
        setVaultsTotalAssigned(calculate);
      });
      listMonth();
      const monthNamed = new Date(yearSelected, monthSelected, 0);
      setMonthName(monthNamed.toLocaleString("default", { month: "long" }));
    }
  }, [monthSelected]);

  return (
    <>
      {/* TODO Revoir le responsive design sur toutes les cards (bug mobile) */}

      <div className="flex justify-content-center align-content-center flex-wrap">
        {beforeMonth.map((item, index) => (
          <div className="flex align-content-center flex-wrap" key={index}>
            <span
              className="px-2 cursor-pointer pt-2 hover:text-800 text-400 flex align-items-center justify-content-center"
              onClick={() => {
                setMonthSelected(item.monthNumbered);
                setYearSelected(item.year);
              }}
            >
              {item.month} {item.year}
            </span>
          </div>
        ))}
        <div className="flex align-content-center flex-wrap">
          <IconChevronLeft
            onClick={() => setMonthSelected((prevMonth) => prevMonth - 1)}
            size={28}
            className="pt-2 cursor-pointer hover:text-900 text-600"
            stroke={2}
          />
        </div>
        <span className="flex align-items-center justify-content-center text-5xl px-3">
          {monthName} {yearSelected}
        </span>
        <div className="flex align-content-center flex-wrap">
          <IconChevronRight
            onClick={() => setMonthSelected((prevMonth) => prevMonth + 1)}
            size={28}
            className="pt-2 cursor-pointer hover:text-900 text-600"
            stroke={2}
          />
        </div>
        {afterMonth.map((item, index) => (
          <div className="flex align-content-center flex-wrap" key={index}>
            <span
              className="px-2 cursor-pointer pt-2 hover:text-800 text-400 flex align-items-center justify-content-center"
              onClick={() => {
                setMonthSelected(item.monthNumbered);
                setYearSelected(item.year);
              }}
            >
              {item.month} {item.year}
            </span>
          </div>
        ))}
      </div>
      <div className="w-9 mb-4 mx-auto flex flex-wrap justify-content-center align-content-end flex-wrap">
        <Divider />
        <div className="flex flex-grow-1 ">
          <ResumeAccounts />
        </div>{" "}
        <div className="flex text-2xl justify-content-center align-items-center text-right">
          {vaultsTotalAssigned + bucketsTotalAssigned} € assigned this month
        </div>
      </div>

      <div className="flex flex-column justify-content-center">
        <div className="flex align-items-center justify-content-center">
          <Card
            className="card w-9 "
            title="🥛 Buckets"
            subTitle="Don't be shy, spend it !"
          >
            <div className="pt-4">
              <Buckets
                className="mt-2"
                fetch={buckets}
                totalAssigned={bucketsTotalAssigned}
              />
            </div>
          </Card>
        </div>
        <div className="flex align-items-center justify-content-center pt-4">
          <Card
            className="card w-9 justify-content-center"
            title="🏦 Vaults"
            subTitle="For emperors, build your empire"
          >
            <div className="pt-4">
              <Vaults fetch={vaults} totalAssigned={vaultsTotalAssigned} />
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Listing;
