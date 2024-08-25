import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Divider } from "primereact/divider";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";

import { useTranslation } from 'react-i18next';

const createVault = () => {
  const urlAPI = `${import.meta.env.VITE_BACKEND_ADRESS}:${import.meta.env.VITE_BACKEND_PORT}/vaults/create`;
  const navigate = useNavigate();

  const {t, i18n} = useTranslation()

  const [date, setDate] = useState(new Date());
  const [formData, setFormData] = useState({});

  const [accountsData, setAccountsData] = useState({});
  const [selectedAccount, setSelectedAccount] = useState(null);

  const [dateDue, setDateDue] = useState(false);
  const [targeted, setTargeted] = useState(false);
  const [monthly, setMonthly] = useState(true);

  const fetchData = async () => {
    try {
      const fetchGet = await fetch(urlAPI),
        fetchResponse = await fetchGet.json();
      return fetchResponse;
    } catch (error) {
      console.error("An error occurred while executing fetchData() : ", error);
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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const postForm = async (e) => {
    e.preventDefault();
    try {
      navigate("/");
      await fetch(urlAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          label: formData.label,
          balance: formData.balance,
          dateDue: date,
          target: formData.target,
          monthlyType: monthly,
          accountLinked: selectedAccount._id,
        }),
      });
    } catch (err) {
      console.error("An error occurred : ", err);
    }
  };

  useEffect(() => {
    fetchData().then((data) => {
      addBalanceToAccount(data);
    });
  }, []);
  return (
    <>
      <div className="flex justify-content-center">
        <Card
          className="card w-auto"
          title={t('Create vault title')}
          subTitle={t('Create vault subtitle')}
        >
          <Divider align="center">
            <div className="inline-flex align-items-center">
              <b>{t('Options')}</b>
            </div>
          </Divider>

          <div className="w-full my-4 md:w-auto align-items-center justify-content-center flex flex-wrap  gap-3">
            <div className="flex align-items-center">
              <Checkbox
                inputId="monthly"
                onChange={(e) => {
                  setMonthly(e.checked);
                  setDateDue(!e.checked);
                }}
                checked={monthly}
                tooltip={t('Monthly tooltip')}
              ></Checkbox>
              <label htmlFor="monthly" className="ml-2">
              {t('Monthly')}
              </label>
            </div>
            <Divider layout="vertical" className="hidden md:flex">
              <b>{t('OR')}</b>
            </Divider>
            <div className="flex align-items-center">
              <Checkbox
                inputId="dateDue"
                onChange={(e) => {
                  setMonthly(!e.checked);
                  setDateDue(e.checked);
                }}
                checked={dateDue}
                tooltip={t('DateDue tooltip')}
              ></Checkbox>
              <label htmlFor="dateDue" className="ml-2">
              {t('Date due')}
              </label>
            </div>
          </div>

          <Divider align="center">
            <div className="inline-flex align-items-center">
              <b>Form</b>
            </div>
          </Divider>

          <div className="gap-3 flex align-items-end flex-wrap ">
            <div className="w-full md:w-auto">
              <label htmlFor="label" className="block mb-2 w-full md:w-auto">
              {t('Label of your vault')}
              </label>

              <InputText
                placeholder={t('Label')}
                className="w-full md:w-auto"
                id="label"
                onChange={handleChange}
              />
            </div>

            <div className="w-full md:w-auto">
              <label htmlFor="DropDown" className="block mb-2">
              {t('Source account')}
              </label>
              <Dropdown
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.value)}
                options={accountsData}
                optionLabel="label"
                placeholder={t('Account')}
                className="w-full md:w-auto"
              />
            </div>

            <div className="w-full md:w-auto">
              <label htmlFor="target" className="block mb-2">
                {monthly ? (
                  <p>{t('Target to reach every month')}</p>
                ) : (
                  <p>{t('Target global')}</p>
                )}
              </label>

              <InputNumber
                className="w-full md:w-auto"
                id="target"
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    target: e.value,
                  }));
                }}
                mode="currency"
                currency="EUR"
                locale="fr-Fr"
              />
            </div>

            <div className="w-full md:w-auto">
              <label htmlFor="Calendar" className="block mb-2">
              {t('Date due')}
              </label>
              <Calendar
                className="w-full md:w-auto"
                id="Calendar"
                value={date}
                onChange={(e) => setDate(e.value)}
                hourFormat="24"
                disabled={!dateDue}
              />
            </div>
          </div>

          <div className="flex mt-4 justify-content-end">
            <Button
              className="w-full md:w-auto"
              label={t('Submit')}
              onClick={postForm}
            ></Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default createVault;
