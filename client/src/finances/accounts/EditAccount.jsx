import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Divider } from "primereact/divider";
import { Checkbox } from "primereact/checkbox";

const editAccount = () => {
  let { id } = useParams();
  const urlAPI = `${import.meta.env.VITE_BACKEND_ADRESS}:${
    import.meta.env.VITE_BACKEND_PORT
  }/edit/account/${id}`;
  const navigate = useNavigate();

  const [assignable, setAssignable] = useState();
  const [data, setData] = useState(false);

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
          assignable,
        }),
      });
    } catch (err) {
      console.error("Une erreur s'est produite : ", err);
    }
  };

  useEffect(() => {
    fetchData().then((data) => {
      setData(data);
      setAssignable(data.assignable);
    });
  }, []);
  return (
    <>
      <div className="flex justify-content-center">
        <Card
          className="card w-auto"
          title="Edit your account"
          subTitle="Organize your money"
        >
          <Divider align="center">
            <div className="inline-flex align-items-center">
              <b>Options</b>
            </div>
          </Divider>
          <div className="flex align-items-center">
            <Checkbox
              inputId="assignable"
              onChange={(e) => setAssignable(e.checked)}
              checked={assignable}
            ></Checkbox>
            <label htmlFor="assignable" className="ml-2">
              Assignable
            </label>
          </div>
          <Divider align="center">
            <div className="inline-flex align-items-center">
              <b>Form</b>
            </div>
          </Divider>
          <div className="gap-3 flex align-items-end flex-wrap ">
            <div className="w-full md:w-auto">
              <label htmlFor="label" className="block mb-2 w-full md:w-auto">
                Label of your account
              </label>

              <InputText
                placeholder="Label"
                className="w-full md:w-auto"
                id="label"
                value={data && data.label}
                onChange={(e) => setData({ ...data, label: e.target.value })}
              />
            </div>

            <div className="w-full md:w-auto">
              <label htmlFor="balance" className="block mb-2">
                Balance of your account
              </label>

              <InputNumber
                className="w-full md:w-auto"
                id="balance"
                value={data && data.balance}
                onChange={(e) => setData({ ...data, balance: e.value })}
                mode="currency"
                currency="EUR"
                locale="fr-Fr"
                // disabled={!targeted}
              />
            </div>
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

export default editAccount;
