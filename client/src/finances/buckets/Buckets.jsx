import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProgressBar } from "primereact/progressbar";
import { Tag } from "primereact/tag";
import { InputNumber } from "primereact/inputnumber";
import { Message } from "primereact/message";

const Buckets = (props) => {
  const available = (rowData) => {
    const calculate =
      rowData.monthly.assigned +
      rowData.prevAssigned +
      (-rowData.expense + -rowData.prevExpense);
    if (calculate < 0) {
      return <Message severity="warn" text={`${calculate}`} />;
    }
    return <Message severity="success" text={`${calculate}`} />;
  };

  const assigned = (rowData) => {
    const target = rowData.monthly.target;
    const assigned = rowData.monthly.assigned;
    const needed = target - assigned;
    if (rowData.target === false) {
      return assigned;
    } else if (assigned < target) {
      return (
        <>
          <Tag
            severity="danger"
            className="text-base font-light align-content-center"
            value={`${needed}€ more is needed for reach target`}
          ></Tag>
        </>
      );
    } else if (assigned >= target) {
      return assigned;
    }
  };
  const target = (rowData) => {
    const target = rowData.targeted;
    if (target === true) {
      return rowData.monthly.target;
    }
    return (
      <>
        <Tag
          severity="success"
          className="text-base font-light align-content-center"
          value={`target isn't required`}
        ></Tag>
      </>
    );
  };

  const progressBar = (rowData) => {
    const calculate = (rowData.expense / rowData.monthly.assigned) * 100;
    if (rowData.monthly.assigned === 0) {
      return <Message text="You must assign an amount" />;
    } else if (isNaN(calculate)) {
      return <ProgressBar value={0}></ProgressBar>;
    } else if (calculate > 100) {
      return (
        <ProgressBar
          className="p-progressbar-over"
          value={Math.round(calculate)}
        ></ProgressBar>
      );
    } else if (calculate === 100) {
      return (
        <ProgressBar
          className="p-progressbar-perfect"
          value={Math.round(calculate)}
        ></ProgressBar>
      );
    }
    return <ProgressBar value={Math.round(calculate)}></ProgressBar>;
  };

  const cellEditor = (options) => {
    return (
      <InputNumber
        className="max-w-max"
        value={options.value}
        onValueChange={(e) => options.editorCallback(e.value)}
        mode="currency"
        currency="EUR"
        locale="fr-FR"
        onKeyDown={(e) => e.stopPropagation()}
      />
    );
  };

  const onCellEditComplete = (e) => {
    let { rowData, newValue, field, originalEvent: event } = e;
    try {
      const urlAPI = `${import.meta.env.VITE_BACKEND_ADRESS}:${import.meta.env.VITE_BACKEND_PORT}/edit/bucketcell`;
      fetch(urlAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: rowData.monthly._id,
          idBucket: rowData.monthly.bucketRef,
          field: field,
          value: newValue,
        }),
      });
    } catch (err) {
      console.error("Une erreur s'est produite : ", err);
    }
  };

  return (
    <>
      <DataTable
        editMode="cell"
        stripedRows
        value={props.fetch}
        tableStyle={{ minWidth: "50rem" }}
      >
        {/* <Column field="_id" header="UID"></Column> */}
        <Column field="label" style={{ width: "13%" }} header="label"></Column>
        <Column
          style={{ width: "40%" }}
          header="% spended / assigned this month"
          body={progressBar}
        ></Column>
        <Column
          body={target}
          field="monthly.target"
          style={{ width: "18%" }}
          editor={(options) => cellEditor(options)}
          onCellEditComplete={onCellEditComplete}
          header="target"
        ></Column>
        <Column
          body={assigned}
          field="monthly.assigned"
          style={{ width: "19%" }}
          editor={(options) => cellEditor(options)}
          onCellEditComplete={onCellEditComplete}
          header="assigned"
        ></Column>
        <Column
          style={{ width: "11%" }}
          field="expense"
          header="expense"
        ></Column>
        <Column
          style={{ width: "12%" }}
          header="available"
          body={available}
        ></Column>
      </DataTable>
      <div className="flex pt-6 text-lg justify-content-end">
        <span className="font-semibold">{props.totalAssigned} €</span>&nbsp;
        assigned
      </div>
    </>
  );
};

export default Buckets;
