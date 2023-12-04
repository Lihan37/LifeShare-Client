
import React from 'react';

const CustomPagination = ({ totalItems, itemsPerPage, onChange, currentPage }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className="flex flex-row">
            <ul className="pagination">
                {pages.map(page => (
                    <li key={page} className={currentPage === page ? 'active' : ''}>
                        <button
                            onClick={() => onChange(page)}
                            className="btn bg-custom-bg-color text-black"
                        >
                            {page}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomPagination;
