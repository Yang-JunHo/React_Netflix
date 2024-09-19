import React, { useRef } from 'react'
import { Navbar, Nav, Form, Button, Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { movieActions } from '../redux/reducers/movieSlice'

const Header = () => {

  const searchWriter = useRef()
  const dispatch = useDispatch()

  const handleSearch = () => {
    dispatch(movieActions.searchKeyword(searchWriter.current.value))
  }

  const onCheckEnter = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
        <Container fluid>

          <Navbar.Brand href="/">
            <img src='https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png' width={100} />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">

            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              {/* Nav.Link는 안에 a태그가 포함
                -> a태그는 새로운 페이지로 '이동' -> 다른페이지
                근데 React는 Single Page Application
                그래서 Nav.Link나 a태그 대신 Link태그 사용 */}
              <Link to="/" className='nav-link'>Home</Link>
              <Link to="/movies" className='nav-link'>Movies</Link>
            </Nav>

            <Form onSubmit={(e) => { e.preventDefault() }} className="d-flex">
              <Form.Control
                type="text"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                ref={searchWriter}
                onKeyDown={onCheckEnter}
              />
              <Button type="submit" variant="outline-danger">Search</Button>
            </Form>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header