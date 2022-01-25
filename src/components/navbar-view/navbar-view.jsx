import React from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Container,
  Button,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";

// export class NavBar extends React.Component {
//   constructor() {
//     super();

//     this.state = {};
//   }

//   onLoggedOut() {
//     localStorage.clear();
//     window.open("/", "_self");
//   }

//   render() {
//     const { user } = this.props;
//     const movies = `/`;
// const profile = `/users/${user}`;

//     if (!user) return null;

//     return (
//       <Navbar bg="dark" collapseOnSelect fixed="top" expand="lg" variant="dark">
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />

//         <Navbar.Collapse id="responsive-navbar-nav">
//           <Nav className="ml-auto">
//             <NavLink to={movies} className="link-text">
//               Movies
//             </NavLink>

//             <NavLink to={profile} className="link-text">
//               Profile
//             </NavLink>

//             <NavLink to="/" onClick={this.onLoggedOut}>
//               Log Out
//             </NavLink>
//           </Nav>
//           <Form>
//             <FormControl type="text" placeholder="Search" />
//           </Form>
//         </Navbar.Collapse>
//       </Navbar>
//     );
//   }
// }

// export default NavBar;

export function NavBar({ user }) {
  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("toke");
    } else {
      return false;
    }
  };

  return (
    <Navbar
      className="main-nav"
      sticky="top"
      bg="dark"
      expand="lg"
      variant="dark"
    >
      <Container>
        <Navbar.Brand className="navbar-logo" href="/">
          MyFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m1-auto">
            {isAuth() && <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>}
            {!isAuth() && (
              <Button
                onClick={() => {
                  localStorage.clear();
                  window.open("/", "self");
                }}
              >
                Logout
              </Button>
            )}
            {!isAuth() && <Nav.Link href="/">Sign-in</Nav.Link>}
            {!isAuth() && <Nav.Link href="/register">Sing-up</Nav.Link>}
          </Nav>
          <Nav.Link href="/profileview">Profile</Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
