import { useState, useEffect } from "react";

import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";
import { Divider } from "primereact/divider";
import { Calendar } from "primereact/calendar";
import { Chip } from "primereact/chip";

import { IconBucket, IconWallet } from "@tabler/icons-react";

const TransactionsVault = () => {
  const urlAPI = `${import.meta.env.VITE_BACKEND_ADRESS}:${import.meta.env.VITE_BACKEND_PORT}/transactions/vaults`;

  const [formData, setFormData] = useState({});

  const [accountsData, setAccountsData] = useState({});
  const [selectedAccount, setSelectedAccount] = useState(null);

  const [vaultsData, setVaultsData] = useState({});
  const [selectedVault, setSelectedVault] = useState(null);
  const [accountLinked, setAccountLinked] = useState(null);

  const [date, setDate] = useState(new Date());

  const fetchData = async () => {
    try {
      const fetchGet = await fetch(urlAPI),
        fetchResponse = await fetchGet.json();
      return fetchResponse;
    } catch (error) {
      console.error("An error occurred while executing fetchData() : ", error);
    }
  };

  const postData = async (e) => {
    e.preventDefault();

    try {
      await fetch(urlAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sourceAccount: selectedAccount._id,
          vault: selectedVault._id,
          accountLinked: accountLinked._id,
          label: formData.label,
          amount: formData.amount,
          date,
        }),
      });
    } catch (err) {
      console.error("Une erreur s'est produite : ", err);
    }
  };

  const addBalanceToAccount = (data) => {
    const transformedData = data.dataAccounts.map((item) => ({
      _id: item._id,
      type: "ACCOUNTS",
      label: `${item.label} | ${item.balance} €`,
      balance: item.balance,
    }));
    setAccountsData(transformedData);
  };

  const selectVault = async (e) => {
    e.preventDefault();
    setSelectedVault(e.value);
    setAccountLinked(
      accountsData.find((item) => item._id == e.value.accountLinked)
    );
  };

  useEffect(() => {
    fetchData().then((data) => {
      addBalanceToAccount(data);
      setVaultsData(data.dataVaults);
    });
  }, []);

  return (
    <>
      <div className="flex justify-content-center">
        <Card
          className="card w-auto"
          title="Transaction Vault"
          subTitle="Saving money !"
        >
          <Divider align="left">
            <div className="inline-flex align-items-center">
              <b>Resume</b>
            </div>
          </Divider>
          <div className="flex-wrap align-items-stretch w-full">
            {selectedVault && formData.amount ? (
              <>
                <Chip
                  className="pl-0 pr-3"
                  template={
                    <>
                      <span className="bg-primary border-round-xl border-round-right w-3rem h-3rem flex align-items-center justify-content-center">
                        <IconBucket size={18} />
                      </span>
                      <span className="ml-2 text-xl p-2">
                        {selectedVault.label} : the old balance of{" "}
                        {selectedVault.balance} € switch to{" "}
                        {formData.amount + selectedVault.balance} €
                      </span>
                    </>
                  }
                />
                <Chip
                  className="pl-0 pr-3 mx-4"
                  template={
                    <>
                      <span className="bg-red-600 text-white border-round-xl border-round-right w-3rem h-3rem flex align-items-center justify-content-center">
                        <IconWallet size={18} />
                      </span>
                      <span className="ml-2 text-xl p-2">
                        {selectedAccount.label} Switch to{" "}
                        {selectedAccount.balance - formData.amount}
                      </span>
                    </>
                  }
                />
                <Chip
                  className="pl-0 pr-3 mx-4"
                  template={
                    <>
                      <span className="bg-green-600 text-white border-round-xl border-round-right w-3rem h-3rem flex align-items-center justify-content-center">
                        <IconWallet size={18} />
                      </span>
                      <span className="ml-2 text-xl p-2">
                        {accountLinked.label} Switch to{" "}
                        {accountLinked.balance + formData.amount}
                      </span>
                    </>
                  }
                />
              </>
            ) : (
              <Skeleton height="3rem" className="w-full md:w-aut"></Skeleton>
            )}
          </div>
          <Divider align="left">
            <div className="inline-flex align-items-center">
              <b>Form</b>
            </div>
          </Divider>
          <div className="gap-3 flex flex-wrap">
            <div className="w-full md:w-auto">
              <label htmlFor="Calendar" className="block mb-2">
                Date
              </label>
              <Calendar
                className="w-full md:w-auto"
                id="Calendar"
                value={date}
                onChange={(e) => setDate(e.value)}
                showTime
                hourFormat="24"
              />
            </div>
            <div className="w-full md:w-auto">
              <label htmlFor="label" className="block mb-2">
                Label (only to recognize)
              </label>
              <InputText
                className="w-full md:w-auto"
                id="label"
                placeholder="Label"
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    label: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="w-full md:w-auto">
              <label htmlFor="DropDown" className="block mb-2">
                Source account
              </label>
              <Dropdown
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.value)}
                options={accountsData}
                optionLabel="label"
                placeholder="Account"
                className="w-full md:w-auto"
              />
            </div>
            <div className="align-self-center">
              <Divider layout="vertical" className="hidden md:flex">
                <b>TO</b>
              </Divider>
            </div>
            <div className="w-full md:w-auto">
              <label htmlFor="DropDown" className="block mb-2">
                Vault
              </label>
              <Dropdown
                value={selectedVault}
                onChange={selectVault}
                options={vaultsData}
                optionLabel="label"
                placeholder="Vault"
                className="w-full md:w-auto"
              />
            </div>

            <div className="w-full h-full md:w-auto">
              <label htmlFor="" className="block mb-2">
                Linked Account
              </label>

              {accountLinked ? (
                <Chip
                  className="pl-0 h-3rem pr-3 vertical-align-middle"
                  template={
                    <>
                      <span className="ml-3 p-2">
                        <span>{accountLinked.label}</span>
                      </span>
                    </>
                  }
                />
              ) : (
                <Skeleton height="3rem" className="w-full md:w-auto"></Skeleton>
              )}
            </div>

            <div className="w-full md:w-auto">
              <label htmlFor="amount" className="block mb-2">
                Amount
              </label>
              <InputNumber
                className="w-full md:w-auto"
                id="amount"
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    amount: e.value,
                  }));
                }}
                mode="currency"
                currency="EUR"
                locale="fr-Fr"
              />
            </div>
            <Button
              className="w-full align-self-end md:w-auto"
              label="Submit"
              onClick={postData}
            ></Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default TransactionsVault;
