import { useState, useEffect } from "react";

const ResumeAccounts = () => {
  const urlAPI = `${import.meta.env.VITE_BACKEND_ADRESS}:${import.meta.env.VITE_BACKEND_PORT}/all/accounts`;
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const fetchGet = await fetch(urlAPI),
        fetchResponse = await fetchGet.json();
      return fetchResponse.data;
    } catch (error) {
      console.error("An error occurred while executing fetchData() : ", error);
    }
  };

  const showAccounts = data.map((account) => (
    <div
      key={account._id}
      className="p-card card mt-2 p-3 col-12 md:col-6 lg:col-2 flex justify-content-between mb-1"
    >
      <div>
        <span className="block text-500 font-medium mb-3">{account.label}</span>
        <div className="text-900 font-medium text-xl">{account.balance} €</div>
      </div>
    </div>
  ));

  useEffect(() => {
    fetchData().then((data) => {
      setData(data);
    });
  }, []);

  return (
    <>
      <div className="grid w-full gap-3">{showAccounts}</div>
    </>
  );
};

export default ResumeAccounts;
