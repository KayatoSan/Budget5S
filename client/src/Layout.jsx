import { Outlet, Link, useNavigate } from "react-router-dom";
import { MegaMenu } from "primereact/megamenu";
import logo from "./assets/logo.svg";

const Layout = () => {
  const navigate = useNavigate();
  const dark = window.matchMedia("(prefers-color-scheme: dark)");

  const items = [
    {
      label: "Accounts",
      items: [
        [
          {
            label: "Management",
            items: [
              {
                label: "Listing / Edit",
                command: () => {
                  navigate("/accounts/all");
                },
              },
              {
                label: "Add a account",
                command: () => {
                  navigate("/accounts/add");
                },
              },
              {
                label: "Transactions listing",
                command: () => {
                  navigate("/transactions/list");
                },
              },
            ],
          },
          {
            label: "Useful",
            items: [
              {
                label: "Make a transaction",
                command: () => {
                  navigate("/transactions/add");
                },
              },
            ],
          },
        ],
      ],
    },
    {
      label: "Buckets",
      items: [
        [
          {
            label: "Management",
            items: [
              {
                label: "Listing / Edit",
                command: () => {
                  navigate("/buckets/list");
                },
              },
              {
                label: "Create a bucket",
                command: () => {
                  navigate("/bucket/create");
                },
              },
            ],
          },
        ],
      ],
    },
    {
      label: "Vaults",
      items: [
        [
          {
            label: "Management",
            items: [
              {
                label: "Listing / Edit",
                command: () => {
                  navigate("/vaults/list");
                },
              },
              {
                label: "Create a vault",
                command: () => {
                  navigate("/vault/create");
                },
              },
              {
                label: "Transactions vaults",
                command: () => {
                  navigate("/transactions/vault");
                },
              },
              {
                label: "Transactions listing ",
                command: () => {
                  navigate("/transactions/vault/list");
                },
              },
            ],
          },
        ],
      ],
    },
    {
      label: "Add an expense",
      icon: "pi pi-calculator",
      command: () => {
        navigate("/expense/add");
      },
    },
    {
      label: "Expenses",
      items: [
        [
          {
            label: "Management",
            items: [
              {
                label: "Listing / Edit",
                command: () => {
                  navigate("/expenses/list");
                },
              },
            ],
          },
        ],
      ],
    },
    {
      label: "Help ?",
      icon: "pi pi-question-circle",
      command: () => {
        navigate("/help");
      },
    },
  ];

  return (
    <>
      <nav className="navbar flex justify-content-center align-content-center flex-wrap w-full">
        <div className="flex px-4 w-9 align-content-center flex-wrap">
          <Link to="/">
            <div className="flex my-3 mr-4 w-18rem align-items-center justify-content-center">
              <img src={logo} alt="Logo" />
            </div>
          </Link>
          <div className="flex align-items-center justify-content-center">
            {" "}
            <MegaMenu className="text-xl font-medium" model={items} />
          </div>
        </div>
      </nav>
      <div className="nav-clear"></div>
      <Outlet />
    </>
  );
};

export default Layout;

{
  /** <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <Link to="/accounts/all">Accounts</Link>
          </li>
          <li>
            <Link to="/accounts/add">Add Account</Link>
          </li>
          <li>
            <Link to="/expense/add">Add Expense</Link>
          </li>
          <li>
            <Link to="/transactions/add">Add Transactions</Link>
          </li>
          <li>
            <Link to="/vault/create">Create Vault</Link>
          </li>
          <li>
            <Link to="/bucket/create">Create Bucket</Link>
          </li>
          <li>
            <Link to="/transactions/vault/">Transaction Vault</Link>
          </li>
  </ul> */
}
