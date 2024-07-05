import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PaginationComponent from './PaginationComponents';
import Cards from './Cards';
import FormModal from './FormModal';
import fetchGet from '../Methods/FetchGet';
import { useNavigate } from 'react-router-dom';
import SearchReport from './SearchReport';
import getReportCounts from '../Methods/conteo.js';

const ITEMS_PER_PAGE = 12;
const MAX_PAGES_DISPLAYED = 5;

function Naipes({ url }) {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredDatos, setFilteredDatos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDato, setSelectedDato] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [reportsCount, setReportsCount] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const data = await fetchGet(url);
        const countReports = await getReportCounts();
        setReportsCount(countReports)
        setDatos(data);
        setFilteredDatos(data);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchDatos();
  }, [url]);

  const handleRepairClick = useCallback((dato) => {
    navigate('/Mantenimiento', { state: { dato } });
  }, [navigate]);

  const handleShowModal = useCallback((dato) => {
    setSelectedDato(dato);
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setSelectedDato(null);
  }, []);

  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  useEffect(() => {
    const filtered = datos.filter(dato => {
      const titleMatch = dato.marca?.toLowerCase().includes(searchQuery.toLowerCase());
      const idMatch = dato.placa?.toString().toLowerCase().includes(searchQuery.toLowerCase());
      const linea = dato.linea?.toString().toLowerCase().includes(searchQuery.toLowerCase());
      return titleMatch || idMatch || linea;
    });
    setFilteredDatos(filtered);
    setCurrentPage(1);
  }, [searchQuery, datos]);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = useMemo(() => filteredDatos.slice(indexOfFirstItem, indexOfLastItem), [filteredDatos, indexOfFirstItem, indexOfLastItem]);

  const totalPages = useMemo(() => Math.ceil(filteredDatos.length / ITEMS_PER_PAGE), [filteredDatos.length]);

  if (loading) {
    return <div className='d-flex justify-content-center m-3 p-5 fs-2'>Loading...</div>;
  }

  return (
    <div>
      <SearchReport onSearch={handleSearch} />
      <Cards 
        currentItems={currentItems} 
        handleShowModal={handleShowModal} 
        handleRepairClick={handleRepairClick} 
        showVerButton={true} 
        showAddButton={true} 
        dataFields={{ text: 'url' }}
        isHome={true}
        reportsCount={reportsCount} // Pasar los conteos al componente Cards
      />
      <PaginationComponent 
        currentPage={currentPage} 
        totalPages={totalPages} 
        maxPagesDisplayed={MAX_PAGES_DISPLAYED} 
        onPageChange={handlePageChange}
      />
      {selectedDato && (
        <FormModal show={showModal} handleClose={handleCloseModal} id={selectedDato.placa} />
      )}
    </div>
  );
}

export default Naipes;


