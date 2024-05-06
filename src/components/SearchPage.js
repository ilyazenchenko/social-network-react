// SearchPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useAuthUserId } from '../AuthUserIdContext.js'; // Используем контекст для проверки авторизации
import '../css/styles.css';

function SearchPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const { authUserId } = useAuthUserId(); // Получаем ID авторизованного пользователя

    useEffect(() => {
        const query = searchParams.get('query');
        if (query) {
            setSearchQuery(query);
            fetchSearchResults(query);
        }
    }, [searchParams]);

    const fetchSearchResults = async (query) => {
        try {
            const response = await axios.get(`http://localhost:8080/search?query=${query}`);
            setSearchResults(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Ошибка при поиске:', error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchParams({ query: searchQuery });
    };

    if (!authUserId) {
        return <div>Доступ запрещен. Пожалуйста, войдите в систему.</div>;
    }

    return (
        <div class="search-container">
            <button onClick={() => navigate(`/${authUserId}`)} class="home-button">Домой</button>
            <button onClick={() => navigate('/news')} class="news-button">Новости</button>
            <h1 className='main-header'>Поиск</h1>
            <form onSubmit={handleSearch} class="search-form">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Поиск пользователей..."
                    class="search-input"
                />
                <button type="submit" class="search-submit">Найти</button>
            </form>
            <ul class="search-results">
                {searchResults.map(user => (
                    <li key={user.id} onClick={() => navigate(`/${user.id}`)} class="search-result-item">
                        {user.name} {user.surname}
                    </li>
                ))}
            </ul>
        </div>

    );
}

export default SearchPage;
