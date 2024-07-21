import { useState, useEffect } from "react";

const ResumeAccounts = () => {
  const urlAPI = `${import.meta.env.VITE_BACKEND_ADRESS}:${import.meta.env.VITE_BACKEND_PORT}/all/accounts`;
  const [sumBalance, setSumBalance] = useState(0)
  const [balanceAssignable, setSumBalanceAssignable] = useState(0)
  const [balanceUnassignable, setSumBalanceUnassignable] = useState(0)
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
      setSumBalance(() => data.reduce((acc, curr) => acc + curr.balance, 0))
      setSumBalanceAssignable(() => data.filter(object => object.assignable).reduce((acc, curr) => acc + curr.balance, 0))
      setSumBalanceUnassignable(() => data.filter(object => !object.assignable).reduce((acc, curr) => acc + curr.balance, 0))
      
    });

    console.log(balanceAssignable)
  }, []);

  return (
    <>
      <div className="grid w-full gap-3">{showAccounts}</div>

      <div className="p-card card p-3 col-12 md:col-6 lg:col-2 justify-content-between mb-1">
        <div>
        <div className="text-800 pt-1 text-right">Total on your accounts : {sumBalance} €</div>
        <div className="text-400 text-red-400 pt-2 text-sm text-right">Total unassignable : -{balanceUnassignable} €</div>
        <div className="text-400 text-green-400 pt-2 pb-1 text-sm text-right">Total assignable : {balanceAssignable} €</div>

        </div>
      </div>
    </>
  );
};

export default ResumeAccounts;
