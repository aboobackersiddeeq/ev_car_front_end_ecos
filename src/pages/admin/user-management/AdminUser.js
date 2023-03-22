import Table from "react-bootstrap/Table";
import AdminHeader from "../../../components/header/AdminHeader";
import { Form, Button } from "react-bootstrap";
import Footer from "../../../components/footer/Footer";
import { useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore/lite";
import { firebaseContext } from "../../../context/FirebaseContext";

function AdminUser() {
  const [users, setUsers] = useState([]);
  const { db } = useContext(firebaseContext);
  const Collection = collection(db, "user");
  // eslint-disable-next-line
  const userslist = async () => {
    const Snapshot = await getDocs(Collection);
    const List = Snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    setUsers(List);
  };

  useEffect(() => {
    userslist();
  },[userslist]);

  const [searchTerm, setSearchTerm] = useState("");
  const filterData = users.filter((val, i, arr) => {
    if (searchTerm === "" || /^\s*$/.test(searchTerm)) {
      return true;
    } else if (
      val.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return true;
    }   else if (
      val.phone.toString().includes(searchTerm )
    ) {
      return true;
    }  
    return false;
  });
  return (
    <div>
      <div>
        <AdminHeader />
      </div>
      <div className="adminbody contantBody ">
        <div className="container">
          <div className="row ">
            <div className="col-md-6">
              <h2 className="head-contant">User</h2>
            </div>
            <div className="col-md-4">
            <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                />
                <Button variant="outline-dark">Search</Button>
              </Form>
            </div>
          </div>
        </div>
        <div className="container p-5">
        {filterData.length > 0 ? (
          <Table responsive="sm">
            <thead>
              <tr>
                <th>No</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>UserId</th>
                <th>Block/Unblock</th>
              </tr>
            </thead>
            <tbody>
            {filterData &&
                  // eslint-disable-next-line
                  filterData.map((element, index) => {
                    return (
              <tr key={element.phone}>
                <td>{index+1}</td>
                <td>{element.name}</td>
                <td>{element.email}</td>
                <td>{element.phone}</td>
                <td>{element.userid}</td>
                <td>Block</td>
              </tr>
              )})}
            </tbody>
          </Table>
           ) : (
            <p>No results found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminUser;
