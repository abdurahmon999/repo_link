import React, { useState, useEffect } from 'react';
import repos from '../utils/repos'; // Предположим, что это ваш файл с песнями
import './Search.css'; // Предположим, что это ваши стили для компонента Search
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Подключаем иконки
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFiles, setFilteredFiles] = useState([]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredFiles([]);
    } else {
      const searchTermLower = searchTerm.toLowerCase();
      const filtered = repos.filter(file => 
        file.id.toLowerCase() === searchTermLower ||
        file.name.toLowerCase().includes(searchTermLower)
      );
      setFilteredFiles(filtered);
    }
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Обработчик поиска не нужен, так как поиск срабатывает автоматически через useEffect

  return (
    <>
    <div className='big'>
      <header>
        <div className="kont">
        <h1>Input repo id</h1>
          <input
            type="text"
            id="searchInput"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            />
        </div>
      </header>
      <main id="fileList">
        {filteredFiles.length > 0 ? (
          filteredFiles.map(file => (
            <div key={file.id} className="card">
              <div className="cont">
              <a href={file.link}>
                    <p className="name">{file.name}</p>
              </a>
                    <p className="about">{file.about}</p>
                    <div className="bott">
                    <div className={file.lang}></div>
                    <p className="lang">{file.lang}</p>
                    <FontAwesomeIcon className='star' size='1x' icon={faStar} />
                    <p className="stars">{file.stars}</p>
                    </div>
              </div>
                    <p className="type">{file.type}</p>
            </div>
          ))
          ) : (
            <p>No repos found</p>
            )}
      </main>
    </div>
    </>
  );
};

export default Search;
