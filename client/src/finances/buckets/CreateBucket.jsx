import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Divider } from "primereact/divider";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";

const createBucket = () => {
  const urlAPI = `${import.meta.env.VITE_BACKEND_ADRESS}:${import.meta.env.VITE_BACKEND_PORT}/buckets/create`;
  const navigate = useNavigate();

  const [date, setDate] = useState(new Date());
  const [formData, setFormData] = useState({});

  const [timelimited, setTimeLimited] = useState(false);
  const [targeted, setTargeted] = useState(false);

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
          timelimited,
          date,
          targeted,
          target: formData.target,
        }),
      });
    } catch (err) {
      console.error("Une erreur s'est produite : ", err);
    }
  };

  useEffect(() => {}, []);
  return (
    <>
      <div className="flex justify-content-center">
        <Card
          className="card w-auto"
          title="Create a bucket"
          subTitle="Organize your money"
        >
          <Divider align="center">
            <div className="inline-flex align-items-center">
              <b>Options</b>
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
                Targeted
              </label>
            </div>

            <div className="flex align-items-center">
              <Checkbox
                inputId="timelimited"
                onChange={(e) => setTimeLimited(e.checked)}
                checked={timelimited}
              ></Checkbox>
              <label htmlFor="timelimited" className="ml-2">
                Time Limited
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
                Label of your bucket
              </label>

              <InputText
                placeholder="Label"
                className="w-full md:w-auto"
                id="label"
                onChange={handleChange}
              />
            </div>

            <div className="w-full md:w-auto">
              <label htmlFor="target" className="block mb-2">
                Target to reach every month
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
                disabled={!targeted}
              />
            </div>

            <div className="w-full md:w-auto">
              <label htmlFor="Calendar" className="block mb-2">
                Date limit
              </label>
              <Calendar
                className="w-full md:w-auto"
                id="Calendar"
                value={date}
                onChange={(e) => setDate(e.value)}
                hourFormat="24"
                disabled={!timelimited}
              />
            </div>

            {/** <div className="w-full md:w-auto">
              <label htmlFor="balance" className="block mb-2">
                Initial balance of your account
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
            </div> */}
          </div>

          <div className="flex mt-4 justify-content-end">
            <Button
              className="w-full md:w-auto"
              label="Submit"
              onClick={postForm}
            ></Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default createBucket;
