import {Col,Image,Navbar,Nav,Container ,Button} from 'react-bootstrap'
import logo from "../assets/logo.png"
import CreateTaskModal from './CreateTaskModal'

const NavBar = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Col xs={1} md={1}>
        <Image src={logo} rounded style={{ width: '60px' }} />
        </Col>
        <Container>
          <Navbar.Brand href="#home">Menu</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <CreateTaskModal/>
        </Container>
      </Navbar>
  )
}

export default NavBar