import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Divider } from "primereact/divider";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";

import { useTranslation } from 'react-i18next';

const editBucket = () => {
  const {t, i18n} = useTranslation()

  let { id } = useParams();
  
  const urlAPI = `${import.meta.env.VITE_BACKEND_ADRESS}:${import.meta.env.VITE_BACKEND_PORT}/edit/bucket/${id}`;
  const navigate = useNavigate();

  const [date, setDate] = useState(false);
  const [data, setData] = useState(false);

  const [timelimited, setTimeLimited] = useState();
  const [targeted, setTargeted] = useState();

  const fetchData = async () => {
    try {
      const fetchGet = await fetch(urlAPI),
        fetchResponse = await fetchGet.json();
      return fetchResponse.data;
    } catch (error) {
      console.error("An error occurred while executing fetchData() : ", error);
    }
  };

  const handleChange = (e) => {
    fetchData().then((data) => {
      setData(data);
    });
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
          data,
          targeted,
          timelimited,
          date,
        }),
      });
    } catch (err) {
      console.error("An error occurred : ", err);
    }
  };

  useEffect(() => {
    fetchData().then((data) => {
      setData(data);
      const fetchedDate = new Date(data.dateLimit);
      setDate(fetchedDate);
      setTargeted(data.target);
      setTimeLimited(data.timeLimited);
    });
  }, []);
  return (
    <>
      <div className="flex justify-content-center">
        <Card
          className="card w-auto"
          title={t('Edit bucket title')}
          subTitle={t('Edit bucket subtitle')}
        >
          <Divider align="center">
            <div className="inline-flex align-items-center">
              <b>{t('Options')}</b>
            </div>
          </Divider>
          <div className="w-full my-4 md:w-auto flex flex-wrap  gap-3">
            <div className="flex align-items-center">
              <Checkbox
                inputId="targeted"
                onChange={(e) => setTargeted(e.checked)}
                checked={targeted}
              ></Checkbox>
              <label htmlFor="targeted" className="ml-2">
              {t('Targeted')}
              </label>
            </div>

            <div className="flex align-items-center">
              <Checkbox
                inputId="timelimited"
                onChange={(e) => setTimeLimited(e.checked)}
                checked={timelimited}
              ></Checkbox>
              <label htmlFor="timelimited" className="ml-2">
              {t('Time limited')}
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
                value={data && data.label}
                onChange={(e) => setData({ ...data, label: e.target.value })}
              />
            </div>

            <div className="w-full md:w-auto">
              <label htmlFor="target" className="block mb-2">
              {t('Target to reach every month')}
              </label>

              <InputNumber
                className="w-full md:w-auto"
                id="target"
                value={data && data.defaultTarget}
                onChange={(e) =>
                  setData({ ...data, defaultTarget: e.target.value })
                }
                mode="currency"
                currency="EUR"
                locale="fr-Fr"
                disabled={!targeted}
              />
            </div>

            <div className="w-full md:w-auto">
              <label htmlFor="Calendar" className="block mb-2">
              {t('Date limit')}
              </label>
              <Calendar
                className="w-full md:w-auto"
                id="DateLimit"
                value={date}
                onChange={(e) =>
                  setDate(e.target.value)
                }
                hourFormat="24"
                disabled={!timelimited}
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

export default editBucket;