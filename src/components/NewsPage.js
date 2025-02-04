// NewsPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../Axios.js';
import '../css/styles.css';

function NewsPage() {
    const [news, setNews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await axios.get('http://213.139.210.103:8082/news');
            setNews(response.data);
        } catch (error) {
            console.error('Ошибка при получении новостей:', error);
        }
    };

    return (
        <div class="news-container">
            <div class="button-container">
                <button onClick={() => navigate('/')} class="home-button">Домой</button>
                <button onClick={() => navigate('/search')} class="search-button">Поиск</button>
            </div>
            <h1 class="news-header">Новости</h1>
            {news.length === 0 ? (
                <p class="no-news">Новостей нет :(</p>
            ) : (
                news.map(newsItem => (
                    <div key={newsItem.id} class="news-item">
                        <div onClick={() => navigate(`/${newsItem.user.id}`)} class="name-hyperlink">
                            {newsItem.user.name} {newsItem.user.surname}
                        </div>
                        <div className='news-time'>{newsItem.formattedDate}</div>
                        <p className='news-text'>{newsItem.text}</p>
                    </div>
                ))
            )}
        </div>

    );
}

export default NewsPage;
