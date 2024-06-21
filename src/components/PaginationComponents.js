import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

function PaginationComponent({ currentPage, totalPages, maxPagesDisplayed, onPageChange }) {
  // Calcular el número de páginas a mostrar alrededor de la página actual
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesDisplayed / 2));
  let endPage = Math.min(startPage + maxPagesDisplayed - 1, totalPages);

  // Si hay menos páginas que el número máximo, ajustar el inicio y el final
  if (totalPages <= maxPagesDisplayed) {
    startPage = 1;
    endPage = totalPages;
  } else if (currentPage <= Math.floor(maxPagesDisplayed / 2)) {
    endPage = maxPagesDisplayed;
  } else if (currentPage + Math.floor(maxPagesDisplayed / 2) >= totalPages) {
    startPage = totalPages - maxPagesDisplayed + 1;
  }

  // Crear items de paginación
  const paginationItems = [];
  for (let number = startPage; number <= endPage; number++) {
    paginationItems.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => onPageChange(number)}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Pagination className="d-flex justify-content-center mt-4">
      <Pagination.First onClick={() => onPageChange(1)} disabled={currentPage === 1} />
      <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} />
      {paginationItems}
      <Pagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} />
      <Pagination.Last onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} />
    </Pagination>
  );
}

export default PaginationComponent;
