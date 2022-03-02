import React from 'react';
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';

export default class SiteNav extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      dropDownOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
      dropDownOpen: !this.state.dropDownOpen,
    });
  }

  render() {
    return (
      <Navbar light expand='md' className={`${this.props.className} site-nav`}>
        <Container>
          <NavbarBrand href='/'>
            <img
              src='../../static/asl_logo_black.png'
              className='nav-logo img-fluid'></img>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto site-navbar' navbar>
              <NavItem>
                <NavLink href='/people'>Lab Members</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/projects'>Projects</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/blog'>Blog</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/newsletters'>Newsletters</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/about'>About</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/contact'>Contact Us</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}
