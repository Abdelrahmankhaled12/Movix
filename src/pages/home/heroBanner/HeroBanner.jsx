import './style.scss'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import Img from '../../../components/lazyLoadImage/Img'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'

const HeroBanner = () => {

    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { data, loading } = useFetch("/movie/upcoming")

    useEffect(() => {
        const bg ="https://image.tmdb.org/t/p/original/" + data?.results[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg);
    }, [data])

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`)
        }
    }

    const searchButton = (value) => {
        if (value.length > 0) {
            navigate(`/search/${query}`)
        }
    }

    return (
        <div className="heroBanner">
            {!loading && <div className="backdrop_img">
                <Img src={background} />
            </div>}
            <div className="opacity-layer"></div>
            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">welcome.</span>
                    <span className="subtitle">
                        Millions of movies, TV shows and People to discover.
                        Explore Now.
                    </span>
                    <div className="searchInput">
                        <input type="text" placeholder='Seacrh for a movieor tv show...' onKeyUp={searchQueryHandler} onChange={(e) => setQuery(e.target.value)} />
                        <button onClick={()=>searchButton(query)}>Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    )
}

export default HeroBanner