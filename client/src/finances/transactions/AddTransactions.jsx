import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Dropdown } from "primereact/dropdown";
import { SelectButton } from "primereact/selectbutton";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";
import { Divider } from "primereact/divider";
import { Calendar } from "primereact/calendar";
import { Chip } from "primereact/chip";
import { Message } from "primereact/message";

import { IconWallet } from "@tabler/icons-react";

const Transactions = () => {
  const urlAPI = `${import.meta.env.VITE_BACKEND_ADRESS}:${import.meta.env.VITE_BACKEND_PORT}/transactions/add`;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const [accountsData, setAccountsData] = useState({});
  const [selectedAccount, setSelectedAccount] = useState(null);

  const [date, setDate] = useState(new Date());

  const options = ["+ Income", "- Withdrawal"];
  const [valueOptions, setValueOptions] = useState(options[0]);

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
    navigate("/");
    const increment = valueOptions === "+ Income";
    try {
      await fetch(urlAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          account: selectedAccount._id,
          label: formData.label,
          amount: formData.amount,
          date,
          options: increment,
          oldBalance: selectedAccount.balance,
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
      labelBalance: `${item.label} | ${item.balance} €`,
      label: item.label,
      balance: item.balance,
    }));
    setAccountsData(transformedData);
  };

  useEffect(() => {
    fetchData().then((data) => {
      addBalanceToAccount(data);
    });
  }, []);

  return (
    <>
      <div className="justify-content-center md:flex">
        {/* TODO Revoir le responsive design sur toutes les cards (bug mobile) */}
        <Card
          className="card w-auto max-w-max"
          title="Transaction"
          subTitle="Add or remove money from one of your accounts"
        >
          <Divider align="left">
            <div className="inline-flex align-items-center">
              <b>Resume</b>
            </div>
          </Divider>

          <div className="flex-wrap w-full">
            {selectedAccount && formData.amount ? (
              <Chip
                className="pl-0 pr-3"
                template={
                  <>
                    <span className="bg-primary border-round-xl border-round-right w-3rem h-3rem flex align-items-center justify-content-center">
                      <IconWallet size={18} />
                    </span>
                    <span className="ml-2 md:text-xl p-2">
                      {selectedAccount.label} : the old balance of&nbsp;
                      {selectedAccount.balance} € switch to&nbsp;
                      {valueOptions === "+ Income"
                        ? selectedAccount.balance + formData.amount
                        : selectedAccount.balance - formData.amount}
                      €
                    </span>
                  </>
                }
              />
            ) : (
              <Skeleton height="3rem" className="w-full md:w-aut"></Skeleton>
            )}
          </div>

          <Divider align="left">
            <div className="inline-flex align-items-center">
              <b>Form</b>
            </div>
          </Divider>

          <div className="gap-3 flex align-items-end flex-wrap">
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
                placeholder="Label"
                id="label"
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
                Account
              </label>
              <Dropdown
                className="w-full md:w-auto"
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.value)}
                options={accountsData}
                optionLabel="labelBalance"
                placeholder="Account"
              />
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

            <div className="">
              <SelectButton
                value={valueOptions}
                onChange={(e) => setValueOptions(e.value)}
                options={options}
              />
            </div>

            <Button
              className="w-full md:w-auto"
              label="Submit"
              onClick={postData}
            ></Button>
          </div>
          {valueOptions === "- Withdrawal" ? (
            <Message
              className="mt-4"
              severity="warn"
              text="If you want to add an expense, you should go to Add Expense section !"
            />
          ) : null}
        </Card>
      </div>
    </>
  );
};

export default Transactions;
