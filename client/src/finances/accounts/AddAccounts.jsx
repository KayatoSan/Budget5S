import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Divider } from "primereact/divider";
import { Checkbox } from "primereact/checkbox";

import { useTranslation } from 'react-i18next';

const AddAccounts = () => {
  const {t, i18n} = useTranslation()

  const navigate = useNavigate();
  const urlAPI = `${import.meta.env.VITE_BACKEND_ADRESS}:${
    import.meta.env.VITE_BACKEND_PORT
  }/accounts/add`;
  const [assignable, setAssignable] = useState(false);
  const [formData, setFormData] = useState({});
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
      await fetch(urlAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: formData, assignable }),
      });
      navigate("/");
    } catch (err) {
      console.error("An error occurred : ", err);
    }
  };

  useEffect(() => {}, []);
  return (
    <>
      <div className="flex justify-content-center">
        <Card
          className="card w-auto"
          title={t('Add an account')}
          subTitle={t('Add Account Subtitle')}
        >
          <Divider align="center">
            <div className="inline-flex align-items-center">
              <b>{t('Options')}</b>
            </div>
          </Divider>
          <div className="flex align-items-center">
            <Checkbox
              inputId="assignable"
              onChange={(e) => setAssignable(e.checked)}
              checked={assignable}
            ></Checkbox>
            <label htmlFor="assignable" className="ml-2">
            {t('Assignable')}
            </label>
          </div>
          <Divider align="center">
            <div className="inline-flex align-items-center">
              <b>{t('Form')}</b>
            </div>
          </Divider>

          <div className="gap-3 flex align-items-end flex-wrap ">
            <div className="w-full md:w-auto">
              <label htmlFor="label" className="block mb-2 w-full md:w-auto">
              {t('Label of your account')}
              </label>

              <InputText
                placeholder={t('Label')}
                className="w-full md:w-auto"
                id="label"
                onChange={handleChange}
              />
            </div>

            <div className="w-full md:w-auto">
              <label htmlFor="balance" className="block mb-2">
              {t('Initial balance of your account')}
              </label>

              <InputNumber
                className="w-full md:w-auto"
                id="balance"
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    balance: e.value,
                  }));
                }}
                mode="currency"
                currency="EUR"
                locale="fr-Fr"
              />
            </div>

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

export default AddAccounts;
