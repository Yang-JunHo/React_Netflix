import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Container, Row, Col, Accordion, Dropdown, Card, Button, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../App.css';

const Movies = () => {

    const { popularMovies } = useSelector(state => state.movie)
    const selectedmovie = useSelector(state => state.movie.keyword)
    const [filter, setFilter] = useState([])

    // 장르를 표기해야하기 때문에 redux에 있는 장르 불러오기
    const { genreList } = useSelector(state => state.movie)


    /* 정렬 함수
        자바스크립트 sort함수
        - 기본적으로 유니코드를 기반으로 정렬기준을 판단
        - compare함수를 직접 구현하여 정렬
        
        배열명.sort((a,b) => {
            return a-b; -> 오름차순
            return b-a; -> 내림차순
        });

        [문자열비교]
        대상.localeCompare(비교할 문자열)

        반환값 < 0 : a가 b보다 앞으로 이동
        반환값 == 0 : 순서변동 X
        반환값 > 0 : b가 a보다 앞으로 이동
    */

    const movieSorted = (category, sortMethod) => {

        // 1. 정렬 카테고리 분류
        // 2. 정렬 방식 분류
        // onClick 함수사용해야함 onClick()=>{movieSorted('평점', 'ASC')}

        let sortedMovies = [...filter]; // 기존의 영화 목록 복사

        if (category === '평점') {
            sortMethod === 'ASC'
                ? filter.sort((a, b) => a.vote_average - b.vote_average)
                : filter.sort((a, b) => b.vote_average - a.vote_average)
        } else if (category === '제목') {
            sortMethod === 'ASC'
                ? filter.sort((a, b) => a.title.localeCompare(b.title))
                : filter.sort((a, b) => b.title.localeCompare(a.title))
        } else if (category === '인기도') {
            sortMethod === 'ASC'
                ? filter.sort((a, b) => a.popularity - b.popularity)
                : filter.sort((a, b) => b.popularity - a.popularity)
        }

        setFilter(sortedMovies); // 정렬된 영화 목록으로 상태 업데이트
    }

    const handleSort = (type) => {
        let sortedMovies = [...filter]; // 기존의 영화 목록 복사

        if (type === 'titleAsc') {
            sortedMovies.sort((a, b) => a.title.localeCompare(b.title)); // 제목 오름차순
        } else if (type === 'titleDesc') {
            sortedMovies.sort((a, b) => b.title.localeCompare(a.title)); // 제목 내림차순
        } else if (type === 'voteAverageAsc') {
            sortedMovies.sort((a, b) => a.vote_average - b.vote_average); // 평점 오름차순 (숫자 비교)
        } else if (type === 'voteAverageDesc') {
            sortedMovies.sort((a, b) => b.vote_average - a.vote_average); // 평점 내림차순 (숫자 비교)
        } else if (type === 'popularityAsc') {
            sortedMovies.sort((a, b) => a.popularity - b.popularity); // 인기도 오름차순 (숫자 비교)
        } else if (type === 'popularityDesc') {
            sortedMovies.sort((a, b) => b.popularity - a.popularity); // 인기도 내림차순 (숫자 비교)
        }

        setFilter(sortedMovies); // 정렬된 영화 목록으로 상태 업데이트
    };

    useEffect(() => {
        // console.log('popularMovies', popularMovies);

        if (popularMovies.length !== 0) {
            setFilter(popularMovies)
        }
    }, [])

    return (
        <div>
            {popularMovies.length > 0 && (
                <>
                    <Container>
                        <Row>
                            <Col>
                                < h1>인기영화 필터링</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={3}>
                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>정렬</Accordion.Header>
                                        <Accordion.Body>
                                            <Dropdown>

                                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                                    정렬 방식을 선택해주세요.
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => handleSort('titleAsc')}>제목 오름차순</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handleSort('titleDesc')}>제목 내림차순</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handleSort('voteAverageAsc')}>평점 오름차순</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handleSort('voteAverageDesc')}>평점 내림차순</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handleSort('popularityAsc')}>인기도 오름차순</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handleSort('popularityDesc')}>인기도 내림차순</Dropdown.Item>
                                                </Dropdown.Menu>

                                            </Dropdown>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Col>
                            <Col sm={9} className='movie-card-list'>
                                {filter.filter(item => item.title.includes(selectedmovie)).map(item => (
                                    <>
                                        <Card style={{ width: '13rem' }} key={item.id}>
                                            <div className='popular-movie-card'>
                                                <Card.Img variant="top" src={`https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}`} />
                                                <Link to={`/movie/${item.id}`}>
                                                    <div className='popular-overlay'>
                                                        <h1>{item.title}</h1>
                                                        <div className='popular-genres'>
                                                            {item.genre_ids.map(id => (
                                                                <Badge bg="danger" key={id}>{genreList.find(item => item.id === id).name}</Badge>
                                                            ))}
                                                        </div>
                                                        <div className='info'>
                                                            <span>평점 : {Math.round(item.vote_average * 10) / 10}점</span>
                                                            <span>|</span>
                                                            <span>{item.adult ? '청소년 관람불가' : '청소년 관람가능'}</span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                            <Card.Body>
                                                <Card.Title>{item.title}</Card.Title>
                                                <Card.Text>
                                                    개봉일 : {item.release_date}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </>
                                ))}
                            </Col>
                        </Row>
                    </Container>
                </>
            )}
        </div>
    )
}

export default Movies