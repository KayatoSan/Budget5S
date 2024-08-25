import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";

import { useTranslation } from 'react-i18next';

const editVault = () => {
  let { id } = useParams();
  
  const urlAPI = `${import.meta.env.VITE_BACKEND_ADRESS}:${import.meta.env.VITE_BACKEND_PORT}/edit/vault/${id}`;
  const navigate = useNavigate();

  const {t, i18n} = useTranslation()

  const [formData, setFormData] = useState({});
  const [selectedAccount, setSelectedAccount] = useState();

  const [selectedVault, setSelectedVault] = useState({});
  const [accountLinked, setAccountLinked] = useState(null);
  const [listAccounts, setListAccounts] = useState({});

  const [dateDue, setDateDue] = useState();
  const [targeted, setTargeted] = useState();
  const [monthly, setMonthly] = useState();
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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const postData = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      await fetch(urlAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            vault: selectedVault._id,
            accountLinked: accountLinked._id,
            label: selectedVault.label,
            target: selectedVault.target,
            monthly,
            date,
          },
        }),
      });
    } catch (err) {
      console.error("An error occurred : ", err);
    }
  };

  const addBalanceToAccount = (data) => {
    data = { ...data, label: `${data.label} | ${data.balance} €` };
    setAccountLinked(data);
  };

  const addBalanceToListAccounts = (data) => {
    const transformedData = data.map((item) => ({
      _id: item._id,
      type: "ACCOUNTS",
      label: `${item.label} | ${item.balance} €`,
      balance: item.balance,
    }));
    setListAccounts(transformedData);
  };

  useEffect(() => {
    fetchData().then((data) => {
      setMonthly(data.dataVaults.monthlyType);
      setDateDue(!data.dataVaults.monthlyType);
      setSelectedVault(data.dataVaults);
      addBalanceToAccount(data.dataAccounts);
      addBalanceToListAccounts(data.listAccounts);
      const fetchedDate = new Date(data.dataVaults.dateDue);
      setDate(fetchedDate);
    });
  }, []);

  return (
    <>
      <div className="flex justify-content-center">
        <Card
          className="card w-auto"
          title={t('Edit vault title')}
          subTitle={t('Edit vault subtitle')}
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
                tooltip={t('Save an amount every month')}
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
                tooltip={t('Set an date due for your goal !')}
              ></Checkbox>
              <label htmlFor="dateDue" className="ml-2">
              {t('Date due')}
              </label>
            </div>
          </div>

          <Divider align="center">
            <div className="inline-flex align-items-center">
              <b>{t('Form')}</b>
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
                value={selectedVault.label ?? ""}
                onChange={(e) => {
                  setSelectedVault((prevData) => ({
                    ...prevData,
                    label: e.target.value,
                  }));
                }}
              />
            </div>

            <div className="w-full md:w-auto">
              <label htmlFor="DropDown" className="block mb-2">
              {t('New source account')}
              </label>
              <Dropdown
                value={accountLinked}
                onChange={(e) => setAccountLinked(e.value)}
                options={listAccounts}
                optionLabel="label"
                placeholder={accountLinked && accountLinked.label}
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
                value={selectedVault && selectedVault.target}
                className="w-full md:w-auto"
                id="target"
                onChange={(e) => {
                  setSelectedVault((prevData) => ({
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
                showTime
                hourFormat="24"
                disabled={!dateDue}
              />
            </div>
          </div>

          <div className="flex mt-4 justify-content-end">
            <Button
              className="w-full md:w-auto"
              label={t('Submit')}
              onClick={postData}
            ></Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default editVault;
