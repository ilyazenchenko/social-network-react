// SearchPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useAuthUserId } from '../AuthUserIdContext.js'; // Используем контекст для проверки авторизации

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
        <div>
            <button onClick={() => navigate(`/${authUserId}`)}>Домой</button>
            <button onClick={() => navigate('/news')}>Новости</button>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Поиск пользователей..."
                />
                <button type="submit">Найти</button>
            </form>
            <ul>
                {searchResults.map(user => (
                    <li key={user.id} onClick={() => navigate(`/${user.id}`)} style={{ cursor: 'pointer' }}>
                        {user.name} {user.surname}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SearchPage;
