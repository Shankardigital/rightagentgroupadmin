import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { withRouter, useHistory } from "react-router-dom";
import { isEmpty } from "lodash";

import {
  Button,
  Card,
  CardBody,
} from "reactstrap";
import { getOrders as onGetOrders } from "store/actions";

// import EcommerceOrdersModal from "../Ecommerce/EcommerceOrders/EcommerceOrdersModal";

import {
  OrderId,
  BillingName,
  Date,
  Total,
  PaymentStatus,
  PaymentMethod,
} from "./LatestTranactionCol";

import TableContainer from "../../components/Common/TableContainer";

//redux
import { useSelector, useDispatch } from "react-redux";
import { addData } from "Servicescalls"

const LatestTranaction = props => {
  const history = useHistory()
  const dispatch = useDispatch();

  const { orders } = useSelector(state => ({
    orders: state.ecommerce.orders,
  }));

  useEffect(() => {
    dispatch(onGetOrders());
  }, [dispatch]);

  const [modal1, setModal1] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const toggleViewModal = () => setModal1(!modal1);

  const [customers, setcustomers] = useState([])

  const getAlldata = async () => {
    const resonse = await addData("admin/dashboard")
    var _data = resonse
    setcustomers(_data.data.latestCustomers)
  }

  useEffect(() => {
    getAlldata()
  }, [])

  const getByfunction = (data) => {
    sessionStorage.setItem("customerid", data._id)
    console.log(data._id)
    // history.push("/customer_details")
  }



  const columns = useMemo(
    () => [
      {
        Header: "#",
        filterable: true,
        disableFilters: true,
        Cell: cellProps => {
          return <input type="checkbox" />;
        },
      },
      {
        Header: "Customer ID",
        accessor: "customerId",
        filterable: true,
        disableFilters: true,
        selector: (row) => row.customerId,
      },
      {
        Header: " Name",
        accessor: "name",
        disableFilters: true,
        filterable: true,
        selector: (row) => row.name,
      },
      {
        Header: "Email",
        accessor: "email",
        disableFilters: true,
        selector: (row) => row.email,
      },
      {
        Header: "Phone",
        accessor: "phone",
        disableFilters: true,
        selector: (row) => row.phone,
      },
      {
        Header: "Date",
        accessor: "date",
        disableFilters: true,
        filterable: true,
        selector: (row) => row.date,
      },
      {
        Header: "Payment Status",
        accessor: "paymentStatus",
        disableFilters: true,
        filterable: true,
        selector: (row) => row.paymentStatus,
      },
      {
        Header: "Action",
        disableFilters: true,
        accessor: "action",
        
        Cell: cellProps => {
          return (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={()=>{getByfunction(cellProps)}}
            >
              View Details
            </Button>
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    if (customers && !customers.length) {
      onGetOrders();
    }
  }, [onGetOrders, customers]);

  useEffect(() => {
    setOrderList(customers);
  }, [customers]);

  useEffect(() => {
    if (!isEmpty(customers) && !!isEdit) {
      setOrderList(customers);
      setIsEdit(false);
    }
  }, [customers]);



  return (
    <React.Fragment>
      {/* <EcommerceOrdersModal isOpen={modal1} toggle={toggleViewModal} /> */}
      <Card>
        <CardBody>
          <div className="mb-4 h4 card-title">Latest Transaction</div>
          <TableContainer
            columns={columns}
            data={customers}
            isGlobalFilter={true}
            isAddOptions={false}
            customPageSize={6}
              />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

LatestTranaction.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
};

export default withRouter(LatestTranaction);
