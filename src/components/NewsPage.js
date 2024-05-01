// NewsPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function NewsPage() {
    const [news, setNews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await axios.get('http://localhost:8080/news');
            setNews(response.data);
        } catch (error) {
            console.error('Ошибка при получении новостей:', error);
        }
    };

    return (
        <div>
            <button onClick={() => navigate('/')}>Домой</button>
            <button onClick={() => navigate('/search')}>Поиск</button>
            <h1>Новости</h1>
            {news.length === 0 ? (
                <p>Новостей нет :(</p>
            ) : (
                news.map(newsItem => (
                    <div key={newsItem.id}>
                        <p>{newsItem.formattedDate} - {newsItem.text}</p>
                        <p onClick={() => navigate(`/${newsItem.user.id}`)} style={{cursor: 'pointer'}}>
                            {newsItem.user.name} {newsItem.user.surname}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
}

export default NewsPage;
